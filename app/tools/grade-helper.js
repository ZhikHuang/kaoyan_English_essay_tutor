#!/usr/bin/env node
/* 批改辅助服务（grade-helper）
 * 作用：让网页里的「一键批改」按钮可以真正触发 AI 批改。
 * 原理：网页按按钮 → 本服务收到请求 → 启动一次独立的 headless harness
 *       （dsh --profile headless "任务"）→ AI 批改并写出 data/patches/sub_XXXX.js
 *       → 网页每 8 秒自动加载补丁，批改结果就显示出来了。
 *
 * 重要说明：
 *   - 本服务自己**不含** AI，也不联网；它只在本机 127.0.0.1 上听一个端口，并启动 dsh 命令。
 *   - 每次点按钮都会启动一个独立的 harness 进程（跑完即退出），不打开 GUI，也不需要你先打开 DSH 对话。
 *   - 不需要用了：在这个窗口按 Ctrl+C，或双击 停止批改服务.cmd。
 *
 * 用法：
 *   node tools/grade-helper.js                 # 默认端口 8787
 *   node tools/grade-helper.js --port 9999     # 换端口
 *   node tools/grade-helper.js --task "只批改含时态错误的"   # 自定义批改指令
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
function argValue(name, dflt){
  const i = args.indexOf(name);
  return (i >= 0 && args[i + 1]) ? args[i + 1] : dflt;
}
const PORT = parseInt(argValue('--port', '8787'), 10);
const TASK = argValue('--task', '批改待批改作文');
const STATE_FILE = path.join(ROOT, 'data', 'state.js');
const QUESTIONS_FILE = path.join(ROOT, 'data', 'questions.js');
// 网页里的提交只存在浏览器 localStorage，浏览器无法直接写盘；所以网页会把"待批改/已批改"的提交
// 推送到本服务，由本服务落盘成 pending_submissions.json —— 这样批改服务与 AI 都能读到。
const PENDING_FILE = path.join(ROOT, 'data', 'pending_submissions.json');

let running = false;          // 同一时间只允许一次任务
let runningKind = null;       // 'grade' 或 'update'
let last = null;              // 上一次任务的结果
let lastBackupName = null;    // 本次更新前生成的备份文件名
const LOG_LIMIT = 60000;      // 保留输出字符数上限

function readText(p){ try { return fs.readFileSync(p, 'utf8'); } catch (e) { return ''; } }

/* 从题目文件里读出各科目的真题年份覆盖
   英语一：q_real_<年>_major / _minor
   英语二：q_en2_<年>_major / _minor / _translation（也兼容 q_real_<年>_en2_* 写法） */
function bankYears(subject){
  const src = readQuestionSource();
  const en1 = [], en2 = [];
  let m;
  // 同时接受单引号与双引号的 id 写法（AI 直接追加 BANK.push 时两种都可能出现）
  const re1 = /id:\s*['"]q_real_(\d{4})_(?!en2)[a-z]+['"]/g;
  while ((m = re1.exec(src)) !== null) en1.push(parseInt(m[1], 10));
  const re2a = /id:\s*['"]q_en2_(\d{4})_[a-z]+['"]/g;
  while ((m = re2a.exec(src)) !== null) en2.push(parseInt(m[1], 10));
  const re2b = /id:\s*['"]q_real_(\d{4})_en2_[a-z]+['"]/g;
  while ((m = re2b.exec(src)) !== null) en2.push(parseInt(m[1], 10));
  const uniq = a => [...new Set(a)].sort((x, y) => x - y);
  const pick = subject === 'en1' ? en1 : (subject === 'en2' ? en2 : [...en1, ...en2]);
  const years = uniq(pick);
  return { years, min: years[0] || null, max: years[years.length - 1] || null, count: years.length,
           subjects: { en1: uniq(en1), en2: uniq(en2) } };
}
function readQuestionSource(){
  const banks = [QUESTIONS_FILE, STATE_FILE];
  let all = '';
  for (const p of banks) all += readText(p);
  return all;
}

/* 某科目该补哪些年份：
   · 已有题目 → 从该科目最大年份 +1 到今年
   · 完全没有该科目题目 → 从起点年份（2010）一直补到今年 */
const BASELINE_YEAR = 2010;
function missingYears(subject){
  const b = bankYears(subject);
  const nowYear = new Date().getFullYear();
  const need = [];
  if (b.max) {
    for (let y = b.max + 1; y <= nowYear; y++) need.push(y);
  } else {
    for (let y = BASELINE_YEAR; y <= nowYear; y++) need.push(y);
  }
  return { bank: b, need, upToDate: need.length === 0, empty: !b.max };
}
/* 两个科目一起判断 */
function updateNeeds(){
  const en1 = missingYears('en1');
  const en2 = missingYears('en2');
  const need = [...new Set([...en1.need, ...en2.need])].sort((a, b) => a - b);
  return {
    bank: bankYears('all'),
    nowYear: new Date().getFullYear(),
    need,
    needBySubject: { en1: en1.need, en2: en2.need },
    subjects: {
      en1: { min: en1.bank.min, max: en1.bank.max, count: en1.bank.count, need: en1.need },
      en2: { min: en2.bank.min, max: en2.bank.max, count: en2.bank.count, need: en2.need }
    },
    upToDate: en1.upToDate && en2.upToDate
  };
}

/* 读取网页推送过来的提交（data/pending_submissions.json）。
   格式兼容两种：{ meta:{...}, completions:[...] } 或直接 [ ... ] */
function readPendingFile(){
  try {
    if (!fs.existsSync(PENDING_FILE)) return { meta: null, completions: [] };
    const j = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
    const arr = Array.isArray(j) ? j : (Array.isArray(j && j.completions) ? j.completions : []);
    return { meta: (j && j.meta) || null, completions: arr.filter(c => c && c.id) };
  } catch (e) { return { meta: null, completions: [], error: String(e.message || e) }; }
}

/* 网页推送提交：按 id 合并（新的覆盖旧的），并把补丁已存在的提交视为已批改 */
function mergePendingSubmissions(incoming){
  const cur = readPendingFile();
  const byId = new Map();
  cur.completions.forEach(c => byId.set(c.id, c));
  const ids = [];
  (incoming || []).forEach(c => {
    if (!c || typeof c.id !== 'string' || !/^sub_\d+$/.test(c.id)) return;
    byId.set(c.id, c);
    ids.push(c.id);
  });
  const merged = [...byId.values()].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const out = {
    meta: Object.assign({}, cur.meta || {}, {
      updatedAt: new Date().toISOString(),
      source: '考研英语作文练习台（网页自动同步）'
    }),
    completions: merged
  };
  fs.mkdirSync(path.dirname(PENDING_FILE), { recursive: true });
  fs.writeFileSync(PENDING_FILE, JSON.stringify(out, null, 2), 'utf8');
  const pend = pendingIds();
  return { ok: true, received: ids.length, total: merged.length, pending: pend.pending, all: pend.all, graded: pend.graded };
}

/* 统一判定"待批改"：state.js 里的提交 + 网页推送的提交，去掉已有补丁的 */
function pendingIds(){
  const src = readText(STATE_FILE);
  const fromState = [...src.matchAll(/id:\s*['"](sub_\d+)['"]/g)].map(m => m[1]);
  const fromWeb = readPendingFile().completions.map(c => c.id);
  const graded = new Set();
  const pdir = path.join(ROOT, 'data', 'patches');
  if (fs.existsSync(pdir)) {
    for (const f of fs.readdirSync(pdir)) {
      const m = /^sub_\d+\.js$/.exec(f);
      if (m) graded.add(f.replace('.js', ''));
    }
  }
  const all = [...new Set([...fromState, ...fromWeb])];
  return { all, pending: all.filter(id => !graded.has(id)), graded: [...graded] };
}

/* 启动时写一份快照，让 AI（读 pending_submissions.json 的技能/工具）也能看到全部提交 */
function snapshotToPendingFile(){
  try {
    const info = pendingIds();
    const cur = readPendingFile();
    if (cur.completions.length || !info.all.length) return { ok: true, skipped: true };
    const out = {
      meta: { updatedAt: new Date().toISOString(), source: 'grade-helper 启动快照（来自 data/state.js）' },
      completions: cur.completions
    };
    fs.mkdirSync(path.dirname(PENDING_FILE), { recursive: true });
    fs.writeFileSync(PENDING_FILE, JSON.stringify(out, null, 2), 'utf8');
    return { ok: true, snapshot: true };
  } catch (e) { return { ok: false, error: String(e.message || e) }; }
}

/* 统计 state.js 里的待批改提交（与网页同一套数据） */
function pendingInfo(){
  const p = pendingIds();
  return { total: p.all.length, graded: p.graded.length, pending: p.pending };
}

/* 读请求体：超过上限时也要给客户端一个明确响应（旧实现直接 destroy，会让 fetch 永久挂起） */
const BODY_LIMIT = 4 * 1024 * 1024;
function readBody(req, res, cb){
  let body = '';
  let aborted = false;
  req.on('data', c => {
    body += c;
    if (body.length > BODY_LIMIT && !aborted) {
      aborted = true;
      json(res, 413, { ok: false, error: '请求体超过 ' + Math.round(BODY_LIMIT / 1048576) + 'MB 上限' });
      req.destroy();
    }
  });
  req.on('end', () => { if (!aborted) cb(body); });
  req.on('error', () => { if (!aborted) { aborted = true; json(res, 400, { ok: false, error: '请求读取失败' }); } });
}

function json(res, code, obj){
  const body = Buffer.from(JSON.stringify(obj), 'utf8');
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (req.method === 'OPTIONS') { json(res, 204, {}); return; }

  if (url === '/ping') {
    json(res, 200, { ok: true, running, runningKind, task: TASK, last: last ? { at: last.at, kind: last.kind, ok: last.ok, code: last.code } : null });
    return;
  }
  if (url === '/pending') {
    json(res, 200, pendingInfo());
    return;
  }
  if (url === '/submissions') {          // 网页启动/提交后把本机提交推送到这里落盘
    if (req.method === 'POST') {
      readBody(req, res, (body) => {
        try {
          const j = JSON.parse(body || '{}');
          const r = mergePendingSubmissions(Array.isArray(j) ? j : j.completions);
          console.log('已接收网页提交 ' + r.received + ' 条（本机共 ' + r.total + ' 条，待批改 ' + r.pending.length + ' 条）');
          json(res, 200, r);
        } catch (e) {
          json(res, 400, { ok: false, error: '提交内容不是合法 JSON：' + String(e.message || e) });
        }
      });
      return;
    }
    const cur = readPendingFile();
    json(res, 200, { ok: true, total: cur.completions.length, completions: cur.completions, pending: pendingIds().pending });
    return;
  }
  if (url === '/bank') {                      // 题库年份覆盖情况（网页「一键更新」面板用）
    json(res, 200, updateNeeds());
    return;
  }
  if (url === '/status') {
    json(res, 200, { running, runningKind, last });
    return;
  }
  if (url === '/grade' && req.method === 'POST') {
    if (running) { json(res, 409, { ok: false, error: '已经有一次任务在进行中（' + runningKind + '），请等它结束' }); return; }

    const info = pendingInfo();
    if (info.pending.length === 0) {
      const hint = '没有待批改的作文。可能原因：① 网页里的提交还没同步到本机（请刷新网页，或在网页「提交作文」页点一下「一键批改」，网页会自动把本机提交推送过来）；'
        + '② 这些提交已经有补丁（data/patches/）了；③ data/state.js 与 data/pending_submissions.json 里确实没有待批改的提交。';
      json(res, 200, { ok: false, error: hint });
      return;
    }
    // 任务文字：网页不传就用「服务端启动参数」（即 node .../grade-helper.js --task "..."）；
    // 网页若要指定，需显式传 pageTask。这样 CLI 的 --task 不会被网页默认值覆盖。
    readBody(req, res, (body) => {
      let task = TASK;
      let pageTask = '';
      try {
        const j = JSON.parse(body || '{}');
        if (j && typeof j.pageTask === 'string' && j.pageTask.trim()) pageTask = j.pageTask.trim().slice(0, 2000);
      } catch (e) {}
      if (pageTask) task = pageTask;
      runAgent(task, 'grade');
      json(res, 200, { ok: true, started: true, task, pending: info.pending });
    });
    return;
  }
  if (url === '/update' && req.method === 'POST') {   // 一键更新题库：让 agent 自己联网查最新真题并补进题库
    if (running) { json(res, 409, { ok: false, error: '已经有一次任务在进行中（' + runningKind + '），请等它结束' }); return; }
    readBody(req, res, (body) => {
      let years = [];
      try { const j = JSON.parse(body || '{}'); if (Array.isArray(j.years)) years = j.years.filter(y => Number.isInteger(y)); } catch (e) {}
      const need = updateNeeds();
      const list = (years.length ? years : need.need);
      const snap = snapshotBank();                     // 更新前自动备份，写坏可回退
      lastBackupName = (snap && snap.name) || null;
      const task = buildUpdateTask(list.length ? list : [need.nowYear]);
      runAgent(task, 'update', 28 * 60 * 1000);        // 联网核查较慢，给 28 分钟
      json(res, 200, { ok: true, started: true, years: list, task, bank: need.bank, backup: snap });
    });
    return;
  }
  if (url === '/restore' && req.method === 'POST') {   // 回退到最近一次备份
    if (running) { json(res, 409, { ok: false, error: '任务进行中，稍后再试' }); return; }
    const r = restoreBank();
    json(res, r.ok ? 200 : 400, r);
    return;
  }
  if (url === '/browser') {          // 换一个浏览器打开练习台（辅助服务顺手提供，方便）
    const idx = path.join(ROOT, 'index.html');
    if (!fs.existsSync(idx)) { json(res, 404, { ok: false, error: '找不到 app/index.html' }); return; }
    // 本服务不托管静态文件，所以直接把浏览器引到磁盘上的 file:// 地址
    const fileUrl = 'file:///' + idx.replace(/\\/g, '/').replace(/^\//, '');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><meta charset="utf-8"><title>打开练习台</title>'
      + '<p>正在打开练习台…</p><p><a href="' + fileUrl + '">' + fileUrl + '</a></p>'
      + '<script>location.replace(' + JSON.stringify(fileUrl) + ')</script>');
    return;
  }
  json(res, 404, { ok: false, error: 'unknown endpoint' });
});

/* 每次更新前把 questions.js 备份到 data/backups/，最多保留最近 10 份 */
function snapshotBank(){
  try{
    const dir = path.join(ROOT, 'data', 'backups');
    fs.mkdirSync(dir, { recursive: true });
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    const name = 'questions_' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' +
      p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds()) + '.js';
    fs.copyFileSync(QUESTIONS_FILE, path.join(dir, name));
    // 只留最近 10 份
    const files = fs.readdirSync(dir).filter(f => /^questions_\d+_\d+\.js$/.test(f)).sort();
    while (files.length > 10) {
      const old = files.shift();
      try { fs.unlinkSync(path.join(dir, old)); } catch (e) {}
    }
    return { ok: true, name: name, dir: 'data/backups' };
  }catch(e){ return { ok: false, error: String(e.message || e) }; }
}
/* 回退到最近一次备份 */
function restoreBank(){
  try{
    const dir = path.join(ROOT, 'data', 'backups');
    if (!fs.existsSync(dir)) return { ok: false, error: '还没有任何备份（每次「一键更新题库」前会自动备份）' };
    const files = fs.readdirSync(dir).filter(f => /^questions_\d+_\d+\.js$/.test(f)).sort();
    if (!files.length) return { ok: false, error: '备份目录为空' };
    const latest = files[files.length - 1];
    fs.copyFileSync(path.join(dir, latest), QUESTIONS_FILE);
    return { ok: true, restored: latest, files: files.length };
  }catch(e){ return { ok: false, error: String(e.message || e) }; }
}

/* 构造"一键更新题库"的任务文字：交给 agent 自己去联网查证并补题（英语一 + 英语二）
   注意：headless 是一次性任务，指令必须"短、硬、边界清晰"，否则 agent 会跑偏去做别的事。 */
function buildUpdateTask(years){
  const need = updateNeeds();
  const s1 = need.subjects.en1, s2 = need.subjects.en2;
  const list = years.join('、');
  const fmt = s => s && s.count ? ('已覆盖 ' + s.min + '—' + s.max + '，' + s.count + ' 个年份') : '尚无题目';
  return [
    '任务：给本机题库补齐 ' + list + ' 年的考研英语（一）与英语（二）真题主观题。',
    '当前覆盖情况：英语一 ' + fmt(s1) + '；英语二 ' + fmt(s2) + '。',
    '',
    '严格按下面做完就结束，不要做任何其它事：',
    '',
    '【A. 英语一】每年补 2 道，用联网搜索核对 2—4 个来源：',
    '  · 大作文（Part B，20 分，160—200 词）：id 用 q_real_<年份>_major',
    '  · 小作文（Part A，10 分，约 100 词）：id 用 q_real_<年份>_minor',
    '  注意：2010—2023 英语一大作文是图画作文；2024 是"图画+柱状图"，2025 是表格，2026 是双图表。',
    '',
    '【B. 英语二】每年补 3 道，用联网搜索核对 2—4 个来源：',
    '  · 大作文（15 分，约 150 词）：**图表作文**，id 用 q_en2_<年份>_major；题干是 "Write an essay based on the following chart/table, in which you should 1) interpret the chart, 2) give possible reasons, 3) draw a conclusion."',
    '  · 小作文（Part A，10 分，约 100 词）：id 用 q_en2_<年份>_minor',
    '  · 翻译（15 分）：**整段英译汉**（不是划线句），id 用 q_en2_<年份>_translation；字段 passage 放英文原文（可放按句拆开的版本），sentences 放需要翻译的句子，hints 里注明"整段翻译，15 分"。',
    '',
    '【C. 写在哪里（重要）】你的工作目录是 app/，题库文件 data/questions.js 由生成器产出，直接改它会被下次生成覆盖，所以要改数据源：',
    '  · 英语一：编辑 tools/gen-questions.js 里的 MAJOR 数组（大作文）与 MINOR 数组（小作文），照表中已有条目的写法追加；',
    '  · 英语二：编辑 tools/en2-data.js 里的 EN2_MAJOR / EN2_MINOR / EN2_TRANS 三个数组；',
    '  · 模拟题与长难句专项的数据源是 tools/mock-data.js（与本次更新无关，不要改）；',
    '  · 改完后运行 `node tools/gen-questions.js` 重新生成 data/questions.js（它会自动带上 subject 与 id 规则）。',
    '  注意：这个仓库的题库**只能**通过"改数据源 + 重新生成"来加真题；直接往 data/questions.js 追加，下次生成时会被丢弃。',
    '',
    '【D. 每条题目必须包含的字段】照已有题目的写法：',
    '  subject（英语一填 "en1"，英语二填 "en2"）、category:"real"、kind（major/minor/translation）、',
    '  year（写成 "<年份> 真题"）、title、source（写成"<年份> 年考研英语一/二 大作文（Part B，20/15 分）"这类）、',
    '  promptZh（中文题目说明）、promptTextZh（图画/图表内容或选段话题的文字说明）、promptEn（规范英文题干）、hints、tags；',
    '  翻译题还要给 passage（英文原文或按句拆开的版本）与 sentences（需翻译的句子）。',
    '  图表用 data/figures.js 里的现成函数：F.barChart / F.table / F.pieChart / F.pie2 / F.pieBar / F.twinBars / F.lineChart；',
    '  英语一图画作文用 F.twoPanel / F.facing / F.crowd / F.phones。',
    '  **不要自己发明图函数名**；若确实需要新图型，必须同时在 data/figures.js 里定义并挂到 window.__KAOYAN_FIG，否则题库会整体加载失败。',
    '',
    '【E. 纪律】',
    '  1. 只允许修改 tools/gen-questions.js、tools/en2-data.js（必要时 data/figures.js）；mock-data.js 与 data/questions.js 由生成器负责，不要手改。不要动 index.html、state.js、patches/、其它 tools/。',
    '  2. 只增不改：不要修改已有年份的题目或它们的 id，也不要改生成器里已有的条目。',
    '  3. 追加前先查重：某年某题型已存在就跳过并说明。',
    '  4. 不要分析网页或脚本实现，不要修其它 bug，不要增加本次任务之外的题目。',
    '  5. 查不到的年份或细节如实说"查不到/不确定"，不要编造。',
    '  6. 写完运行 `node tools/validate.js` 确认"结果：全部通过"（有 FAIL 就改好再跑）。',
    '',
    '【F. 汇报】最后用 8 行以内说明：英语一新增了哪几年哪几道、英语二新增了哪几年哪几道、来源链接、哪些细节不确定。',
  ].join('\n');
}

/* 找到可用的 dsh（不依赖用户手工配 PATH，也不写死盘符）：
   ① PATH ② 从当前 node 位置反推 DSH 自带运行时 ③ DSH_HOME 推断 + 常见安装位置 ④ 各盘符根目录 */
function resolveDsh(){
  const p = require('path');
  const isWin = process.platform === 'win32';
  const exe = isWin ? 'dsh.cmd' : 'dsh';
  const REL = ['resources', 'runtime', 'cli', 'bin', exe];
  const probe = spawnSync(isWin ? 'where' : 'which', [exe], { encoding: 'utf8' });
  if (!probe.error && probe.status === 0) {
    const first = String(probe.stdout || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean)[0];
    if (first && fs.existsSync(first)) return first;
  }
  const cands = [];
  let d = p.dirname(process.execPath);
  for (let i = 0; i < 7; i++) { d = p.dirname(d); cands.push(p.join(d, ...REL)); }
  if (process.env.DSH_HOME) cands.push(p.join(p.dirname(process.env.DSH_HOME), ...REL));
  if (isWin) {
    const la = process.env.LOCALAPPDATA || '';
    const pf = process.env.ProgramFiles || 'C:\\Program Files';
    const pf86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
    const bases = [pf, pf86];
    if (la) bases.push(p.join(la, 'Programs'));
    bases.forEach(base => {
      cands.push(p.join(base, 'DSH', ...REL));
      cands.push(p.join(base, 'dsh', ...REL));
    });
    for (const letter of 'CDEFGHIJKLMNOPQRSTUVWXYZ') {
      for (const dir of ['dsh', 'DSH']) cands.push(p.join(letter + ':\\', dir, ...REL));
      cands.push(p.join(letter + ':\\', 'Program Files', 'DSH', ...REL));
    }
  } else {
    cands.push('/opt/dsh/resources/runtime/cli/bin/' + exe);
    cands.push('/Applications/DSH.app/Contents/Resources/runtime/cli/bin/' + exe);
  }
  for (const c of cands) { try { if (fs.existsSync(c)) return c; } catch (e) {} }
  return null;
}

/* 结束一个后台任务：Windows 上 shell:true 先起 cmd.exe，直接 kill 只会杀掉 cmd，
   真正的 agent（node/dsh）会残留并继续写补丁 —— 必须连整棵进程树一起结束。 */
function killTree(child){
  if (!child || child.killed) return;
  if (process.platform === 'win32' && child.pid) {
    try { spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' }); } catch (e) {}
  }
  try { child.kill(); } catch (e) {}
}

/* 启动一次独立的 headless agent 任务（批改 or 更新题库） */
function runAgent(task, kind, timeoutMs){
  running = true;
  runningKind = kind || 'grade';
  const startedAt = new Date().toISOString();
  const isUpdate = runningKind === 'update';
  console.log('');
  console.log('=== ' + (isUpdate ? '开始更新题库' : '开始批改') + ' ' + startedAt + ' ===');
  console.log('工作目录：' + ROOT);
  console.log('任务：' + task.split('\n')[0] + (task.indexOf('\n') >= 0 ? ' …（共 ' + task.split('\n').length + ' 行指令）' : ''));
  if (isUpdate) {
    const u = updateNeeds();
    const f = s => s.need && s.need.length ? s.need.join('、') : '无需补';
    console.log('需要补齐的年份：英语一 ' + f(u.subjects.en1) + '；英语二 ' + f(u.subjects.en2));
    console.log('当前覆盖：英语一 ' + (u.subjects.en1.min || '?') + '—' + (u.subjects.en1.max || '?') +
                '；英语二 ' + (u.subjects.en2.min || '?') + '—' + (u.subjects.en2.max || '?'));
  }
  else console.log('待批改：' + (pendingInfo().pending.join('、') || '（暂无）'));
  console.log('（这是一个独立的 headless harness 进程，跑完自己退出；不需要另外打开 DSH）');

  // 找到可用的 dsh（PATH → DSH 自带运行时 → 常见安装位置）
  const dshPath = resolveDsh();
  if (!dshPath) {
    running = false; runningKind = null;
    const hint = '找不到 ' + (process.platform === 'win32' ? 'dsh.cmd' : 'dsh') +
      '。三种做法：① 在 DSH 里打开本文件夹的会话再点按钮；② 把 DSH 的 bin 目录加入 PATH；' +
      '③ 不依赖命令行——直接在 DSH 对话里说「批改待批改作文」。';
    last = { at: startedAt, kind: kind, ok: false, code: -1, error: hint };
    console.log('启动失败：' + hint);
    return;
  }
  console.log('使用的 dsh：' + dshPath);
  // 任务文字可能含换行与引号，走 stdin 传给 dsh（dsh 支持从 stdin 读任务），避免 cmd.exe 拆坏参数
  const dshDir = path.dirname(dshPath);
  const chEnv = Object.assign({}, process.env, {
    KAOYAN_TASK: task,
    PATH: dshDir + path.delimiter + (process.env.PATH || '')
  });
  const isWin = process.platform === 'win32';
  const cmd = isWin ? (process.env.ComSpec || 'cmd.exe') : dshPath;
  const argv = isWin ? ['/d', '/s', '/c', 'dsh.cmd --profile headless'] : ['--profile', 'headless'];
  const child = spawn(cmd, argv, {
    cwd: ROOT,
    windowsHide: true,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: chEnv
  });
  try { child.stdin.write(task); child.stdin.end(); }
  catch (e) { console.log('写入任务文字失败（可忽略，进程会按空任务退出）：' + String(e.message || e)); }

  let out = '';
  const push = (buf) => {
    out += buf.toString('utf8');
    if (out.length > LOG_LIMIT) out = out.slice(-LOG_LIMIT);
    process.stdout.write(buf);
  };
  child.stdout.on('data', push);
  child.stderr.on('data', push);

  const limit = timeoutMs || 15 * 60 * 1000;
  const timer = setTimeout(() => {
    console.log('!! 超过 ' + Math.round(limit / 60000) + ' 分钟仍未结束，终止本次' + (isUpdate ? '更新' : '批改'));
    killTree(child);
  }, limit);

  child.on('error', (err) => {
    clearTimeout(timer);
    running = false; runningKind = null;
    last = { at: startedAt, kind: kind, ok: false, code: -1, error: String(err.message || err), log: out };
    console.log('启动 dsh 失败：' + err.message);
    console.log('请确认命令行里能运行 dsh（在黑窗口里输入 dsh --version 测试）。');
  });

  child.on('exit', (code) => {
    clearTimeout(timer);
    running = false; runningKind = null;
    const info = pendingInfo();
    const b = bankYears();
    last = { at: startedAt, kind: kind, endedAt: new Date().toISOString(), ok: code === 0, code, log: out, pendingLeft: info.pending, bank: b, backupName: lastBackupName };
    if (isUpdate) {
      const need = updateNeeds();
      console.log('=== 更新结束，退出码 ' + code + ' ===');
      console.log('现在题库覆盖：' + (b.min || '?') + '—' + (b.max || '?') + '（' + b.count + ' 个年份）');
      console.log(need.upToDate ? '已是最新，无需再补。' : '仍缺年份：' + need.need.join('、'));
    } else {
      console.log('=== 批改结束，退出码 ' + code + ' ===');
      if (info.pending.length) console.log('仍有待批改：' + info.pending.join('、') + '（可再点一次按钮，或看看上面的输出）');
      else console.log('所有提交都已批改。回到网页即可看到结果（网页每 8 秒自动刷新）。');
    }
  });
}

server.listen(PORT, '127.0.0.1', () => {
  const u = updateNeeds();
  snapshotToPendingFile();
  console.log('');
  console.log('  考研英语（一）（二）· 本地辅助服务已启动');
  console.log('  ------------------------------------------------');
  console.log('  地址：http://127.0.0.1:' + PORT + '   （只监听本机，不联网）');
  console.log('  工作目录：' + ROOT);
  console.log('  待批改：' + (pendingInfo().pending.join('、') || '（暂无）'));
  console.log('  题库覆盖：' + (u.bank.min || '?') + '—' + (u.bank.max || '?') + '，' +
    (u.upToDate ? '已是最新' : '缺 ' + u.need.join('、') + '（可在网页点「一键更新题库」）'));
  console.log('');
  console.log('  保持这个窗口开着，然后在网页上点「一键批改」或「一键更新题库」。');
  console.log('  结束：按 Ctrl+C，或双击 stop-helper.cmd');
  console.log('');
});
server.on('error', (e) => {
  if (e && e.code === 'EADDRINUSE') {
    console.log('端口 ' + PORT + ' 已被占用：可能服务已经在运行了。');
    console.log('直接用网页上的「一键批改」即可；若要换端口，请同时改网页里的 HELPER_URL（app/index.html 顶部）。');
    process.exitCode = 1;
  } else {
    console.log('服务启动失败：' + (e && e.message));
    process.exitCode = 1;
  }
});
