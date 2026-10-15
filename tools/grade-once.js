#!/usr/bin/env node
/* 一次性批改（跨平台）：node tools/grade-once.js
 *
 * 作用：在本仓库目录里启动一次独立的 agent（无界面、跑完自己退出），让它
 *       读取 app/data/state.js 中 status="pending" 的提交，按 skill/ 的评分标准批改，
 *       结果写成 app/data/patches/sub_XXXX.js —— 网页会在 8 秒内自动显示。
 *
 * 可选参数：
 *   --task "只批改 sub_0003"      自定义任务文字
 *   --update 2027,2028            改成"联网更新题库，补齐这些年份"
 *   --agent dsh|codex|custom      使用哪个智能体命令（默认 dsh）
 *   --cmd "my-agent -p {task}"    自定义命令模板（{task} 会被替换）
 *
 * 为什么需要它：网页是静态页面，它自己不能批改；批改由智能体完成，本脚本就是"点火器"。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const APP = path.resolve(__dirname, '..', 'app');
const args = process.argv.slice(2);
function val(name, dflt){
  const i = args.indexOf(name);
  return (i >= 0 && args[i + 1]) ? args[i + 1] : dflt;
}
const AGENT = val('--agent', 'dsh');
const CMD_TEMPLATE = val('--cmd', '');
const UPDATE_YEARS = val('--update', '');
const TASK = val('--task', '');

/* 默认任务文字（注意：agent 的工作目录是 app/，所以这里的路径都相对 app/） */
function defaultTask(){
  if (UPDATE_YEARS) {
    return [
      '任务：联网核查并更新本机题库，补齐 ' + UPDATE_YEARS + ' 年考研英语（一）与英语（二）的真题主观题。',
      '严格按下面做完就结束，不要做任何其它事：',
      '【A. 英语一】每年 2 道：大作文（Part B，20 分，160—200 词）与 小作文（Part A，10 分，约 100 词）。'
        + '2010—2023 大作文是图画作文；2024 是"图画+柱状图"；2025 是表格；2026 是双图表——先看题干是 drawing 还是 chart。'
        + 'id 用 q_real_<年份>_major / q_real_<年份>_minor。',
      '【B. 英语二】每年 3 道：图表大作文（15 分，约 150 词，id 用 q_en2_<年份>_major）、小作文（10 分，id 用 q_en2_<年份>_minor）、'
        + '整段英译汉（15 分，id 用 q_en2_<年份>_translation，必须给出 passage 英文原文与按句拆分的 sentences）。',
      '【C. 每年查 2—4 个来源交叉核对，查不到就如实说"查不到"，绝对不要编造。】',
      '【D. 写在哪里】题库由生成器产出，直接改 data/questions.js 会在下次生成时被覆盖，所以要改数据源：',
      '   · 英语一：编辑 tools/gen-questions.js 里的 MAJOR（大作文）与 MINOR（小作文）数组；',
      '   · 英语二：编辑 tools/en2-data.js 里的 EN2_MAJOR / EN2_MINOR / EN2_TRANS 三个数组；',
      '   · 改完运行 node tools/gen-questions.js 重新生成 data/questions.js。',
      '   · 模拟题/长难句专项在 tools/mock-data.js 里，与本任务无关，不要动。',
      '【E. 每条题目字段】照已有条目：subject（"en1"/"en2"）、category:"real"、kind、year:"<年份> 真题"、title、source、'
        + 'promptZh、promptTextZh、promptEn、hints、tags；图表用 figures.js 里的 F.barChart/F.table/F.pieChart/F.pie2/F.pieBar/F.twinBars/F.lineChart，'
        + '英语一图画用 F.twoPanel/F.facing/F.crowd/F.phones。不要发明图库里没有的函数名。',
      '【F. 写完运行 node tools/validate.js，确认"结果：全部通过"（有 FAIL 就改好再跑）。】',
      '【G. 用 8 行以内汇报：两科各新增了哪几年哪几道、来源链接、哪些细节不确定。】'
    ].join('\n');
  }
  return [
    '任务：批改本机练习台里待批改的考研英语（一）（二）作文与翻译。',
    '1. 读 skill/SKILL.md 与它指向的评分文档，按科目（英语一 / 英语二）与题型选择对应标准。',
    '2. 待批改提交按下面的顺序找：① data/pending_submissions.json（网页推送给辅助服务的本机提交，最全）；'
      + '② data/state.js 里 status 为 "pending" 的提交（或用户指定的编号）。',
    '3. 按 skill/references/web_bridge.md 的字段契约，把结果写成 data/patches/sub_<编号>.js（JS 形式，本地文件模式下只认 .js）。',
    '4. 在回复里给出：得分与档位、逐句批改、修改后全文、表达积累、本篇注意事项。',
    '注意：你的工作目录是 app/，所以上面路径都相对 app/（即 app/data/...、app/skill/... 不存在时用 data/...、skill/...）。'
  ].join('\n');
}
const task = TASK || defaultTask();

/* 组装命令 */
function buildCommand(){
  if (CMD_TEMPLATE) return CMD_TEMPLATE.replace('{task}', task);
  if (AGENT === 'dsh') return null;                       // 用参数数组方式，避免转义问题
  if (AGENT === 'codex') return 'codex exec ' + JSON.stringify(task);
  return AGENT + ' ' + JSON.stringify(task);
}

/* 找到可用的 dsh（不依赖用户手工配 PATH，也不写死盘符）：
   ① 先在 PATH 里找（which/where）
   ② 用"当前 node 的安装位置"逐级反推 DSH 自带运行时（node 来自 DSH 时最准）
   ③ DSH_HOME 推断 + 常见安装位置（Program Files / LOCALAPPDATA\Programs）
   ④ 最后扫各盘符根目录（DSH 装在 D:\dsh、E:\dsh 这类非系统盘很常见）
   返回 null 表示确实找不到（调用方给出可执行的人工指引）。 */
function resolveDsh(){
  const fs = require('fs');
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
  const envHome = process.env.DSH_HOME;
  if (envHome) cands.push(p.join(p.dirname(envHome), ...REL));
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
    // 各盘符根目录（覆盖"DSH 装在非系统盘"的情况）
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

console.log('');
console.log('考研英语（一）（二）· 批改练习台 —— 一次性任务');
console.log('  工作目录：' + APP);
console.log('  智能体  ：' + AGENT + (CMD_TEMPLATE ? '（自定义命令）' : ''));
console.log('  任务    ：' + task.split('\n')[0]);
console.log('');

let r;
if (!CMD_TEMPLATE && AGENT === 'dsh') {
  const isWin = process.platform === 'win32';
  const dshPath = resolveDsh();
  if (!dshPath) {
    console.log('❌ 找不到 ' + (isWin ? 'dsh.cmd' : 'dsh') + '。');
    console.log('   可选做法（任一种）：');
    console.log('   1) 在 DSH 会话里对 AI 说一句「批改待批改作文」——AI 会读 app/data/pending_submissions.json 与 state.js，');
    console.log('      这是最省事、不需要命令行 PATH 的方式（前提：提交已经同步成那个 JSON，或被直接粘贴给 AI）；');
    console.log('   2) 把 DSH 的 bin 目录加入 PATH，再运行本脚本。目录形如 <DSH安装盘>:\\resources\\runtime\\cli\\bin' +
      (isWin ? '（例如 D:\\dsh\\resources\\runtime\\cli\\bin，盘符看你自己的安装位置）' : '（例如 /opt/dsh/resources/runtime/cli/bin）') + '；');
    console.log('   3) 用别的智能体：node tools/grade-once.js --cmd "your-agent -p {task}"');
    process.exit(1);
  }
  console.log('  使用的 dsh：' + dshPath);
  console.log('');
  // 任务文字含换行，走命令行参数在 Windows 上会被 cmd.exe 拆坏；用 stdin 传（dsh 支持从 stdin 读任务）。
  // Windows 上直接 spawn '.cmd' 会 EINVAL，所以显式经 cmd.exe 调用；把 dsh 所在目录塞进 PATH，避免引号拼接问题。
  const dshDir = require('path').dirname(dshPath);
  const env = Object.assign({}, process.env, { PATH: dshDir + require('path').delimiter + (process.env.PATH || '') });
  const cmd = isWin ? (process.env.ComSpec || 'cmd.exe') : dshPath;
  const argv = isWin ? ['/d', '/s', '/c', 'dsh.cmd --profile headless'] : ['--profile', 'headless'];
  r = spawnSync(cmd, argv, { cwd: APP, stdio: ['pipe', 'inherit', 'inherit'], input: task, env: env });
} else {
  r = spawnSync(buildCommand(), { cwd: APP, stdio: 'inherit', shell: true });
}

if (r.error) {
  console.log('');
  console.log('❌ 启动失败：' + r.error.message);
  console.log('   请确认命令可用：在终端里执行 `' + AGENT + ' --version` 试试。');
  console.log('   若用别的智能体，可加参数：--cmd "your-agent -p {task}"');
  process.exit(1);
}
console.log('');
console.log(r.status === 0 ? '✅ 任务完成，回到网页即可看到结果（8 秒内自动刷新）。' : '⚠️ 任务结束，退出码 ' + r.status + '，请查看上面的输出。');
process.exit(r.status === 0 ? 0 : 1);
