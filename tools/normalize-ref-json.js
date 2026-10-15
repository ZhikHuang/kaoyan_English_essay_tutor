/* 规范化参考文档 JSON 代码块里的中文引号：
   把「"key": "值里混入的半角引号"」统一替换为全角「」，使整块可被 JSON.parse。 */
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
let txt = fs.readFileSync(file, 'utf8');
const m = /(```js\s*)([\s\S]*?)(```)/.exec(txt);
if (!m) { console.log('未找到 js 代码块'); process.exit(1); }

/* 把一行里"作为值/数组元素出现的字符串"内部的半角引号换成成对全角引号 */
function fixLine(line) {
  // 情形 A： "key": "....",  或  "key": "...."
  let mm = /^(\s*"[A-Za-z_][\w]*"\s*:\s*")([\s\S]*?)("\s*,?\s*)$/.exec(line);
  if (mm) return mm[1] + pairify(mm[2]) + mm[3];
  // 情形 B：数组/纯字符串元素： "....",
  mm = /^(\s*")([\s\S]*?)("\s*,?\s*)$/.exec(line);
  if (mm) return mm[1] + pairify(mm[2]) + mm[3];
  return line;
}
/* 把值里的半角引号成对换成 「」 */
function pairify(v) {
  let out = '', n = 0;
  for (const ch of v) {
    if (ch === '"') { out += (n % 2 === 0 ? '「' : '」'); n++; }
    else out += ch;
  }
  return out;
}

const lines = m[2].split('\n').map(fixLine);
const newBlock = lines.join('\n');
txt = txt.slice(0, m.index + m[1].length) + newBlock + txt.slice(m.index + m[1].length + m[2].length);
fs.writeFileSync(file, txt, 'utf8');
console.log('已规范化：' + path.basename(file));
