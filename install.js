#!/usr/bin/env node
/* 一键安装 / 配置：node install.js
 *
 * 做三件事（全部幂等，可以反复运行）：
 *   1. 自检：Node 版本、文件是否齐全、题库与示例补丁是否可解析
 *   2. 把技能文档安装到 DSH 的用户技能目录（~/.dsh/skills/kaoyan-english-tutor/）
 *      —— 装到用户目录后，任何 DSH 会话都能用，不要求从本仓库启动
 *   3. 打印本机平台的「下一步怎么做」（Windows 与 macOS/Linux 分支）
 *
 * 不会修改任何个人数据；不会联网。
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = __dirname;
const APP = path.join(ROOT, 'app');
const WIN = process.platform === 'win32';
const MAC = process.platform === 'darwin';
const LINUX = process.platform === 'linux';

let problems = 0;
const say = (s) => console.log(s);
const ok = (s) => console.log('  ✅ ' + s);
const warn = (s) => { problems++; console.log('  ⚠️  ' + s); };
const info = (s) => console.log('  ·  ' + s);

say('');
say('════════════════════════════════════════════════════');
say('  考研英语（一）（二）· 作文批改练习台 —— 安装与自检');
say('════════════════════════════════════════════════════');
say('  平台：' + (WIN ? 'Windows' : MAC ? 'macOS' : LINUX ? 'Linux' : process.platform) +
            '　Node：' + process.version);
say('');

/* ---------- 1. 自检 ---------- */
say('【1/3】环境与文件自检');

const need = [
  ['app/index.html', '练习台网页'],
  ['app/data/state.js', '状态文件'],
  ['app/data/questions.js', '题库'],
  ['app/data/figures.js', '示意图库'],
  ['app/tools/validate.js', '自检工具'],
  ['skill/SKILL.md', '技能主入口（评分路由）'],
  ['skill/references/web_bridge.md', '数据契约'],
  ['skill/references/english2_essay_major.md', '英语二大作文模块'],
  ['skill/references/english2_essay_minor.md', '英语二小作文模块'],
  ['skill/references/english2_translation.md', '英语二翻译模块'],
];
for (const [rel, desc] of need) {
  if (fs.existsSync(path.join(ROOT, rel))) ok(desc + '：' + rel);
  else warn('缺少 ' + rel + '（' + desc + '）');
}

const major = parseInt(String(process.version).replace(/^v/, '').split('.')[0], 10);
if (major >= 18) ok('Node 版本可用于本工具集（需要 18+）');
else warn('Node 版本偏低（' + process.version + '），建议升级到 18 以上');

// 题库与示例补丁可解析性
function tryLoad(rel){
  const w = {};
  try {
    new Function('window', fs.readFileSync(path.join(ROOT, rel), 'utf8'))(w);
    return w;
  } catch (e) {
    warn(rel + ' 解析失败：' + e.message);
    return null;
  }
}
const figW = tryLoad('app/data/figures.js');
const qW = (function(){
  const w = {};
  try {
    new Function('window', fs.readFileSync(path.join(ROOT, 'app/data/figures.js'), 'utf8'))(w);
    new Function('window', fs.readFileSync(path.join(ROOT, 'app/data/questions.js'), 'utf8'))(w);
  } catch (e) { warn('app/data/questions.js 解析失败：' + e.message + '（常见原因：引用了 figures.js 里不存在的图函数）'); }
  return w;
})();
const qs = (qW && qW.__KAOYAN_QUESTIONS) || [];
if (qs.length) {
  const real = qs.filter(q => q.category === 'real');
  const years = [...new Set(real.map(q => (String(q.year || '').match(/\d{4}/) || [''])[0]).filter(Boolean))].sort();
  ok('题库可加载：共 ' + qs.length + ' 道（真题 ' + real.length + ' 道' +
     (years.length ? '，覆盖 ' + years[0] + '—' + years[years.length - 1] : '') + '）');
} else {
  warn('题库没有加载出任何题目');
}

const pdir = path.join(APP, 'data', 'patches');
if (fs.existsSync(pdir)) {
  const patches = fs.readdirSync(pdir).filter(f => /^sub_\d+\.js$/.test(f));
  ok('批改结果目录可用（现有补丁 ' + patches.length + ' 个）');
} else {
  fs.mkdirSync(pdir, { recursive: true });
  ok('已创建 app/data/patches/');
}
fs.mkdirSync(path.join(APP, 'data', 'uploads'), { recursive: true });
fs.mkdirSync(path.join(APP, 'data', 'backups'), { recursive: true });

/* 真正的批改依赖：命令行里的 dsh（网页批量按钮 / 一键批改.cmd 都靠它启动智能体）
   查找顺序与 tools/grade-once.js、app/tools/grade-helper.js 保持一致（三处一起改）：
   ① PATH ② 从当前 node 位置反推 ③ DSH_HOME 推断 + 常见安装位置 ④ 各盘符根目录 ⑤ 注册表卸载项。 */
const { spawnSync } = require('child_process');
const dshBase = process.platform === 'win32' ? 'dsh.cmd' : 'dsh';
function findDsh(){
  const exe = process.platform === 'win32' ? 'dsh.cmd' : 'dsh';
  const REL = ['resources', 'runtime', 'cli', 'bin', exe];
  const probe = spawnSync(process.platform === 'win32' ? 'where' : 'which', [exe], { encoding: 'utf8' });
  if (!probe.error && probe.status === 0) {
    const first = String(probe.stdout || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean)[0];
    if (first && fs.existsSync(first)) return first;
  }
  const cands = [];
  let d = path.dirname(process.execPath);
  for (let i = 0; i < 7; i++) { d = path.dirname(d); cands.push(path.join(d, ...REL)); }
  if (process.env.DSH_HOME) cands.push(path.join(path.dirname(process.env.DSH_HOME), ...REL));
  if (process.platform === 'win32') {
    const la = process.env.LOCALAPPDATA || '';
    const pf = process.env.ProgramFiles || 'C:\\Program Files';
    const pf86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
    const bases = [pf, pf86];
    if (la) bases.push(path.join(la, 'Programs'));
    bases.forEach(base => {
      cands.push(path.join(base, 'DSH', ...REL));
      cands.push(path.join(base, 'dsh', ...REL));
    });
    for (const letter of 'CDEFGHIJKLMNOPQRSTUVWXYZ') {
      for (const dir of ['dsh', 'DSH']) cands.push(path.join(letter + ':\\', dir, ...REL));
      cands.push(path.join(letter + ':\\', 'Program Files', 'DSH', ...REL));
    }
  }
  for (const c of cands) { try { if (fs.existsSync(c)) return c; } catch (e) {} }
  if (process.platform === 'win32') {
    const roots = [
      'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall',
      'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall',
      'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall'
    ];
    for (const root of roots) {
      let out = '';
      try { out = String((spawnSync('reg', ['query', root, '/s', '/v', 'InstallLocation'], { encoding: 'utf8' }) || {}).stdout || ''); }
      catch (e) { continue; }
      const lines = out.match(/InstallLocation\s+REG_SZ\s+(.+)/g) || [];
      for (const line of lines) {
        const dir = line.replace(/^InstallLocation\s+REG_SZ\s+/, '').trim();
        if (!dir) continue;
        try { const cand = path.join(dir, ...REL); if (fs.existsSync(cand)) return cand; } catch (e) {}
      }
    }
  }
  return null;
}
const dshFound = findDsh();
// 注意：Node 24 在 Windows 上直接 spawn '.cmd' 会 EINVAL，所以经 cmd.exe 调用（并把它所在目录塞进 PATH）
const dshProbe = dshFound
  ? (process.platform === 'win32'
      ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'dsh.cmd --version'], {
          encoding: 'utf8', env: Object.assign({}, process.env, { PATH: path.dirname(dshFound) + path.delimiter + (process.env.PATH || '') })
        })
      : spawnSync(dshFound, ['--version'], { encoding: 'utf8' }))
  : { error: new Error('not found') };
if (dshFound && !dshProbe.error && dshProbe.status === 0) {
  ok('批改依赖可用：' + dshFound + '（' + String(dshProbe.stdout || '').trim().split('\n')[0] + '）');
} else {
  warn('找不到 ' + dshBase + '：网页「一键批改」「一键更新题库」和 一键批改.cmd 需要它来启动智能体。');
  info('  · 不依赖命令行的做法（推荐）：在 DSH 对话里说「批改待批改作文」，AI 会读 app/data/pending_submissions.json 与 state.js。');
  info('  · 或把 DSH 的 bin 目录加入 PATH 后重试。');
}

/* ---------- 2. 安装技能到 DSH 用户目录 ---------- */
say('');
say('【2/3】把技能文档安装到 DSH 用户技能目录（任何会话都能用）');
const dshHome = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
const target = path.join(dshHome, 'skills', 'kaoyan-english-tutor');
try {
  fs.mkdirSync(path.join(target, 'references'), { recursive: true });
  const copy = (rel) => {
    fs.copyFileSync(path.join(ROOT, 'skill', rel), path.join(target, rel));
  };
  copy(path.join('SKILL.md'));
  for (const f of fs.readdirSync(path.join(ROOT, 'skill', 'references'))) {
    if (/\.md$/.test(f)) fs.copyFileSync(path.join(ROOT, 'skill', 'references', f), path.join(target, 'references', f));
  }
  ok('已安装到 ' + target);
  info('如果你不用 DSH：把 skill/ 里的文档放到你的智能体约定的位置即可（见 README「在其他智能体里使用」）');
} catch (e) {
  warn('安装技能失败：' + e.message + '（可跳过，不影响网页与批改功能：仓库内 .dsh/skills/ 也有一份）');
}
// 仓库内也保留一份项目级技能
if (!fs.existsSync(path.join(ROOT, '.dsh', 'skills', 'kaoyan-english-tutor', 'SKILL.md'))) {
  warn('仓库内 .dsh/skills/ 缺少技能文件（git clone 可能丢了这个隐藏目录，请确认下载的是完整仓库包）');
} else {
  ok('仓库内项目级技能也在：.dsh/skills/kaoyan-english-tutor/');
}

/* ---------- 3. 下一步 ---------- */
say('');
say('【3/3】接下来怎么做（' + (WIN ? 'Windows' : 'macOS / Linux') + '）');
say('');
say('  A. 只写作 + 看批改（不需要任何智能体）');
say('     ' + (WIN ? '双击 app\\index.html' : '在文件管理器里双击 app/index.html，或执行 open app/index.html'));
say('');
say('  B. 让 AI 批改（三选一）');
if (WIN) {
  say('     B1. 双击 一键批改.cmd（或 start-helper.cmd 常驻后点网页按钮）');
  say('     B2. 终端执行：node tools\\grade-once.js');
  say('     B3. 打开 DSH，在会话里说一句「批改待批改作文」');
} else {
  say('     B1. 终端执行：./grade-once.sh');
  say('     B2. 常驻服务 + 网页按钮：./start-helper.sh  然后在网页点「一键批改」');
  say('     B3. 打开 DSH / 其他智能体，在会话里说一句「批改待批改作文」');
  say('');
  say('     注意：从网上下载的脚本默认没有执行权限，如提示 Permission denied，先执行：');
  say('         chmod +x *.sh tools/*.js');
}
say('');
say('  C. 每年 12 月考研结束后更新题库');
say('     网页 →「题库」→「一键更新题库」；或终端：node tools/grade-once.js --update 2027');
say('');
say('  D. 自检');
say('     node app/tools/validate.js --report');
say('');
say(problems === 0 ? '✅ 自检通过，可以直接开始使用。' : '⚠️  有 ' + problems + ' 项需要留意（见上面的 ⚠️ 行）。');
say('');
// 注意：这里的"需要留意"多为环境提示（例如命令行里没有 dsh），不代表安装失败，
// 所以正常结束（退出码 0），避免一键调用它的脚本被误判为失败。
process.exit(0);
