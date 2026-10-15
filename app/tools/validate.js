/* 自检工具：node tools/validate.js [--report]
   无参数   —— 检查内联脚本语法、数据文件、SVG、补丁字段与分值自洽
   --report —— 额外用最小 DOM 仿真跑一遍页面逻辑，检查真实渲染结果        */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let fail = 0;
function ok(m){ console.log('  OK   ' + m); }
function bad(m){ console.log('  FAIL ' + m); fail++; }
/* 条件断言（staticChecks 与渲染仿真都用它） */
function check(cond, msg){ if(cond) ok(msg); else bad(msg); }

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
let qsLoaded = 0;               // questions.js 成功载入的题目数（供 state.js 检查判断干净模板）

function staticChecks(){
  console.log('[1] index.html 内联脚本');
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  console.log('        共 ' + scripts.length + ' 段内联脚本');
  scripts.forEach((src, i) => {
    try { new Function(src); ok('第 ' + (i+1) + ' 段语法通过（' + src.length + ' 字符）'); }
    catch (e) { bad('第 ' + (i+1) + ' 段语法错误：' + e.message); }
  });
  // 只统计真正的标签：跳过 HTML 注释与 JS 字符串里的 "<script"（例如 createElement('script')）
  const tagged = html.replace(/<!--[\s\S]*?-->/g, ' ')
                     .replace(/'(?:[^'\\]|\\.)*'/g, "''")
                     .replace(/"(?:[^"\\]|\\.)*"/g, '""');
  const openTags = (tagged.match(/<script(?=[\s>])/g) || []).length;
  const closeTags = (tagged.match(/<\/script\s*>/g) || []).length;
  openTags === closeTags ? ok('script 标签配对 ' + openTags + '/' + closeTags)
                         : bad('script 标签不配对（开 ' + openTags + ' / 闭 ' + closeTags + '）');
  ['data/state.js', 'data/questions.js', 'data/figures.js'].forEach(p => {
    html.includes(p) ? ok('引用了 ' + p) : bad('未引用 ' + p);
  });

  console.log('[2] data/questions.js 与 data/state.js');
  global.window = {};
  try {
    new Function('window', fs.readFileSync(path.join(root, 'data', 'figures.js'), 'utf8'))(global.window);
    new Function('window', fs.readFileSync(path.join(root, 'data', 'questions.js'), 'utf8'))(global.window);
    const qs = global.window.__KAOYAN_QUESTIONS || [];
    qs.length ? ok('questions.js 载入 ' + qs.length + ' 道题') : bad('questions.js 未产出题目');
    qs.filter(q => q.figure).forEach(q => {
      const f = q.figure;
      if (!/^<svg[\s\S]*<\/svg>$/.test(f.trim())) bad(q.id + ' 的 figure 不是完整 <svg>…</svg>');
      else if ((f.match(/</g)||[]).length !== (f.match(/>/g)||[]).length) bad(q.id + ' 的 SVG 尖括号不配对');
      else ok(q.id + ' 的 SVG 示意图 ' + f.length + ' 字符，结构完整');
    });
    const kinds = {};
    qs.forEach(q => kinds[q.kind] = (kinds[q.kind]||0)+1);
    qsLoaded = qs.length;
    console.log('        题型分布：' + JSON.stringify(kinds));
    // 科目分布与英语二完整性
    const subj = { en1: 0, en2: 0 };
    qs.forEach(q => { subj[q.subject === 'en2' ? 'en2' : 'en1']++; });
    console.log('        科目分布：英语一 ' + subj.en1 + ' 道 / 英语二 ' + subj.en2 + ' 道');
    const en2Years = [...new Set(qs.filter(q => q.subject === 'en2')
      .map(q => (String(q.year || '').match(/\d{4}/) || [''])[0]).filter(Boolean))].sort();
    const missingEn2 = [];
    for (let y = 2010; y <= 2026; y++) {
      for (const k of ['major', 'minor', 'translation']) {
        if (!qs.some(q => q.id === 'q_en2_' + y + '_' + k)) missingEn2.push(y + '/' + k);
      }
    }
    if (!en2Years.length) bad('题库里没有英语二题目（应覆盖 2010—2026）');
    else if (missingEn2.length) bad('英语二缺题 ' + missingEn2.length + ' 道：' + missingEn2.slice(0, 8).join('、') + (missingEn2.length > 8 ? ' …' : ''));
    else ok('英语二覆盖 ' + en2Years[0] + '—' + en2Years[en2Years.length - 1] + '，共 ' + en2Years.length + ' 届 × 大作文/小作文/翻译齐全');
    // 英语一完整性（此前只校验英语二，删光 34 道英语一真题也能"全部通过"，这里补上）
    const en1Years = [...new Set(qs.filter(q => q.subject !== 'en2')
      .map(q => (String(q.year || '').match(/\d{4}/) || [''])[0]).filter(Boolean))].sort();
    const missingEn1 = [];
    for (let y = 2010; y <= 2026; y++) {
      for (const k of ['major', 'minor']) {
        if (!qs.some(q => q.id === 'q_real_' + y + '_' + k)) missingEn1.push(y + '/' + k);
      }
    }
    if (!en1Years.length) bad('题库里没有英语一题目（应覆盖 2010—2026 大作文 + 小作文）');
    else if (missingEn1.length) bad('英语一缺题 ' + missingEn1.length + ' 道：' + missingEn1.slice(0, 8).join('、') + (missingEn1.length > 8 ? ' …' : ''));
    else ok('英语一覆盖 ' + en1Years[0] + '—' + en1Years[en1Years.length - 1] + '，共 ' + en1Years.length + ' 届 × 大作文/小作文齐全');
    // 英语一：翻译为 5 个划线句；英语二整段翻译要给英文原文（passage），并按句拆分
    qs.filter(q => q.kind === 'translation').forEach(q => {
      const n = (q.sentences || []).length;
      if (q.subject === 'en2') {
        const hasPassage = !!(q.passage || '').trim();
        const hasSentences = Array.isArray(q.sentences) && q.sentences.length > 0;
        if (!hasPassage && !hasSentences) bad(q.id + ' 英语二整段翻译缺少英文原文（passage/sentences 都为空，学生没有可翻译的内容）');
        else if (!hasPassage) bad(q.id + ' 英语二整段翻译缺 passage（只有按句拆分版，页面无法显示整段原文）');
        else ok(q.id + ' 英语二整段翻译：原文 ' + (q.passage || '').length + ' 字符 / 按句拆分为 ' + n + ' 句');
      } else {
        n === 5 ? ok(q.id + ' 划线句 5 句') : bad(q.id + ' 划线句数量=' + n);
      }
    });
    // 每道题都要有 subject
    const noSubj = qs.filter(q => q.subject !== 'en1' && q.subject !== 'en2');
    noSubj.length ? bad('有 ' + noSubj.length + ' 道题缺 subject 字段：' + noSubj.slice(0, 5).map(q => q.id).join('、'))
                  : ok('全部 ' + qs.length + ' 道题都带 subject 字段');
  } catch (e) { bad('questions.js 执行失败：' + e.message); }

  try {
    const w = global.window;
    new Function('window', fs.readFileSync(path.join(root, 'data', 'state.js'), 'utf8'))(w);
    const st = w.__KAOYAN_STATE;
    st ? ok('state.js 载入，题目 ' + (st.questions||[]).length + ' 道，提交 ' + (st.completions||[]).length + ' 条')
       : bad('state.js 未产出 __KAOYAN_STATE（检查变量名是否为 window.__KAOYAN_STATE）');
    if (st && (!st.questions || !st.questions.length)) {
      // state.js 的 questions 留空是"干净模板"的正常形态：题库由 data/questions.js 提供，
      // 页面会把两个文件合并去重（见 index.html 的 loadData）。
      if (qsLoaded > 0) ok('state.js 的 questions 为空（正常：题库由 data/questions.js 提供，页面会自动合并）');
      else bad('state.js 与 questions.js 都没有题目（网页题库会空）');
    }
  } catch (e) { bad('state.js 执行失败：' + e.message); }

  console.log('[3] data/patches/*.js');
  const pdir = path.join(root, 'data', 'patches');
  const files = fs.existsSync(pdir) ? fs.readdirSync(pdir).filter(f => f.endsWith('.js')) : [];
  const patchIds = files.map(f => f.replace('.js',''));
  files.forEach(f => {
    const w = {};
    try {
      new Function('window', fs.readFileSync(path.join(pdir, f), 'utf8'))(w);
      const id = f.replace('.js', '');
      const p = (w.__KAOYAN_PATCHES || {})[id];
      if (!p) { bad(f + ' 未写入 window.__KAOYAN_PATCHES["' + id + '"]'); return; }
      const g = p.grading || {};
      const problems = [];
      if (p.id !== id) problems.push('补丁内 id=' + p.id + ' 与文件名不符');
      if (p.status !== 'graded') problems.push('status=' + p.status);
      if (typeof g.score !== 'number') problems.push('score 不是数字');
      if (typeof g.fullScore !== 'number') problems.push('fullScore 不是数字');
      if (typeof g.score === 'number' && typeof g.fullScore === 'number' && g.score > g.fullScore) problems.push('score > fullScore');
      if (!(g.review && Array.isArray(g.review.priority))) problems.push('缺少 review.priority');
      else if (g.review.priority.length !== 3) problems.push('review.priority 长度=' + g.review.priority.length + '（要求 3）');
      (g.sentenceNotes || []).forEach((n, i) => {
        if (!['must','optional','ok'].includes(n.level)) problems.push('sentenceNotes[' + i + '].level 非法：' + n.level);
        if (n.level === 'must' && !n.explain) problems.push('sentenceNotes[' + i + '] 是 must 但没有 explain');
      });
      (g.sentences || []).forEach((s, i) => {
        if (typeof s.score !== 'number') problems.push('sentences[' + i + '].score 非数字');
        const sum = (s.points||[]).reduce((a,b) => a + (Number(b.score)||0), 0);
        const got = (s.points||[]).reduce((a,b) => a + (Number(b.got)||0), 0);
        if (Math.abs(sum - 2) > 1e-9) problems.push('sentences[' + i + '] 采分点合计=' + sum + '（应为 2）');
        if (Math.abs(got - Number(s.score)) > 1e-9) problems.push('sentences[' + i + '] 采分点得分合计=' + got + ' ≠ 单句得分 ' + s.score);
      });
      (g.expressions || []).forEach((e, i) => { if (!e.phrase) problems.push('expressions[' + i + '] 缺 phrase'); });
      if ((g.sentences || []).length) {
        const sum = g.sentences.reduce((a, x) => a + (Number(x.score) || 0), 0) + (Number(g.typoDeduction) || 0);
        if (Math.abs(sum - Number(g.score)) > 1e-9) problems.push('各句得分和+扣分=' + sum + ' ≠ 总分 ' + g.score);
        if (g.totalScore != null && Math.abs(Number(g.totalScore) - Number(g.score)) > 1e-9) problems.push('totalScore=' + g.totalScore + ' ≠ score');
      }
      problems.length ? bad(f + '：' + problems.join('；')) : ok(f + ' 结构合法（得分 ' + g.score + '/' + g.fullScore + '）');
    } catch (e) { bad(f + ' 执行失败：' + e.message); }
  });
  if (files.length) ok('批改补丁检查完成（' + files.length + ' 个）');
  else ok('当前没有批改补丁（干净模板的正常状态；examples/patches/ 有示例可复制进 app/data/patches/）');

  console.log('[4] 提交与补丁对应关系');
  const st = global.window.__KAOYAN_STATE || { completions: [] };
  st.completions.forEach(c => {
    if (c.status === 'graded' && !patchIds.includes(c.id)) bad(c.id + ' 标记为 graded 但没有补丁文件');
    else if (patchIds.includes(c.id)) ok(c.id + ' 有补丁，网页会以补丁内容显示');
  });

  console.log('[5] 网页探测清单覆盖');
  const m = html.match(/var PATCH_IDS = \[\]|function rebuildPatchIds\(\)/);
  check(!!m, '补丁探测范围是动态生成的（rebuildPatchIds），不再写死编号上限');
  const cap = html.match(/for\(var i = 1; i <= max \+ (\d+); i\+\+\)/);
  check(!!cap, '探测范围为「最大已见编号 + ' + (cap ? cap[1] : '?') + '」，练到更多篇也不会漏');
}

/* ---- 渲染仿真：用最小 DOM 跑一遍页面逻辑 ---- */
function renderReport(){
  const vm = require('vm');
  function makeEl(tag){
    return {
      tagName: tag, children: [], childNodes: [], _html:'', _text:'', attrs:{}, style:{}, hidden:false, value:'', files:[],
      classList:{ _s:new Set(), add(c){this._s.add(c)}, remove(c){this._s.delete(c)},
                  toggle(c,f){ f?this._s.add(c):this._s.delete(c) }, contains(c){return this._s.has(c)} },
      set innerHTML(v){ this._html = v; }, get innerHTML(){ return this._html; },
      set textContent(v){ this._text = String(v); }, get textContent(){ return this._text; },
      set className(v){ this._cls = v; }, get className(){ return this._cls || ''; },
      appendChild(c){ this.children.push(c); this.childNodes.push(c); return c; },
      removeChild(c){ const i = this.children.indexOf(c); if(i>=0){this.children.splice(i,1);this.childNodes.splice(i,1);} return c; },
      remove(){ if(this.parentNode) this.parentNode.removeChild(this); },
      setAttribute(k,v){ this.attrs[k]=String(v); },
      getAttribute(k){ return Object.prototype.hasOwnProperty.call(this.attrs,k)?this.attrs[k]:null; },
      addEventListener(){}, removeEventListener(){},
      querySelector(){ return null; }, querySelectorAll(){ return []; },
      closest(){ return null; }, contains(){ return false; },
      getBoundingClientRect(){ return {top:0,left:0,width:100,height:100}; },
      focus(){}, click(){}, insertBefore(c){ return this.appendChild(c); }
    };
  }
  const els = {};
  ['toast','cd','m-sub','m-graded','m-rate','m-sync','b-pending','tabs','btn-reload',
   'view-board','view-submit','view-results','view-bank','view-mistakes','view-trend']
   .forEach(id => { const e = makeEl('div'); e.id = id; els['#'+id] = e; });
  const document = {
    readyState:'complete', hidden:false,
    head: makeEl('head'), body: makeEl('body'),
    createElement: makeEl,
    querySelector(sel){ return els[sel] || null; },
    querySelectorAll(){ return []; },
    addEventListener(){}, getElementById(id){ return els['#'+id] || null; }
  };
  const ls = {};
  const sandbox = {
    console, setTimeout, clearTimeout, setInterval:()=>0, clearInterval:()=>{},
    Promise, JSON, Date, Math, Object, Array, String, Number, parseFloat, parseInt, isNaN,
    document, location:{ protocol:'file://', hash:'' }, navigator:{ userAgent:'node' },
    localStorage:{ getItem:k=>(k in ls?ls[k]:null), setItem:(k,v)=>{ls[k]=String(v)}, removeItem:k=>{delete ls[k]} },
    Blob:function(){}, URL:{createObjectURL:()=>'blob:x'}, FileReader:function(){}, confirm:()=>false,
    addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return true; }
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  const code = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
  const realSetTimeout = sandbox.setTimeout;
  // 打开页面的仿真钩子：页面只登记脚本请求，由这里读磁盘同步执行（等价于浏览器加载）
  sandbox.__KAOYAN_HARNESS__ = true;
  sandbox.__KAOYAN_SCRIPTS = [];
  function executeRequested(){
    const list = sandbox.__KAOYAN_SCRIPTS || [];
    let n = 0;
    while (list.length && n < 400) {
      n++;
      const clean = String(list.shift()).split('?')[0];
      const abs = path.join(root, decodeURIComponent(clean));
      if (!fs.existsSync(abs)) continue;     // 补丁探测清单里不存在的编号，跳过
      try { vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, {filename: clean}); }
      catch (e) { console.log('  FAIL 执行 ' + clean + ' 失败：' + e.message); }
    }
  }
  vm.runInContext(code, ctx, {filename:'index.html inline'});
  executeRequested();                          // questions.js / state.js
  // 让"干净的仓库包"也能完整跑一遍仿真：把 examples/ 里的示例提交与示例补丁装进沙箱
  // （只影响本进程，不动磁盘上的任何数据文件）
  const exDir = path.join(root, '..', 'examples');
  const exSubsFile = path.join(exDir, 'demo-submissions.js');
  const exPatchDir = path.join(exDir, 'patches');
  const useExamples = fs.existsSync(exSubsFile);
  if (useExamples) {
    try {
      const demo = vm.runInContext('(' + fs.readFileSync(exSubsFile, 'utf8') + ')', ctx);
      if (demo && demo.length) vm.runInContext('window.__DEMO_SUBS__ = ' + JSON.stringify(demo) + ';', ctx);
      if (fs.existsSync(exPatchDir)) {
        for (const f of fs.readdirSync(exPatchDir)) {
          if (/^sub_\d+\.js$/.test(f)) vm.runInContext(fs.readFileSync(path.join(exPatchDir, f), 'utf8'), ctx, {filename: 'examples/patches/' + f});
        }
      }
      console.log('  （渲染仿真已装入 examples/ 的示例数据，仅用于检查功能）');
    } catch (e) { console.log('  ⚠️ 载入 examples/ 失败：' + e.message); }
  }
  // 补丁：按探测清单读磁盘执行，然后放行页面的 scanPatchFiles 等待
  let harnessDone;
  sandbox.__KAOYAN_HARNESS_WAIT__ = new Promise(r => { harnessDone = r; });
  realSetTimeout(function(){
    const dirs = [path.join(root, 'data', 'patches'), exPatchDir];
    const ids = [];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        if (!/^sub_\d+\.js$/.test(f)) continue;
        const id = f.replace('.js', '');
        if (ids.includes(id)) continue;
        ids.push(id);
        try { vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, {filename: f}); }
        catch (e) { console.log('  FAIL 执行补丁 ' + id + ' 失败：' + e.message); }
      }
    }
    // 把示例提交并入页面种子数据，使"练习次数/改稿链"等检查可运行
    if (useExamples) {
      try {
        vm.runInContext(`(function(){ var d = window.__DEMO_SUBS__ || []; if(!d.length) return;
          var S = window.__KAOYAN_DIAG.store;
          d.forEach(function(x){ if(!S.seed.completions.some(function(c){ return c.id === x.id; })) S.seed.completions.push(x); });
        })();`, ctx);
      } catch (e) { console.log('  ⚠️ 装入示例提交失败：' + e.message); }
    }
    harnessDone(ids);
    executeRequested();
  }, 120);

  return new Promise(resolve => {
    // 等待页面自报加载完成（最多 30 秒）
    let waited = 0;
    (function poll(){
      const diag = sandbox.__KAOYAN_DIAG;
      if (diag && diag.ready) return runChecks(diag);
      waited += 100;
      if (waited > 30000) {
        console.log('  FAIL 等待页面数据加载超时（30 秒）——检查 data/ 目录与脚本注入');
        return resolve(1);
      }
      realSetTimeout(poll, 100);
    })();

    function runChecks(diag){
      let f = 0;
      // 复用顶层 check()，只额外累计失败数
      const checkf = (cond, msg) => { check(cond, msg); if(!cond) f++; };
      const view = v => { diag.render(v); return diag.html[v]; };

      console.log('  --- 数据解析 ---');
      checkf(diag.seedQuestions >= 95, '题库载入 ' + diag.seedQuestions + ' 道（≥95：英语一真题 34 + 英语二真题 51 + 模拟 10）');
      checkf(diag.patchFiles.length === 2, '批改补丁载入 ' + diag.patchFiles.length + ' 个（期望 2）');
      diag.resolved.forEach(r => checkf(r.qTitle.indexOf('删除') < 0, r.id + ' → 题目「' + r.qTitle + '」'));
      checkf(diag.resolved.every(r => r.essayLen > 0), '每条提交都读到正文');
      checkf(diag.resolved.every(r => r.score != null), '每条提交都读到分数：' + diag.resolved.map(r => r.id + '=' + r.score).join('、'));

      console.log('  --- 题库分类与题目归并 ---');
      const cats0 = diag.categories;
      checkf(cats0.real >= 34 && cats0.mock >= 10 && cats0.mine === 0,
            '三类题目数量：真题 ' + cats0.real + ' / 模拟 ' + cats0.mock + ' / 我的题目 ' + cats0.mine + '（真题应 ≥34，覆盖 2010—2026）');
      checkf(diag.practiceCount('q_mock_01_major') === 1, 'q_mock_01_major 练习次数 = ' + diag.practiceCount('q_mock_01_major') + '（期望 1）');
      checkf(diag.practiceCount('q_real_2021_major') === 0, 'q_real_2021_major 练习次数 = ' + diag.practiceCount('q_real_2021_major') + '（期望 0）');
      checkf(diag.findSimilar('你的外国朋友刚毕业，打算在中国找工作，写邮件祝贺并给出求职建议，约100词，署名 Li Ming').length > 0,
            '自带题目能匹配到题库里的相似题（用于归并）');
      console.log('        [probe3] top=' + JSON.stringify(diag.findSimilar('你的外国朋友刚毕业，打算在中国找工作，请你写一封约100词的邮件：祝贺毕业、给出求职建议、表达祝愿，署名 Li Ming。').slice(0,3)) + ' best=' + JSON.stringify(diag.bestDuplicate('你的外国朋友刚毕业，打算在中国找工作，请你写一封约100词的邮件：祝贺毕业、给出求职建议、表达祝愿，署名 Li Ming。')));
      const dupHit = diag.bestDuplicate('你的外国朋友刚毕业，打算在中国找工作，请你写一封约100词的邮件：祝贺毕业、给出求职建议、表达祝愿，署名 Li Ming。');
      checkf(dupHit && dupHit.id === 'q_real_2021_minor',
            '重复题自动归并判定：命中 ' + (dupHit ? dupHit.id : 'null') + '（期望 q_real_2021_minor）');
      checkf(diag.bestDuplicate('Write an essay about whether students should be allowed to bring mobile phones into the classroom and give your own reasons') === null,
            '不相干的题目不会被误归并');

      console.log('  --- 题库更新规则 ---');
      checkf(diag.resolved.every(r => r.qTitle.indexOf('删除') < 0), '题目解析使用合并后的题库');
      const highs = diag.testHighSubId('sub_0030');
      checkf(highs.indexOf('sub_0030') >= 0 && highs.indexOf('sub_0038') >= 0,
            '探测范围随最大编号放大：见 sub_0030 时探到 ' + highs[highs.length-1] + '（不会漏补丁）');
      checkf(diag.seedQuestions === diag.categories.real + diag.categories.mock + diag.categories.mine,
            '题库总数 = 三类之和（state.js 与 questions.js 已合并去重）');

      console.log('  --- 视图渲染 ---');
      const board = view('board');
      checkf(board.indexOf('最近批改') >= 0, '总览：正常渲染');
      checkf(board.indexOf('题目已删除') < 0, '总览：没有「题目已删除」');
      checkf(board.indexOf('题库练习进度') >= 0, '总览：题库练习进度（三类）存在');
      const bankAll = view('bank');
      checkf(bankAll.indexOf('考研真题') >= 0 && bankAll.indexOf('模拟题') >= 0 && bankAll.indexOf('我的题目') >= 0,
            '题库：三类标签都存在');
      checkf(bankAll.indexOf('已练 1 次') >= 0, '题库：显示「已练 1 次」');
      checkf(bankAll.indexOf('未练习') >= 0, '题库：显示「未练习」');
      checkf(bankAll.indexOf('已练习过') >= 0, '题库：顶部有练习进度汇总');
      // ---- 题库视图的科目维度检查 ----
      (function(){
        const bankAll = view('bank');
        const catM = bankAll.match(/英语一 <b>(\d+)<\/b>[\s\S]*?英语二 <b>(\d+)<\/b>/);
        const n1 = catM ? Number(catM[1]) : -1, n2 = catM ? Number(catM[2]) : -1;
        checkf(n1 >= 44 && n2 >= 51, '题库视图统计：英语一 ' + n1 + ' 道 / 英语二 ' + n2 + ' 道（应 ≥44 / ≥51）');
        const subjBtns = (bankAll.match(/data-subjfilter="(all|en1|en2)"/g) || []).length;
        checkf(subjBtns === 3, '题库视图有 3 个科目筛选按钮（实际 ' + subjBtns + ' 个）');
        const pill1 = (bankAll.match(/c-en1">英语一/g) || []).length;
        const pill2 = (bankAll.match(/c-en2">英语二/g) || []).length;
        checkf(pill1 > 0 && pill2 > 0, '题目条目带科目标签：英语一 ' + pill1 + ' / 英语二 ' + pill2 + ' 个');
        // 只筛英语二时，不应出现英语一题目
        diag.store.filter.subject = 'en2';
        const onlyEn2 = view('bank');
        const disp2 = onlyEn2.match(/显示 (\d+) 题/);
        const en1InEn2 = (onlyEn2.match(/c-en1">英语一/g) || []).length;
        checkf(disp2 && Number(disp2[1]) === n2, '筛「英语二」显示 ' + (disp2 ? disp2[1] : '?') + ' 题（应等于英语二总数 ' + n2 + '）');
        checkf(en1InEn2 === 0, '筛「英语二」时未混入英语一题目（实际 ' + en1InEn2 + ' 条）');
        diag.store.filter.subject = 'en1';
        const onlyEn1 = view('bank');
        const disp1 = onlyEn1.match(/显示 (\d+) 题/);
        checkf(disp1 && Number(disp1[1]) === n1, '筛「英语一」显示 ' + (disp1 ? disp1[1] : '?') + ' 题（应等于英语一总数 ' + n1 + '）');
        diag.store.filter.subject = 'all';
        // 提交页下拉是否按科目分组
        const sub = view('submit');
        const og = (sub.match(/━━ 英语[一二]（\d+ 题）━━/g) || []);
        checkf(og.length === 2, '提交页下拉按科目分组：' + (og.join(' / ') || '未分组'));
      })();
            diag.renderOpen('bank', 'q_mock_01_major');
      const bankOpen = diag.html.bank;
      checkf(bankOpen.indexOf('练习与改稿记录') >= 0, '题库展开：练习与改稿记录面板存在');
      checkf(bankOpen.indexOf('data-open-sub="sub_0001"') >= 0, '练习轨迹：可跳转查看该题每次提交的批改');
      checkf((bankOpen.match(/<svg/g)||[]).length === 1, '题库展开：渲染 1 张内嵌 SVG');
      checkf(bankOpen.indexOf('Write an essay of 160-200 words') >= 0, '题库展开：英文题干存在');
      const sub = view('submit');
      checkf(sub.indexOf('上传自己的题目') >= 0, '提交页：有「上传自己的题目」板块');
      checkf(sub.indexOf('in-revises') >= 0, '提交页：有「这一篇和这道题的关系」改稿选择器');
      checkf(sub.indexOf('题目原文') >= 0 && sub.indexOf('我的作文正文') >= 0, '上传板块：要求题目与作文一起提交');
      checkf(sub.indexOf('optgroup') >= 0, '提交页：题目按类别分组');
      diag.setDraftQuestion('q_mock_01_major');          // 切到已练过 1 次的题
      const sub2 = diag.html.submit;
      checkf(sub2.indexOf('这是这道题的第 2 次练习') >= 0, '提交页：已练过的题提示第几次练习');
      checkf(sub2.indexOf('[练过 1 次]') >= 0, '提交页：下拉里标注了练习次数');
      diag.setHelper('on', { running:false });
      checkf(diag.html.submit.indexOf('批改服务已连接') >= 0 && diag.html.submit.indexOf('id="btn-grade"') >= 0,
            '一键批改：检测到服务时显示「一键批改」按钮');
      diag.setHelper('off');
      checkf(diag.html.submit.indexOf('批改方式（当前：手动）') >= 0 && diag.html.submit.indexOf('一键批改.cmd') >= 0,
            '一键批改：没检测到服务时显示手动方式说明');
      const results = view('results');
      checkf((results.match(/class="notes"/g)||[]).length >= 1, '批改结果：逐句批改区块存在');
      checkf(results.indexOf('class="pttable"') >= 0, '批改结果：翻译采分点表格存在');
      checkf(results.indexOf('class="essay rev"') >= 0, '批改结果：修改后全文存在');
      const strong = (results.match(/<strong>/g)||[]).length;
      checkf(strong >= 3, '批改结果：修改处加粗标记 ' + strong + ' 处');
      checkf(results.indexOf('本篇注意事项') >= 0, '批改结果：本篇注意事项存在');
      checkf(results.indexOf('本篇是第') >= 0, '批改结果：标明是该题第几次提交');
      checkf(results.indexOf('表达积累') >= 0, '批改结果：表达积累存在');
      const mis = view('mistakes');
      const cats = (mis.match(/class="cat"/g)||[]).length;
      checkf(cats >= 3, '错题库：聚合出 ' + cats + ' 个错误类别');
      checkf(mis.indexOf('主谓一致') >= 0, '错题库：识别出「主谓一致」类别');
      checkf(mis.indexOf('表达积累库') >= 0, '错题库：表达积累库存在');
      const trend = view('trend');
      checkf((trend.match(/<svg/g)||[]).length === 1, '趋势：渲染 1 张得分率曲线');
      checkf(trend.indexOf('逐篇明细') >= 0, '趋势：逐篇明细表存在');

      console.log('  --- 改稿链与并排对比（放在最后，避免污染前面的断言）---');
      // 把 sub_0001 当第 1 稿，挂第 2 稿，再挂"以后在同一问题上再练"的第 3 稿
      diag.addDraft({ id:'sub_0051', questionId:'q_mock_01_major', submittedAt:'2026-02-15T09:00:00+08:00', draftGroup:'sub_0001', draftNo:2 });
      diag.addDraft({ id:'sub_0052', questionId:'q_mock_01_major', submittedAt:'2026-02-16T09:00:00+08:00', draftGroup:'sub_0051', draftNo:3, revises:'sub_0051' });
      const chain = diag.chainOf('sub_0001');
      checkf(chain.join('→') === 'sub_0001→sub_0051→sub_0052', '改稿链解析：' + chain.join(' → '));
      const cmp = diag.renderCompare('sub_0001');
      checkf(cmp.indexOf('改稿总览') >= 0, '对比视图：标题正确');
      checkf(cmp.indexOf('第 1 稿') >= 0 && cmp.indexOf('第 3 稿') >= 0, '对比视图：三稿并排列出');
      checkf(cmp.indexOf('作文原文') >= 0 && cmp.indexOf('必须修改') >= 0 && cmp.indexOf('复盘重点') >= 0,
            '对比视图：含作文 / 必须修改 / 复盘重点各行');
      checkf(cmp.indexOf('与上一稿相比') >= 0, '对比视图：含「问题是否已解决」一行');
      checkf(cmp.indexOf('data-edit-draft=') >= 0, '对比视图：每稿都有「基于本稿改一版」');
      checkf(cmp.indexOf('data-open-sub=') >= 0, '对比视图：每稿都能跳到完整批改');
      // ---- 题库视图的科目维度检查 ----
      (function(){
        const bankAll = view('bank');
        const catM = bankAll.match(/英语一 <b>(\d+)<\/b>[\s\S]*?英语二 <b>(\d+)<\/b>/);
        const n1 = catM ? Number(catM[1]) : -1, n2 = catM ? Number(catM[2]) : -1;
        checkf(n1 >= 44 && n2 >= 51, '题库视图统计：英语一 ' + n1 + ' 道 / 英语二 ' + n2 + ' 道（应 ≥44 / ≥51）');
        const subjBtns = (bankAll.match(/data-subjfilter="(all|en1|en2)"/g) || []).length;
        checkf(subjBtns === 3, '题库视图有 3 个科目筛选按钮（实际 ' + subjBtns + ' 个）');
        const pill1 = (bankAll.match(/c-en1">英语一/g) || []).length;
        const pill2 = (bankAll.match(/c-en2">英语二/g) || []).length;
        checkf(pill1 > 0 && pill2 > 0, '题目条目带科目标签：英语一 ' + pill1 + ' / 英语二 ' + pill2 + ' 个');
        // 只筛英语二时，不应出现英语一题目
        diag.store.filter.subject = 'en2';
        const onlyEn2 = view('bank');
        const disp2 = onlyEn2.match(/显示 (\d+) 题/);
        const en1InEn2 = (onlyEn2.match(/c-en1">英语一/g) || []).length;
        checkf(disp2 && Number(disp2[1]) === n2, '筛「英语二」显示 ' + (disp2 ? disp2[1] : '?') + ' 题（应等于英语二总数 ' + n2 + '）');
        checkf(en1InEn2 === 0, '筛「英语二」时未混入英语一题目（实际 ' + en1InEn2 + ' 条）');
        diag.store.filter.subject = 'en1';
        const onlyEn1 = view('bank');
        const disp1 = onlyEn1.match(/显示 (\d+) 题/);
        checkf(disp1 && Number(disp1[1]) === n1, '筛「英语一」显示 ' + (disp1 ? disp1[1] : '?') + ' 题（应等于英语一总数 ' + n1 + '）');
        diag.store.filter.subject = 'all';
        // 提交页下拉是否按科目分组
        const sub = view('submit');
        const og = (sub.match(/━━ 英语[一二]（\d+ 题）━━/g) || []);
        checkf(og.length === 2, '提交页下拉按科目分组：' + (og.join(' / ') || '未分组'));
      })();
            diag.renderOpen('bank', 'q_mock_01_major');
      checkf(diag.html.bank.indexOf('总览对比') >= 0, '题库：练习面板里出现「总览对比」入口');
      checkf(diag.html.bank.indexOf('第 2 稿') >= 0, '题库：提交表里标出稿次');
      view('board');
      console.log('  渲染仿真：' + (f ? f + ' 项失败' : '全部通过'));
      resolve(f);
    }
  });
}

if (process.argv.includes('--report')) {
  console.log('[6] 渲染仿真（最小 DOM 跑页面逻辑）');
  renderReport().then(n => {
    console.log('\n' + (n ? '结果：' + n + ' 项失败' : '结果：全部通过'));
    process.exit(n ? 1 : 0);
  });
} else {
  staticChecks();
  console.log('\n' + (fail ? '结果：' + fail + ' 项失败' : '结果：全部通过') +
              '\n（提示：加 --report 参数可额外做渲染仿真检查）');
  process.exit(fail ? 1 : 0);
}
