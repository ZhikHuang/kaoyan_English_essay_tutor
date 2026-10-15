#!/usr/bin/env node
/* 回归自检：把散落在各文件里的两个"守卫"逻辑抽出来单独跑（不需要浏览器、不碰用户数据）
 *
 *   1) dsh 的定位：install.js / tools/grade-once.js / app/tools/grade-helper.js **三处逻辑必须一致**
 *      —— 这三份是重复实现（各自要能独立运行），曾经出现"只改了两处"导致行为不一致；
 *   2) 页面补丁的「编号撞车」防线：app/index.html 的 applyPatch / notePatchConflicts
 *      —— 补丁的 questionId 与提交不一致时必须拒绝套用。
 *
 * 用法：node tools/test-guards.js
 * 退出码：全部通过 0，有失败 1（可直接挂到 CI 或 check-repo 里）。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
let failed = 0;
function check(ok, label, extra) {
  console.log((ok ? '✅ ' : '❌ ') + label + (extra ? '  →  ' + extra : ''));
  if (!ok) failed++;
}

/* 从源码里按大括号配对抽出整个函数 */
function grabFunction(src, name) {
  const start = src.indexOf('function ' + name + '(');
  if (start < 0) throw new Error('没找到函数 ' + name);
  let i = src.indexOf('{', start), depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) break; }
  }
  return src.slice(start, i + 1);
}

/* ---------------- 一、dsh 定位 ---------------- */
const TARGETS = [
  { file: 'install.js', fn: 'findDsh' },
  { file: 'tools/grade-once.js', fn: 'resolveDsh' },
  { file: 'app/tools/grade-helper.js', fn: 'resolveDsh' }
];

console.log('【1】dsh 定位（三处实现一致性 + 注册表分支）');
const results = [];
for (const t of TARGETS) {
  const src = fs.readFileSync(path.join(ROOT, t.file), 'utf8');
  const body = grabFunction(src, t.fn) +
    (src.includes('function dshFromRegistry') ? '\n' + grabFunction(src, 'dshFromRegistry') : '');
  const make = new Function('spawnSync', 'require', 'process', 'fs', 'path', body + '\nreturn ' + t.fn + ';');
  // 1a) 真实环境
  let real = null, realErr = '';
  try { real = make(spawnSync, require, process, fs, path)(); } catch (e) { realErr = e.message; }
  results.push({ file: t.file, dsh: real });
  check(!realErr && !!real, t.file + ' 在本机找到 dsh', realErr || real || '(null)');

  // 1b) 隔离出"注册表"这一条路：where 失败、盘符扫描不命中（fs 打桩只认临时安装目录）
  const fakeInstall = path.join(os.tmpdir(), 'guard-test-dsh');
  const fakeDsh = path.join(fakeInstall, 'resources', 'runtime', 'cli', 'bin', 'dsh.cmd');
  const stubSpawn = (cmd) => {
    if (String(cmd).toLowerCase().includes('where') || String(cmd).toLowerCase().includes('which')) return { status: 1, stdout: '' };
    if (String(cmd).toLowerCase() === 'reg') return { status: 0, stdout: 'HKEY_CURRENT_USER\\...\\Uninstall\\x\r\n    InstallLocation    REG_SZ    ' + fakeInstall + '\r\n' };
    return { status: 1, stdout: '' };
  };
  const stubFs = { existsSync: (p) => path.resolve(p) === path.resolve(fakeDsh) };
  // grade-once / install.js 在函数内部 require('fs')，所以连 require 一起打桩，才能真正隔离出注册表分支
  const stubRequire = (n) => (n === 'fs' ? stubFs : require(n));
  let viaReg = null, regErr = '';
  try { viaReg = make(stubSpawn, stubRequire, process, stubFs, path)(); } catch (e) { regErr = e.message; }
  check(!regErr && viaReg === fakeDsh, t.file + ' 仅靠注册表也能定位（PATH 与盘符都不命中时）', regErr || viaReg || '(null)');
}

/* ---------------- 二、页面防错配 ---------------- */
console.log('\n【2】补丁"编号撞车"防线（app/index.html）');
const html = fs.readFileSync(path.join(ROOT, 'app/index.html'), 'utf8');
const guardCode = [grabFunction(html, 'applyPatch'), grabFunction(html, 'patchConflictIds'), grabFunction(html, 'notePatchConflicts')].join('\n');
const Store = {};
const makePage = (patch) => new Function('patchOf', 'allCompletions', 'Store', guardCode + '\nreturn {applyPatch, patchConflictIds, notePatchConflicts};')(
  () => patch, () => subs, Store
);
let subs = [];
const base = { id: 'sub_0001', questionId: 'q_en2_2010_translation', status: 'pending', essayText: '111' };

let r = makePage({ questionId: 'q_en2_2010_translation', status: 'graded', grading: { score: 7, fullScore: 15 } }).applyPatch(Object.assign({}, base));
check(r.status === 'graded' && r.grading.score === 7, '题目一致 → 正常套用批改结果');

r = makePage({ questionId: 'q_real_2021_major', status: 'graded', grading: { score: 4, fullScore: 20 } }).applyPatch(Object.assign({}, base));
check(r.status === 'pending' && !r.grading && r.patchMismatch === 'q_real_2021_major', '题目不符 → 拒绝套用、继续显示待批改', 'patchMismatch=' + r.patchMismatch);

const page = makePage({ questionId: 'q_real_2021_major', status: 'graded', grading: { score: 4 } });
subs = [page.applyPatch(Object.assign({}, base))];
const ids = page.notePatchConflicts();
check(ids.length === 1 && /⚠/.test(Store.syncNote || ''), '冲突写进顶栏提示', Store.syncNote);

r = makePage({ status: 'graded', grading: { score: 13, fullScore: 20 } }).applyPatch(Object.assign({}, base));
check(r.status === 'graded' && r.grading.score === 13, '旧补丁（无 questionId）→ 仍然兼容');

console.log('\n' + (failed ? '❌ 有 ' + failed + ' 项失败' : '✅ 守卫自检全部通过'));
process.exit(failed ? 1 : 0);
