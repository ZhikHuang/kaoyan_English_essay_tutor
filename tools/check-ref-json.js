/* 检查参考文档里的批改补丁模板是否可解析
   目标：文档里给出的模板必须真能被 AI 照抄落盘（网页加载时会 JSON.parse 它）。
   抽取规则：找 `__KAOYAN_PATCHES['id'] =` 之后的对象；或 ```json 围栏里以 { 开头的块。 */
const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || path.join(__dirname, '..', 'skill', 'references');
if (!fs.existsSync(dir)) {
  console.log('用法：node tools/check-ref-json.js [参考文档目录，默认 skill/references]');
  console.log('目录不存在：' + dir);
  process.exit(1);
}
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let bad = 0, checked = 0, skipped = 0;

/* 去掉行注释（粗略：只在字符串外处理） */
function stripLineComments(s) {
  return s.split('\n').map(line => {
    let inStr = false, esc = false, out = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (esc) { out += ch; esc = false; continue; }
      if (ch === '\\') { out += ch; esc = true; continue; }
      if (ch === '"') { inStr = !inStr; out += ch; continue; }
      if (!inStr && ch === '/' && line[i + 1] === '/') break;
      out += ch;
    }
    return out;
  }).join('\n');
}
function findObjectStart(s) {
  const anchor = /__KAOYAN_PATCHES\s*\[[^\]]+\]\s*=\s*/.exec(s);
  if (anchor) {
    const i = s.indexOf('{', anchor.index + anchor[0].length);
    return i;
  }
  const i = s.indexOf('{');
  return i;
}

for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const blocks = [...txt.matchAll(/```(json|js)\s*([\s\S]*?)```/g)];
  let okCount = 0, n = 0;
  for (const m of blocks) {
    let src = m[2];
    const start = findObjectStart(src);
    if (start < 0) { skipped++; continue; }
    const end = src.lastIndexOf('}');
    if (end <= start) { skipped++; continue; }
    src = stripLineComments(src.slice(start, end + 1));
    // 只检查"看起来像补丁模板"的块（含 grading 或 status/id 字段）
    if (!/"(grading|status|category|questions|completions)"\s*:/.test(src) && !/"(id)"\s*:/.test(src)) { skipped++; continue; }
    n++; checked++;
    try { JSON.parse(src); okCount++; }
    catch (e) {
      // 允许"对象字面量形式"（键无引号）——那是 JS 模板，不属于本检查范围
      if (/Expected property name/.test(e.message)) { skipped++; n--; checked--; continue; }
      bad++;
      const pos = (/position (\d+)/.exec(e.message) || [])[1];
      let where = '';
      if (pos) {
        const ln = src.slice(0, parseInt(pos, 10)).split('\n').length;
        where = '（约第 ' + ln + ' 行：' + (src.split('\n')[ln - 1] || '').trim().slice(0, 120) + '）';
      }
      console.log('  ❌ ' + f + ' 第 ' + n + ' 个模板解析失败：' + e.message + where);
    }
  }
  if (n === 0) console.log('  ·  ' + f + '：无可校验模板（跳过 ' + skipped + '）');
  else if (okCount === n) console.log('  ✅ ' + f + '：' + n + ' 个补丁模板全部可解析');
  else console.log('  →  ' + f + '：' + okCount + '/' + n + ' 可解析');
}
/* 文档里的"双引号套双引号"笔误（例如 category:""mine""）会让照抄的 JS 直接语法错误，
   这里逐文件扫一遍，防止这类笔误再回到文档里。 */
const DQ_TYPO = /:\s*""[A-Za-z_][\w-]*""/g;
for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const hits = [...txt.matchAll(DQ_TYPO)].map(m => m[0]);
  if (hits.length) {
    bad++;
    console.log('  ❌ ' + f + ' 含双引号笔误（应为单层双引号）：' + hits.join('、'));
  }
}

console.log('');
console.log('共校验 ' + checked + ' 个补丁模板（跳过 ' + skipped + ' 个非补丁代码块）；' + (bad === 0 ? '全部可解析 ✅' : bad + ' 个失败 ❌'));
process.exit(bad ? 1 : 0);
