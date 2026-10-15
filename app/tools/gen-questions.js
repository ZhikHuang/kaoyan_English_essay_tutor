/* 生成 data/questions.js：考研英语一真题（2010—2026 大小作文）+ 原创模拟题
   用法：node tools/gen-questions.js                  # 全量生成
         node tools/gen-questions.js --max-year 2020    # 只生成到某年（测试/裁剪用）
   题目来源见 README 与每题 source 字段；图画为本站自绘示意图，非真题原图。 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const EN2 = require('./en2-data.js');   // 英语二真题数据（2010—2026）
const MAX_YEAR = (() => {
  const i = process.argv.indexOf('--max-year');
  const v = i >= 0 ? parseInt(process.argv[i + 1], 10) : NaN;
  return Number.isFinite(v) ? v : null;
})();
const inRange = q => (MAX_YEAR === null || q.year <= MAX_YEAR);

/* 大作文标准 Directions（考研英语一 Part B 固定格式） */
const MAJOR_EN = "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.";
const MAJOR_EN_CHART = "Write an essay of 160-200 words based on the following chart(s). In your essay, you should\n\n1) describe the chart(s) briefly,\n2) explain the possible reasons for the phenomenon, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.";

/* ============ 真题：大作文（按年份，2010—2026 已逐条核实） ============ */
/* figure 用字符串表达式，运行时从 window.__KAOYAN_FIG 取，避免题目文件塞满 SVG */
const MAJOR = [
{ year:2010, title:'文化火锅：文化融合与包容', tags:['文化','融合','包容'], figure:"F.twoPanel({ lBubble:'火锅里煮着', rBubble:'各国文化元素', lMarks:'儒 / 道 / 京剧 / 功夫', rMarks:'莎士比亚 / 爱因斯坦 / 天鹅湖', title:'文化“火锅”：既美味又营养' })",
  text:'一口火锅里煮着多种食材，每样食材上标着一个文化名称（中国的儒、道、京剧、功夫；西方的莎士比亚、爱因斯坦、天鹅湖等），画上方标题为"文化‘火锅’，既美味又营养"。', zh:'图画是一个"文化火锅"：中式的锅里煮着各国文化元素，画上文字点出"既美味又营养"。要求：①描述图画；②解读寓意；③给出你的评论。', hint:['文化融合与包容是核心，注意"和而不同"的表达','避免只罗列文化符号，要落到"融合带来活力"'] },
{ year:2011, title:'旅程之"余"：文明出游', tags:['文明','环境','公德'], figure:"F.twoPanel({ lBubble:'游客在船上观光', rBubble:'水面漂满垃圾', lMarks:'', rMarks:'瓶子 / 西瓜皮 / 快餐盒', title:'“旅程之‘余’”' })",
  text:'小船上的游客把垃圾随手丢进水里，水面上漂满瓶子、西瓜皮、快餐盒等垃圾；画上方标题为"旅程之‘余’"。', zh:'图画中游客把垃圾丢进水里，水面漂满垃圾，标题为"旅程之‘余’"。要求：①描述图画；②解读寓意（旅游文明与公德）；③给出你的评论。', hint:['"余"既指"剩余"也指"我留下了什么"，是审题关键','可提出"个人自律＋景区监管"两条线'] },
{ year:2012, title:'打翻的瓶子：乐观与悲观', tags:['心态','乐观'], figure:"F.twoPanel({ lBubble:'（一人沮丧）', rBubble:'（一人微笑庆幸）', lMarks:'看到洒掉的部分', rMarks:'看到剩下的部分', title:'（同一只打翻的瓶子，两种反应）' })",
  text:'地上一个被打翻的瓶子，液体大半流出、所剩无几；两个成年人面对它反应相反，一人沮丧、一人微笑庆幸。', zh:'同一只打翻的瓶子，两个人给出截然相反的反应。要求：①描述图画；②解读寓意（心态不同，看到的世界不同）；③给出你的评论。', hint:['对照型图画：写清两人的反应差异，再解释根因','结论可落到"以积极心态面对同一处境"'] },
{ year:2013, title:'毕业生的选择：站在人生的岔路口', tags:['选择','成长','就业'], figure:"F.twoPanel({ lBubble:'（站在岔路口）', rBubble:'（多条道路）', lMarks:'出国 / 创业 / 求职 / 考研', rMarks:'', title:'（毕业生面前的多条道路）' })",
  text:'一群毕业生站在岔路口，面前有多条岔路，分别对应出国、创业、求职、考研等不同选择。', zh:'图画：毕业生站在人生的岔路口，面前是多条道路。要求：①描述图画；②解读寓意（选择增多带来迷茫，需要理性判断并坚持）；③给出你的评论。', hint:['重点是"如何选择"，不是"选哪一条最好"','可写 clear self-knowledge / weigh the options'] },
{ year:2014, title:'相携：你陪我长大，我陪你变老', tags:['家庭','孝道','陪伴'], figure:"F.twoPanel({ lBubble:'（30 年前：母亲牵着女儿）', rBubble:'（30 年后：女儿搀着母亲）', lMarks:'过去', rMarks:'现在', title:'“相携”' })",
  text:'标题为"相携"的漫画分左右两幅：左幅是 30 年前年轻母亲牵着年幼女儿的手，右幅是 30 年后长大成人的女儿搀扶着年迈的母亲。', zh:'图画题为"相携"，两幅图跨越 30 年：母亲牵过女儿，女儿搀起母亲。要求：①描述图画；②解读寓意（亲情相互、代代相承，应关爱赡养年迈父母）；③给出你的评论。', hint:['时间对照是结构特点，可写 the roles are reversed','避免通篇煽情，给出具体做法更得分'] },
{ year:2015, title:'手机时代的聚会', tags:['科技','人际','家庭'], figure:"F.phones({ cap:'“手机时代的聚会”（围坐一桌，却各自盯着屏幕）' })",
  text:'一群年轻人围坐聚会却互不交谈，各自低头专注玩手机；图下方一行汉字"手机时代的聚会"。', zh:'图画中一群年轻人围坐聚会，却各玩各的手机，题为"手机时代的聚会"。要求：①描述图画；②解读寓意（过度依赖手机、忽视面对面交流）；③给出你的评论或建议。', hint:['可对照 2020 年"习惯"题，思路相通','建议部分给出具体做法（如设"无手机时间"）比空喊口号得分更高'] },
{ year:2016, title:'与其只提要求，不如做个榜样', tags:['家庭','教育','身教'], figure:"F.twoPanel({ lBubble:'你给我好好学习！', rBubble:'（父子各坐一桌读书）', lMarks:'父亲自己在看电视', rMarks:'父亲陪孩子一起读', title:'（两幅图对比：提要求 vs 做榜样）' })",
  text:'两幅对比图：左图中父亲自己在看电视，却对孩子喊"你给我好好学习"；右图中父子各坐一桌，安静地一起读书。', zh:'两幅对比图：左图父亲只顾自己看电视却要求孩子学习；右图父子一起读书。要求：①描述图画；②解读寓意（与其只提要求，不如做个榜样）；③给出你的评论。', hint:['两图对比要写清"差别在哪里"，这是得分点','寓意句可直接用 Actions speak louder than words'] },
{ year:2017, title:'有书与读书：藏书≠读书', tags:['读书','行动'], figure:"F.twoPanel({ lBubble:'我有这么多书', rBubble:'我争取今年读完20本书', lMarks:'（仰头靠在书堆旁）', rMarks:'（坐在桌前真读）', title:'（两幅图：藏书与读书）' })",
  text:'两幅对比图：左图一人仰头靠在塞满书的书架前说"我有这么多书"；右图一人坐在桌前读书说"我争取今年读完20本书"。', zh:'两幅对比图：左图炫耀藏书却未读，右图列出计划并真读。要求：①描述图画；②解读寓意（拥有不等于收获，贵在行动）；③给出你的评论。', hint:['分清"拥有"与"使用"：owning vs reading','可落到"把意愿变成计划与行动"'] },
{ year:2018, title:'选课：真本事 vs 好拿分', tags:['教育','选择','功利'], figure:"F.twoPanel({ lBubble:'知识新、重创新、有难度', rBubble:'给分高、易通过、作业少', lMarks:'（选课系统左侧）', rMarks:'（选课系统右侧）', title:'（屏幕上的两个选项）' })",
  text:'一名学生坐在电脑前面对"选课系统"，屏幕两侧的选项分别是"知识新、重创新、有难度"与"给分高、易通过、作业少"，他指着屏幕迟疑。', zh:'图画：学生在选课系统前犹豫，一边"有难度但重创新"，一边"给分高、作业少"。要求：①描述图画；②解读寓意（求学应重真知而非只图轻松高分）；③给出你的评论。', hint:['本题考价值判断，观点要明确、论证要克制','可用 short-term gain vs long-term growth 的对比'] },
{ year:2019, title:'途中：坚持还是放弃', tags:['坚持','毅力','互助'], figure:"F.twoPanel({ lBubble:'别呀，休息一下再接着爬', rBubble:'累了，我不爬了', lMarks:'（背包拄杖）', rMarks:'（瘫坐石上）', title:'“途中”' })",
  text:'山间小路上两名登山者：一人背包拄杖，回头劝同伴"别呀，休息一下再接着爬"；另一人瘫坐在石头上说"累了，我不爬了"。画面题为"途中"。', zh:'图画题为"途中"：一名登山者鼓励同伴继续，另一名已坐下放弃。要求：①描述图画；②解读寓意（面对疲惫困难不轻言放弃，休整与互勉后继续前行）；③给出你的评论。', hint:['别写成"必须硬撑"，允许多样化观点（休整、方法、互相鼓励）','"同伴的鼓励"是本题容易被忽略的细节'] },
{ year:2020, title:'习惯：尽早完成 vs 拖到最后', tags:['习惯','时间管理'], figure:"F.twoPanel({ lBubble:'尽早完成才放心', rBubble:'不到最后不动手', lMarks:'（桌上堆满文件）', rMarks:'（桌上只有一书一笔）', title:'“习惯”' })",
  text:'两幅对比图，题为"习惯"：左图一人伏案、桌上堆满文件，对话框写"尽早完成才放心"；右图一人靠在椅背上放松，桌上只有一本书一支笔，对话框写"不到最后不动手"。', zh:'两幅对比图，题为"习惯"：左图提前完成、从容安心；右图拖到最后、被动应付。要求：①描述图画；②解读寓意（早做带来的从容与拖延带来的焦虑）；③给出你的评论。', hint:['对照型：用 while / in contrast 把两种状态并排写出','建议段可给一个可操作的习惯方法'] },
{ year:2021, title:'遵从内心的热爱', tags:['热爱','选择','传统戏曲'], figure:"F.facing({ bubbleL:'很多同学觉得学唱戏不好玩', bubbleR:'你自己不是喜欢吗？那就够了', cap:'（孩子装扮成美猴王，父亲在一旁鼓励）' })",
  text:'一个装扮成美猴王（孙悟空）、手拿小棒子的男孩对父亲说"很多同学觉得学唱戏不好玩"，父亲回答"你自己不是喜欢吗？那就足够了"。', zh:'图画：孩子因同学觉得"学唱戏不好玩"而犹豫，父亲告诉他"你自己喜欢就够了"。要求：①描述图画；②解读寓意（遵从内心的热爱，不因他人眼光放弃）；③给出你的评论。', hint:['这题兼有"传统文化（戏曲）"与"遵从热爱"两层，可都点到','"就够了"是父亲的落点，也是寓意的落点'] },
{ year:2022, title:'跨专业学习、开阔视野', tags:['教育','开放','跨界'], figure:"F.twoPanel({ lBubble:'不是我们专业的，听了也没用', rBubble:'去听听肯定有好处', lMarks:'（站在“校园讲座”公告栏前）', rMarks:'', title:'（两名学生在讲座公告栏前）' })",
  text:'两名穿校服的女生站在贴有"校园讲座"通知的公告栏前：短发女生说"不是我们专业的，听了也没用"，长发女生说"去听听肯定有好处"。', zh:'图画：两名学生在讲座公告栏前产生分歧——"不是本专业的没用"vs"听了肯定有好处"。要求：①描述图画；②解读寓意（知识不应被专业边界锁死，应保持开放好奇）；③给出你的评论。', hint:['题干未给讲座的具体名称，不要编造细节','可写 interdisciplinary / broaden one’s horizons 一类表达'] },
{ year:2023, title:'龙舟赛：传统民俗的复兴', tags:['传统','民俗','文化自信'], figure:"F.crowd({ sign:'龙舟赛', cap:'（河上两舟竞渡，两岸人群挥旗呐喊，一对老夫妇含笑观看）' })",
  text:'河上两艘龙舟激烈竞渡，两岸及拱桥上人群挥旗呐喊；画面右下角一对老夫妇含笑观看，老爷爷感叹"真好啊！咱们村的龙舟赛越来越热闹了"。', zh:'图画：龙舟竞渡，两岸人山人海，一位老爷爷感叹"咱们村的龙舟赛越来越热闹了"。要求：①描述图画；②解读寓意（传统民俗在乡村复兴、文化自信提升）；③给出你的评论。', hint:['"越来越热闹"是变化的信号，落笔要写出"复兴"','可联系乡村振兴与文化认同'] },
{ year:2024, title:'公园建设与民生（图画＋柱状图）', tags:['公共空间','民生','数据'], chart:'图画＋柱状图',
  figure:"F.barChart({ title:'某市近三年公园数量', sub:'（单位：座，示意）', yUnit:'', yMax:700, note:'数据示意：2020 年 406 座 → 2021 年 532 座 → 2022 年 670 座', groups:[{label:'2020', values:[{v:406,label:'406'}]},{label:'2021', values:[{v:532,label:'532'}]},{label:'2022', values:[{v:670,label:'670'}]}] })",
  text:'左图：市民在新建公园里活动（孩子跑步、情侣聊天，有人感叹"家门口新建的小公园真不错"）；右图：某市近三年公园数量柱状图，由 406 座增至 670 座。', zh:'本题为"图画＋柱状图"：左图画市民在新建公园休闲，右图为某市近三年公园数量（406→532→670 座）。要求：①描述图表；②分析原因；③给出你的评论。', hint:['要同时写画面内容和数据变化，别只写一边','数据只挑关键趋势（逐年上升、三年增约六成）即可'] },
{ year:2025, title:'耐用消费品拥有量（表格）', tags:['生活水平','消费','数据'], chart:'表格',
  figure:"F.table({ title:'近年来全国居民平均每百户年末主要耐用消费品拥有量', sub:'（2014 年 → 2023 年）', years:['2014 年','2023 年'], rows:[{name:'空调', values:['75.2 台','145.9 台']},{name:'洗衣机', values:['83.7 台','98.2 台']},{name:'电冰箱', values:['85.5 台','103.4 台']}], note:'数据示意，具体数值以原卷为准（2017 年电冰箱数值各来源有 93.3 / 95.3 之争）' })",
  text:'表格题为"近年来全国居民平均每百户年末主要耐用消费品拥有量"：空调由 75.2 台增至 145.9 台（近乎翻倍），洗衣机由 83.7 增至 98.2 台，电冰箱由 85.5 增至 103.4 台（2014—2023 年）。', zh:'本题为表格作文：全国居民每百户耐用消费品拥有量（空调近乎翻倍，洗衣机、电冰箱小幅上升）。要求：①描述表格；②分析原因（收入增长、生活品质追求）；③给出你的评论。', hint:['注意区分"近乎翻倍"与"小幅上升"，趋势描述要分级','原因可写收入增长、消费升级、产业供给'] },
{ year:2026, title:'养老机器人的接受度与顾虑（双图表）', tags:['科技','养老','数据'], chart:'双图表',
  figure:"F.pieChart({ title:'消费者对养老机器人的接受度', sub:'（调查数据，示意）', slices:[{label:'完全接受', v:39.3},{label:'部分接受', v:32.8},{label:'不接受', v:27.9}], note:'（另有柱状图：首要关注点——安全 46.3%、价格 24.9%、便利 10.7%）' })",
  text:'双图表：饼图显示消费者对养老机器人的接受度（完全接受 39.3%、部分接受 32.8%、不接受 27.9%）；柱状图显示首要关注点（安全 46.3%、价格 24.9%、便利 10.7%）。', zh:'本题为双图表（2026 年英语一大作文）：一图是养老机器人的消费者接受度，另一图是首要关注点（安全占比最高）。要求：①描述图表；②分析原因；③给出你的评论。', hint:['两图要建立联系：接受度不低，但"安全"是最大门槛','"逾七成不同程度接受"是概括数据的关键句'] }
];

/* ============ 真题：小作文（按年份，2010—2026 已逐条核实） ============ */
const MINOR = [
{ year:2010, title:'研究生会招募国际会议志愿者（通知）', type:'notice', zh:'你是研究生会（Postgraduates\' Association）成员。请以研究生会名义写一则通知，招募"全球化国际会议"的志愿者：①说明招募目的与会议信息；②说明申请者应具备的基本条件；③补充其他相关信息（报名方式与截止时间、联系方式等）。约 100 词，落款只能用 Postgraduates\' Association，不署真名。', hint:['这是通知不是书信：不要写 Dear... 之类的称呼','落款写 Postgraduates\' Association，不要写 Li Ming'] },
{ year:2011, title:'向朋友推荐一部电影（书信）', type:'letter', zh:'请给你的一位朋友写一封约 100 词的信，推荐一部你最喜欢的电影：①点明推荐的影片；②说明推荐理由。署名 Li Ming。', hint:['语体偏非正式（写给朋友），不必过度书面','理由要具体（主题、表演、影响你什么）'] },
{ year:2012, title:'学生会致国际学生的欢迎与建议信（邮件）', type:'letter', zh:'请以学生会（Students\' Union）名义给即将来校的国际学生写一封约 100 词的邮件：①表示欢迎；②就他们在本校的校园生活提出建议。署名 Li Ming。', hint:['先欢迎、再建议，语气友好','建议写成 2—3 条可操作的小贴士'] },
{ year:2013, title:'邀请外教担任英语演讲比赛评委（邮件）', type:'invitation', zh:'请给本院系的一位外籍教师写一封约 100 词的邮件，邀请他/她担任即将举行的英语演讲比赛的评委：①说明写信目的；②交代必要细节（时间、地点、参赛者与其他评委情况等，可自定）；③期待回复。署名 Li Ming。', hint:['邀请信三要素：目的、细节、期待回复','评委身份要写清"希望他/她做什么"'] },
{ year:2014, title:'致校长的建议信：改善学生身体状况', type:'letter', zh:'请给校长（the president of your university）写一封约 100 词的信，就如何改善学生身体状况提出建议：①说明现状或问题；②提出具体建议（可多条）；③说明这样做的意义。署名 Li Ming。', hint:['建议信结构：问题 → 建议 → 意义','对校长写信要注意称呼与语气（Dear President,）'] },
{ year:2015, title:'读书会推荐一本书（邮件）', type:'letter', zh:'你是读书会（reading club）活动的主持人。请给俱乐部成员写一封约 100 词的邮件：①说明即将举办读书会、写信目的是推荐一本书；②给出书名；③说明推荐理由。署名 Li Ming。', hint:['推荐书要"点名 + 给理由"，理由别只写 interesting','可提一句希望成员提前读了再来讨论'] },
{ year:2016, title:'图书馆致新留学生的通知', type:'notice', zh:'你是校图书馆管理员，请写一则约 100 词的通知，面向新入学的留学生：①表示欢迎；②介绍图书馆的开放时间、借阅规则与资源服务；③留下联系方式。落款 Li Ming。', hint:['通知格式：Notice 居中，正文分段，落款人/单位','信息类通知要点齐全即可，不必追求华丽'] },
{ year:2017, title:'向新到任外教推荐本市景点（邮件）', type:'letter', zh:'新到任的澳大利亚教授 James Cook 想了解这座城市。请写一封约 100 词的邮件：①推荐本市的景点或去处；②说明推荐理由；③表示愿意提供进一步帮助。署名 Li Ming。', hint:['推荐 1—2 处即可，理由要具体（历史/文化/交通便利）','I would be happy to show you around. 是稳妥的收尾'] },
{ year:2018, title:'邀请外籍专家出席毕业典礼（邮件）', type:'invitation', zh:'请代表学校给全校外籍专家写一封约 100 词的邀请邮件，邀请他们出席毕业典礼：①说明典礼时间；②说明地点与相关安排（流程、着装等）；③期待回复。署名 Li Ming。', hint:['注意"代表学校"的身份与语气','时间、地点、流程任选两三点写清'] },
{ year:2019, title:'回复国际学生的志愿者咨询（邮件）', type:'reply', zh:'你是"援助农村小学"项目的成员。一位国际学生来信咨询该项目的志愿者招募。请回信约 100 词：①介绍项目内容与活动（如送书、支教）；②说明对志愿者的要求；③留下联系方式，欢迎继续咨询。署名 Li Ming。', hint:['回信先感谢来信，再逐条回答','项目细节可自拟，但要具体可信'] },
{ year:2020, title:'歌唱比赛通知', type:'notice', zh:'你受校学生会委派，请写一则约 100 词的通知，告知国际学生即将举行的歌唱比赛：①说明比赛的基本信息；②说明时间、地点、赛制与报名方式；③欢迎参加。落款 Li Ming。', hint:['通知格式：Notice 居中 + 落款','报名方式要写清楚（邮箱/线上表单）'] },
{ year:2021, title:'给外国友人的求职建议（邮件）', type:'letter', zh:'你的外国朋友刚大学毕业，打算在中国找工作。请写一封约 100 词的邮件：①祝贺毕业并表示欢迎；②给出具体求职建议（如了解行业需求、准备中文简历、使用招聘平台）；③表达祝愿并愿意继续帮忙。署名 Li Ming。', hint:['建议要给"可执行动作"，不要只说 good luck','结尾 I am always here if you need help. 自然收束'] },
{ year:2022, title:'邀请外教组队参加创新大赛（邮件）', type:'invitation', zh:'你校将举办国际创新大赛。请给一位英国大学的教授写一封约 100 词的邮件，邀请他/她组队参加：①说明赛事的时间、地点与性质；②说明邀请他/她组队的原因与意义；③期待回复并表示愿意提供协助。署名 Li Ming。', hint:['题干没有给出赛事的正式名称，不要编造','组队参加要写清"他/她能带来什么"'] },
{ year:2023, title:'为教授研究项目招募学生（通知）', type:'notice', zh:'Smith 教授正在开展"校园体育活动"研究项目，需要招募一名学生助手。请以 Li Ming 名义写一则约 100 词的通知：①说明项目与招募目的；②说明岗位职责；③说明任职要求与报名方式、截止时间。', hint:['招募通知要写清 duties / requirements / how to apply','截止时间是常被漏掉的要点'] },
{ year:2024, title:'回复留学生关于古代科学家报告的建议（邮件）', type:'reply', zh:'留学生 Paul 来信请你为他的课堂口头报告（主题：中国古代科学家）提建议。请回信约 100 词：①表示乐意帮忙；②给出具体建议（如确定人选、查权威资料、梳理生平与贡献、列提纲）；③提醒练习演讲、控制时间并给予鼓励。署名 Li Ming。', hint:['回信要有回应性：先回应请求，再给建议','建议 2—3 条即可，每条一句'] },
{ year:2025, title:'回复同学关于手工艺展示的提问（邮件）', type:'reply', zh:'你邀请了年轻匠人进校园做"创新手工艺展示"，同学 Paul 来信问了两个问题。请回信约 100 词：①说明他们会展示什么（如把剪纸做成现代贺卡、陶艺结合数码纹样）；②说明你能提供什么帮助（如设计海报、当天接待）；③感谢他的热情并表达期待。署名 Li Ming。', hint:['这题是"回答两个具体问题"，务必逐条回应','回答要具体，避免空泛表态'] },
{ year:2026, title:'回复朋友关于中国家庭手写信的询问（邮件）', type:'reply', zh:'你昨天发布了一批中国家庭的老手写信，朋友 Paul 来信表示很感兴趣，问了两个问题。请回信约 100 词：①多介绍这些信（来历、内容、为何珍贵）；②回答"现在是否在某处公开展出"，并说明地点与时间；③回应他想亲眼看看的想法，可提议陪同前往。署名 Li Ming。', hint:['两个问题必须都答到，这是本题得分焦点','展出地点与时间自拟即可，写具体一点'] }
];

function minorEn(type) {
  const base = {
    notice: "Write a notice of about 100 words",
    letter: "Write a letter of about 100 words",
    invitation: "Write an email of about 100 words",
    reply: "Write a reply email of about 100 words"
  }[type] || "Write a letter of about 100 words";
  return "Suppose you are a student of a Chinese university. " + base +
    " based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.";
}

let out = [];
out.push("/* 题库：考研英语一");
out.push("   一、category:\"real\" 考研真题 —— 2010—2026 年大作文（Part B，20 分）与小作文（Part A，10 分）");
out.push("       · 题干为规范英文 Directions；图画/表格为本站自绘示意图（figures.js），非真题原图；不提供参考范文");
out.push("       · 2010—2023 大作文为图画作文；2024 为图画＋柱状图；2025 为表格；2026 为双图表（近年题型在变，注意 describe chart）");
out.push("   二、category:\"mock\" 模拟题 —— AI 原创，风格对齐近年真题，配内嵌 SVG 示意图");
out.push("   三、category:\"mine\" 我的题目 —— 由用户在网页「上传自己的题目」提交后归档（不在本文件）");
out.push("   本文件由 tools/gen-questions.js 生成，勿手改结构；要增删题目请改生成脚本或直接追加对象。 */");
out.push("(function () {");
out.push("  var BANK = [];");
out.push("  var F = window.__KAOYAN_FIG || {};   // 公用示意图库（data/figures.js）");
out.push("");

out.push("  /* ===================== 一、考研真题 ===================== */");
MAJOR.filter(inRange).forEach(q => {
  out.push("  BANK.push({");
  out.push("    id: 'q_real_" + q.year + "_major', category: 'real', subject: 'en1', kind: 'major',");
  out.push("    source: '" + q.year + " 年考研英语一 大作文（Part B，20 分" + (q.chart ? '，' + q.chart : '，图画作文') + "）', year: '" + q.year + " 真题',");
  out.push("    title: '" + q.year + " 真题：" + q.title + "',");
  out.push("    difficulty: " + (q.chart ? 4 : 3) + ", words: '160-200', tags: " + JSON.stringify(q.tags) + ",");
  out.push("    figure: " + q.figure + ",");
  out.push("    promptTextZh: '图画/图表内容：" + q.text.replace(/'/g, "\\'") + "',");
  out.push("    promptZh: '" + q.zh.replace(/'/g, "\\'") + "',");
  out.push("    promptEn: " + JSON.stringify(q.chart ? MAJOR_EN_CHART : MAJOR_EN) + ",");
  out.push("    hints: " + JSON.stringify(q.hint) + "");
  out.push("  });");
  out.push("");
});
MINOR.filter(inRange).forEach(q => {
  out.push("  BANK.push({");
  out.push("    id: 'q_real_" + q.year + "_minor', category: 'real', subject: 'en1', kind: 'minor',");
  out.push("    source: '" + q.year + " 年考研英语一 小作文（Part A，10 分）', year: '" + q.year + " 真题',");
  out.push("    title: '" + q.year + " 真题：" + q.title + "',");
  out.push("    difficulty: 3, words: '100', tags: ['应用文', " + JSON.stringify(q.type) + "],");
  out.push("    promptZh: '" + q.zh.replace(/'/g, "\\'") + "',");
  out.push("    promptEn: " + JSON.stringify(minorEn(q.type)) + ",");
  out.push("    hints: " + JSON.stringify(q.hint));
  out.push("  });");
  out.push("");
});

/* ============ 英语二真题：图表大作文（15 分）+ 小作文（10 分）+ 整段翻译（15 分） ============ */
EN2.EN2_MAJOR.filter(inRange).forEach(q => {
  out.push("  BANK.push({");
  out.push("    id: 'q_en2_" + q.year + "_major', category: 'real', subject: 'en2', kind: 'major',");
  out.push("    source: '" + q.year + " 年考研英语二 大作文（图表作文，15 分）', year: '" + q.year + " 真题',");
  out.push("    title: '" + q.year + " 真题（英语二）：" + q.title + "',");
  out.push("    difficulty: 3, words: '150', tags: " + JSON.stringify(q.tags) + ",");
  out.push("    figure: " + q.figure + ",");
  out.push("    promptTextZh: '图表内容：" + q.text.replace(/'/g, "\\'") + "',");
  out.push("    promptZh: '" + q.zh.replace(/'/g, "\\'") + "',");
  out.push("    promptEn: " + JSON.stringify(q.year <= 2011 ? EN2.EN2_MAJOR_EN : EN2.EN2_MAJOR_EN2) + ",");
  out.push("    hints: " + JSON.stringify(q.hint));
  out.push("  });");
  out.push("");
});
EN2.EN2_MINOR.filter(inRange).forEach(q => {
  out.push("  BANK.push({");
  out.push("    id: 'q_en2_" + q.year + "_minor', category: 'real', subject: 'en2', kind: 'minor',");
  out.push("    source: '" + q.year + " 年考研英语二 小作文（Part A，10 分）', year: '" + q.year + " 真题',");
  out.push("    title: '" + q.year + " 真题（英语二）：" + q.title + "',");
  out.push("    difficulty: 3, words: '100', tags: ['应用文', " + JSON.stringify(q.type) + "],");
  out.push("    promptZh: '" + q.zh.replace(/'/g, "\\'") + "',");
  out.push("    promptEn: " + JSON.stringify(EN2.minorEn2()) + ",");
  out.push("    hints: " + JSON.stringify(q.hint));
  out.push("  });");
  out.push("");
});
EN2.EN2_TRANS.filter(inRange).forEach(q => {
  out.push("  BANK.push({");
  out.push("    id: 'q_en2_" + q.year + "_translation', category: 'real', subject: 'en2', kind: 'translation',");
  out.push("    source: '" + q.year + " 年考研英语二 翻译（整段英译汉，15 分）', year: '" + q.year + " 真题',");
  out.push("    title: '" + q.year + " 真题（英语二）翻译：" + q.title + "',");
  out.push("    difficulty: 3, words: '整段，15 分', tags: " + JSON.stringify(q.tags) + ",");
  out.push("    promptTextZh: '选段话题：" + q.topic.replace(/'/g, "\\'") + "',");
  out.push("    promptZh: '英语二翻译（整段英译汉，15 分）：" + q.topic.replace(/'/g, "\\'") + "',");
  out.push("    promptEn: " + JSON.stringify(EN2.EN2_TRANS_EN) + ",");
  out.push("    hints: " + JSON.stringify(q.hint));
  out.push("  });");
  out.push("");
});
/* ============ 模拟题：从现有文件搬运（保持 id 不变，追加新题也放这里） ============ */
const existing = fs.readFileSync(path.join(ROOT, 'data', 'questions.js'), 'utf8');
const mockBlock = existing.match(/\/\* ===================== 二、模拟题（原创） ===================== \*\/([\s\S]*?)\/\* ============ 外刊长难句翻译专项/);
const drillBlock = existing.match(/\/\* ============ 外刊长难句翻译专项[\s\S]*?\n  BANK\.push\(\{[\s\S]*?\n  \}\);\n/);
out.push("  /* ===================== 二、模拟题（原创） ===================== */");
if (mockBlock) out.push(mockBlock[1].replace(/\n{3,}/g, '\n\n').trimEnd());
out.push("");
out.push("  /* ============ 外刊长难句翻译专项（辅助训练，不打考研总分，归在模拟题类别） ============ */");
if (drillBlock) out.push(drillBlock[0].split('\n').slice(1).join('\n').trimEnd());
out.push("");
out.push("  window.__KAOYAN_QUESTIONS = BANK;");
out.push("})();");
out.push("");

fs.writeFileSync(path.join(ROOT, 'data', 'questions.js'), out.join('\n'), 'utf8');
const n1 = MAJOR.filter(inRange).length + MINOR.filter(inRange).length;
const n2 = EN2.EN2_MAJOR.filter(inRange).length + EN2.EN2_MINOR.filter(inRange).length + EN2.EN2_TRANS.filter(inRange).length;
console.log('已生成 data/questions.js：英语一真题 ' + n1 + ' 道（大作文 ' + MAJOR.filter(inRange).length + ' + 小作文 ' + MINOR.filter(inRange).length + '）；'
  + '英语二真题 ' + n2 + ' 道（大作文 ' + EN2.EN2_MAJOR.filter(inRange).length + ' + 小作文 ' + EN2.EN2_MINOR.filter(inRange).length + ' + 翻译 ' + EN2.EN2_TRANS.filter(inRange).length + '）'
  + (MAX_YEAR ? '，仅到 ' + MAX_YEAR + ' 年' : '') + ' + 模拟题与专项（沿用原文件）');
