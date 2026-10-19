/* 仓库复现性检查：验证仓库里每个命令、路径、引用都真实可用 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const REPO = process.argv[2] || path.resolve(__dirname, '..');
let bad = 0, warn = 0;
const ok = m => console.log('  ✅ ' + m);
const no = m => { bad++; console.log('  ❌ ' + m); };
const wr = m => { warn++; console.log('  ⚠️  ' + m); };

console.log('仓库复现性检查：' + REPO);
console.log('');

/* 1. 必需文件 */
console.log('【1】必需文件是否齐全');
const files = [
  'README.md', 'AGENTS.md', 'LICENSE', '.gitignore', 'install.js', 'install.sh', 'install.cmd',
  'grade-once.sh', 'start-helper.sh', 'stop-helper.sh', 'update-bank.sh',
  '一键批改.cmd', 'start-helper.cmd', 'stop-helper.cmd', '更新题库.cmd',
  'app/index.html', 'app/data/state.js', 'app/data/questions.js', 'app/data/figures.js',
  'examples/demo-submissions.js', 'examples/patches/sub_0001.js', 'examples/patches/sub_0002.js',
  'app/data/patches/.gitkeep', 'app/data/uploads/.gitkeep', 'app/data/backups/.gitkeep',
  'tools/check-repo.js', 'tools/make-examples.js',
  'app/tools/validate.js', 'app/tools/grade-helper.js', 'app/tools/gen-questions.js', 'app/tools/en2-data.js',
  'tools/grade-once.js', 'tools/gen-win-scripts.js', 'tools/check-repo.js', 'tools/make-examples.js',
  'tools/check-ref-json.js', 'tools/normalize-ref-json.js', 'tools/eval-in-browser.js', 'tools/test-guards.js',
  'skill/SKILL.md', 'skill/references/english1_essay_major.md', 'skill/references/english1_essay_minor.md',
  'skill/references/english1_translation.md', 'skill/references/translation_long_sentence.md',
  'skill/references/english2_essay_major.md', 'skill/references/english2_essay_minor.md',
  'skill/references/english2_translation.md', 'skill/references/web_bridge.md',
  '.dsh/skills/kaoyan-english-tutor/SKILL.md',
  '.dsh/skills/kaoyan-english-tutor/references/english2_essay_major.md',
  'docs/操作手册.pdf', 'docs/操作手册.html', 'docs/windows-安装说明.md', 'docs/macos-安装说明.md',
];
for (const f of files) {
  if (fs.existsSync(path.join(REPO, f))) { /* 静默通过，最后汇总 */ }
  else no('缺少 ' + f);
}
if (!bad) ok(files.length + ' 个必需文件全部存在');

/* 2. 数据可加载 */
console.log('');
console.log('【2】数据文件能否加载');
try {
  const w = {};
  const ctx = vm.createContext(w);
  vm.runInContext('var window = this;', ctx);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'app/data/figures.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'app/data/questions.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'app/data/state.js'), 'utf8'), ctx);
  const qs = w.__KAOYAN_QUESTIONS || [];
  const st = w.__KAOYAN_STATE || {};
  const real = qs.filter(q => q.category === 'real');
  const mock = qs.filter(q => q.category === 'mock');
  ok('题库加载成功：' + qs.length + ' 道（真题 ' + real.length + '，模拟 ' + mock.length + '）');
  // 分科目完整性：英语一 2010—2026 大作文+小作文；英语二 2010—2026 大作文+小作文+翻译
  const en1 = qs.filter(q => q.subject === 'en1' && q.category === 'real');
  const en2 = qs.filter(q => q.subject === 'en2' && q.category === 'real');
  const miss1 = [], miss2 = [];
  for (let y = 2010; y <= 2026; y++) {
    for (const k of ['major', 'minor']) if (!qs.some(q => q.id === 'q_real_' + y + '_' + k)) miss1.push(y + '/' + k);
    for (const k of ['major', 'minor', 'translation']) if (!qs.some(q => q.id === 'q_en2_' + y + '_' + k)) miss2.push(y + '/' + k);
  }
  miss1.length ? no('英语一缺题 ' + miss1.length + ' 道：' + miss1.slice(0, 6).join('、'))
               : ok('英语一真题 ' + en1.length + ' 道，2010—2026 大作文 + 小作文齐全');
  miss2.length ? no('英语二缺题 ' + miss2.length + ' 道：' + miss2.slice(0, 6).join('、'))
               : ok('英语二真题 ' + en2.length + ' 道，2010—2026 大作文 + 小作文 + 翻译齐全');
  const noSubj = qs.filter(q => q.subject !== 'en1' && q.subject !== 'en2');
  noSubj.length ? no('有 ' + noSubj.length + ' 道题缺 subject：' + noSubj.slice(0, 4).map(q => q.id).join('、'))
                : ok('全部 ' + qs.length + ' 道题都带 subject 字段（en1/en2）');
  const examDate = (st.meta && st.meta.examDate) || '';
  examDate === '' ? ok('考试日期为空白（模板状态，用户无需手工清理个人信息）') : wr('考试日期非空：' + examDate);
  ok('提交记录 ' + ((st.completions || []).length) + ' 条（默认空模板，示例见 examples/）');
  // 图函数完整性
  const fig = w.__KAOYAN_FIG || {};
  const need = ['table', 'barChart', 'pieChart', 'pie2', 'pieBar', 'twinBars', 'lineChart', 'twoPanel', 'facing', 'crowd', 'phones', 'books', 'person'];
  const miss = need.filter(k => typeof fig[k] !== 'function');
  miss.length ? no('图库缺少函数：' + miss.join(', ')) : ok('图库函数齐全（图画 + 表格/柱状/饼图/双图表/折线图）');
} catch (e) { no('数据加载失败：' + e.message); }

/* 3. 未定义图函数扫描（防止题库里有炸点） */
console.log('');
console.log('【3】题库是否引用了不存在的图函数');
try {
  const w = {};
  const ctx = vm.createContext(w);
  vm.runInContext('var window = this;', ctx);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'app/data/figures.js'), 'utf8'), ctx);
  const fig = w.__KAOYAN_FIG || {};
  const src = fs.readFileSync(path.join(REPO, 'app/data/questions.js'), 'utf8');
  const used = [...new Set([...src.matchAll(/F\.([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]))];
  const missing = used.filter(k => typeof fig[k] !== 'function');
  missing.length ? no('题库引用了不存在的图函数：' + missing.join(', ')) : ok('题库用到的图函数都存在：' + used.join(', '));
} catch (e) { no('扫描失败：' + e.message); }

/* 4. 文档里的路径引用是否都存在 */
console.log('');
console.log('【4】文档里提到的文件路径是否真实存在');
const docs = ['README.md', 'AGENTS.md', 'docs/windows-安装说明.md', 'docs/macos-安装说明.md'];
for (const d of docs) {
  const p = path.join(REPO, d);
  if (!fs.existsSync(p)) continue;
  const txt = fs.readFileSync(p, 'utf8');
  // 抓取形如 app/xxx、tools/xxx、skill/xxx、docs/xxx 的路径
  const refs = [...new Set([...txt.matchAll(/(?:^|[\s`(（\[])((?:app|tools|skill|docs|\.dsh)\/[\w\u4e00-\u9fa5.\-\/]+?\.(?:md|js|html|pdf|sh|json))(?![a-z])/g)].map(m => m[1].trim()))];
  // 运行期才会出现的用户数据文件（不进仓库、可能还没生成），不算"路径不存在"
  const RUNTIME_DATA = ['app/data/pending_submissions.json', 'app/data/state.corrupt.bak'];
  const missing = refs.filter(r => !/X{2,}|xxxx/i.test(r) && !RUNTIME_DATA.includes(r) && !fs.existsSync(path.join(REPO, r)));
  if (missing.length) no(d + ' 引用了不存在的路径：' + missing.join(', '));
  else ok(d + ' 的 ' + refs.length + ' 处路径引用全部有效');
}

/* 5. 文档里的命令是否都是真实文件 */
console.log('');
console.log('【5】文档里给出的命令是否指向真实脚本');
const cmds = ['install.js', 'tools/grade-once.js', 'app/tools/validate.js', 'app/tools/grade-helper.js', 'app/tools/gen-questions.js'];
for (const d of docs) {
  const p = path.join(REPO, d);
  if (!fs.existsSync(p)) continue;
  const txt = fs.readFileSync(p, 'utf8');
  for (const c of cmds) {
    if (txt.includes(c) && !fs.existsSync(path.join(REPO, c))) no(d + ' 提到 ' + c + ' 但文件不存在');
  }
}
ok('命令引用检查完成');

/* 6. 是否残留个人信息 */
console.log('');
console.log('【6】是否残留个人 / 机器专属信息');
// 用拼接构造，避免本脚本自身命中（也便于以后换人维护）
const personal = ['陈俊', '娇阳'].join('') === '' ? [] : [['陈俊', '娇阳'].join(''), 'Desktop/' + ['考研', '英语作文'].join(''), 'Desktop\\' + ['考研', '英语作文'].join(''), 'C:' + '\\Users\\', 'C:' + '/Users/'];
const SELF = path.basename(__filename);
const scan = [];
(function walk(dir){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(md|js|html|sh|cmd|json|txt)$/.test(e.name)) continue;
    if (e.name.endsWith('.pdf')) continue;
    if (e.name === SELF) continue;   // 检查脚本自身含用于比对的模式，跳过
    scan.push(p);
  }
})(REPO);
let hits = 0;
for (const p of scan) {
  const t = fs.readFileSync(p, 'utf8');
  for (const pat of personal) {
    if (t.includes(pat)) { hits++; no('个人信息「' + pat + '」出现在 ' + path.relative(REPO, p)); }
  }
}
if (!hits) ok('未发现个人姓名 / 本机绝对路径（已扫描 ' + scan.length + ' 个文本文件）');

/* 7. 脚本语法 */
console.log('');
console.log('【7】JS 脚本语法');
for (const f of ['install.js', 'tools/grade-once.js', 'tools/gen-win-scripts.js', 'app/tools/validate.js', 'app/tools/grade-helper.js', 'app/tools/gen-questions.js']) {
  const r = spawnSync(process.execPath, ['--check', path.join(REPO, f)], { encoding: 'utf8' });
  if (r.error) { wr(f + ' 无法启动 node --check（' + r.error.code + '），本项跳过'); continue; }
  r.status === 0 ? null : no(f + ' 语法错误：' + ((r.stderr || '').split('\n')[0] || ('退出码 ' + r.status)));
}
if (!bad) ok('6 个 JS 脚本语法全部通过');

/* 8. Unix 脚本的换行与 shebang */
console.log('');
console.log('【8】Unix 脚本格式（换行符 / shebang / 无 BOM）');
for (const f of ['install.sh', 'grade-once.sh', 'start-helper.sh', 'stop-helper.sh', 'update-bank.sh']) {
  const p = path.join(REPO, f);
  if (!fs.existsSync(p)) { no(f + ' 不存在'); continue; }
  const buf = fs.readFileSync(p);
  const probs = [];
  if (buf[0] === 0xEF && buf[1] === 0xBB) probs.push('含 BOM');
  if (buf.slice(0, 2).toString() !== '#!') probs.push('缺少 shebang');
  if (buf.includes(Buffer.from('\r\n'))) probs.push('含 CRLF（macOS/Linux 应使用 LF）');
  probs.length ? no(f + '：' + probs.join('、')) : ok(f + ' 格式正确（LF + shebang + 无 BOM）');
}

/* 9. 技能包结构（路由、章节、编码） */
console.log('');
console.log('【9】技能包结构（SKILL.md 路由 ↔ references；新文档章节是否齐全）');
{
  const r = spawnSync(process.execPath, [path.join(REPO, 'tools', 'check-skill.js'), REPO], { encoding: 'utf8' });
  if (r.error) wr('无法启动 check-skill.js（' + r.error.code + '），本项跳过');
  else if (r.status === 0) ok('技能包结构检查通过（共 ' + String(r.stdout || '').split('\n').length + ' 行输出）');
  else no('技能包结构检查失败：\n' + String(r.stdout || '').split('\n').filter(l => l.includes('❌')).join('\n'));
}

console.log('');
console.log(bad === 0 ? '结果：全部通过（警告 ' + warn + ' 项）' : '结果：' + bad + ' 项失败，' + warn + ' 项警告');
process.exit(bad ? 1 : 0);
