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

/* 默认任务文字 */
function defaultTask(){
  if (UPDATE_YEARS) {
    return [
      '任务：联网核查并更新本机题库，补齐 ' + UPDATE_YEARS + ' 年考研英语一的真题写作题。',
      '严格按下面做完就结束，不要做任何其它事：',
      '1. 用联网搜索查明这些年份考研英语一「大作文（Part B，20 分）」与「小作文（Part A，10 分）」的真实题目；每年查 2—4 个来源交叉核对，查不到就如实说"查不到"，不要编造。',
      '2. 打开 app/data/questions.js，照已有 real 题目的写法追加：id 用 q_real_<年份>_major / q_real_<年份>_minor，category 为 "real"，补全 year、title、promptZh、promptTextZh、promptEn、hints、tags；figure 用 app/data/figures.js 里的 F.xxx() 生成。',
      '3. 只允许修改 app/data/questions.js 一个文件；不要动 index.html、tools/、state.js。',
      '4. 写完运行 node tools/validate.js 确认通过。',
      '5. 用 5 行以内汇报：新增了哪几年的哪两道题、来源链接、哪些细节不确定。'
    ].join('\n');
  }
  return [
    '任务：批改本机练习台里待批改的考研英语一作文。',
    '1. 读 skill/SKILL.md 与它指向的评分文档，按其标准批改。',
    '2. 从 app/data/state.js 里找 status 为 "pending" 的提交（或用户指定的编号）。',
    '3. 按 skill/references/web_bridge.md 的字段契约，把结果写成 app/data/patches/sub_<编号>.js。',
    '4. 在回复里给出：得分与档位、逐句批改、修改后全文、表达积累、本篇注意事项。'
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

console.log('');
console.log('考研英语一 · 批改练习台 —— 一次性任务');
console.log('  工作目录：' + APP);
console.log('  智能体  ：' + AGENT + (CMD_TEMPLATE ? '（自定义命令）' : ''));
console.log('  任务    ：' + task.split('\n')[0]);
console.log('');

let r;
if (!CMD_TEMPLATE && AGENT === 'dsh') {
  const cmd = process.platform === 'win32' ? 'dsh.cmd' : 'dsh';
  r = spawnSync(cmd, ['--profile', 'headless', task], {
    cwd: APP, stdio: 'inherit', shell: process.platform === 'win32'
  });
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
