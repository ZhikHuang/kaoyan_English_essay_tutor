/* 状态文件（题库 + 你的提交记录 + 考试日期）
 *
 * 这个文件是「可编辑」的，其余数据文件不用动：
 *   data/questions.js  ← 题库（考研真题 + 模拟题 + 我的题目），由 tools/gen-questions.js 生成或由 AI 追加
 *   data/figures.js    ← 示意图库（图画 / 表格 / 柱状图 / 饼图），一般不用改
 *   data/patches/      ← AI 写回的批改结果，一次提交一个文件
 *   data/backups/      ← 「一键更新题库」前自动生成的题库备份
 *
 * 个人化设置只有两项，改这里即可（也可以直接对 AI 说一句让它改）：
 *   examDate —— 考试日期（YYYY-MM-DD），用于网页顶栏倒计时；留空则显示「未设置」
 *   owner    —— 显示用称呼，可留空
 */
(function () {
  var META = {
    version: 1,
    updatedAt: '2026-01-01T00:00:00+08:00',
    examDate: '',          // 例如 '2026-12-19'；留空 = 不显示倒计时
    owner: '',             // 例如 '考研英语一考生'
    skill: 'kaoyan-english-tutor'
  };

  /* 初始提交记录：默认空。
     想先看看界面长什么样，可以把 examples/ 里的两条示例补丁和提交
     复制进来（见 README「想先看效果」一节）。 */
  var draft = [];

  window.__KAOYAN_STATE = {
    meta: META,
    questions: [],                    // 留空即可：题库由 data/questions.js 提供，页面会自动合并
    completions: draft
  };
})();
