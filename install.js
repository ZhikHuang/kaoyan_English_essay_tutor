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
say('  考研英语一 · 作文批改练习台 —— 安装与自检');
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
