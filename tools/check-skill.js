/* 技能包结构自检：确保 SKILL.md 的路由与实际文件一致、每个文档都有必需章节、无编码问题
   用法：node tools/check-skill.js [仓库根] */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || path.resolve(__dirname, '..');
const SKILL_DIR = path.join(ROOT, 'skill');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');

let bad = 0, warn = 0;
const ok = m => console.log('  ✅ ' + m);
const no = m => { bad++; console.log('  ❌ ' + m); };
const wr = m => { warn++; console.log('  ⚠️  ' + m); };
const read = p => fs.readFileSync(p, 'utf8');

if (!fs.existsSync(SKILL_MD)) { console.log('❌ 找不到 skill/SKILL.md'); process.exit(1); }
const skill = read(SKILL_MD);

/* 1. 路由完整性：SKILL.md 里提到的 references/*.md 必须存在；references 下的文件必须有被路由到 */
console.log('【1】SKILL.md 路由 ↔ references 文件');
const refDir = path.join(SKILL_DIR, 'references');
const refFiles = fs.readdirSync(refDir).filter(f => f.endsWith('.md')).sort();
const mentioned = new Set();
for (const m of skill.matchAll(/references\/([\w.\-]+\.md)/g)) mentioned.add(m[1]);
const missing = [...mentioned].filter(f => !fs.existsSync(path.join(refDir, f)));
missing.length ? no('SKILL.md 提到但文件不存在：' + missing.join('、')) : ok('SKILL.md 提到的 ' + mentioned.size + ' 个参考文档都存在');
const unrouted = refFiles.filter(f => !mentioned.has(f));
unrouted.length ? wr('存在但 SKILL.md 未路由：' + unrouted.join('、')) : ok('references 下 ' + refFiles.length + ' 个文档全部被 SKILL.md 路由');

/* 2. 每个文档的必需章节（按文件名关键词判断） */
console.log('');
console.log('【2】各文档必需章节');
const REQUIRED = {
  'rubric_kaoyan.md': [/档位/, /英语一/, /英语二/, /小作文/, /翻译/],
  'rubric_cet6.md': [/档位/, /15 ?分/, /六级/],
  'master_methods.md': [/共识/, /分歧/, /名师|机构/],
  'highscore_language.md': [/词汇/, /语法/, /失分/],
  'templates_library.md': [/图画/, /图表/, /书信/, /通知/, /六级|议论文/],
};
for (const [f, pats] of Object.entries(REQUIRED)) {
  const p = path.join(refDir, f);
  if (!fs.existsSync(p)) { no('缺少 ' + f); continue; }
  const t = read(p);
  const lack = pats.filter(re => !re.test(t));
  if (lack.length) no(f + ' 缺少章节关键词：' + lack.map(String).join('、'));
  else ok(f + ' 章节齐全（' + t.length + ' 字符）');
}

/* 3. 编码与行尾：UTF-8 无 BOM、LF、无 CRLF */
console.log('');
console.log('【3】编码与行尾（UTF-8 无 BOM / LF）');
const all = ['SKILL.md', ...refFiles.map(f => path.join('references', f))];
for (const rel of all) {
  const p = path.join(SKILL_DIR, rel);
  const b = fs.readFileSync(p);
  const bom = b.length >= 3 && b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF;
  const crlf = b.includes(Buffer.from('\r\n'));
  if (bom) no(rel + ' 含 BOM');
  else if (crlf) no(rel + ' 含 CRLF（应为 LF）');
  else ok(rel + ' 编码正常');
}

/* 4. 常见笔误："" 双写、$ 未转义等 */
console.log('');
console.log('【4】常见笔误扫描');
const typos = [];
for (const rel of all) {
  const t = read(path.join(SKILL_DIR, rel));
  if (/:\s*""[A-Za-z_]/.test(t)) typos.push(rel + ' 有 category:""x"" 这类双引号笔误');
}
typos.length ? typos.forEach(x => no(x)) : ok('未发现双引号笔误');

/* 5. 技能总字数与文件数（防止误删） */
console.log('');
console.log('【5】规模统计');
let total = 0;
for (const rel of all) total += read(path.join(SKILL_DIR, rel)).length;
const totalChars = total;
(totalChars > 60000 ? ok : wr)('技能总字符数 ' + totalChars + '（文档 ' + all.length + ' 个）');

console.log('');
console.log(bad === 0 ? '结果：技能包结构全部通过（警告 ' + warn + ' 项）' : '结果：' + bad + ' 项失败，' + warn + ' 项警告');
process.exit(bad ? 1 : 0);
