/* 题库：考研英语一
   一、category:"real" 考研真题 —— 2010—2026 年大作文（Part B，20 分）与小作文（Part A，10 分）
       · 题干为规范英文 Directions；图画/表格为本站自绘示意图（figures.js），非真题原图；不提供参考范文
       · 2010—2023 大作文为图画作文；2024 为图画＋柱状图；2025 为表格；2026 为双图表（近年题型在变，注意 describe chart）
   二、category:"mock" 模拟题 —— AI 原创，风格对齐近年真题，配内嵌 SVG 示意图
   三、category:"mine" 我的题目 —— 由用户在网页「上传自己的题目」提交后归档（不在本文件）
   本文件由 tools/gen-questions.js 生成，勿手改结构；要增删题目请改生成脚本或直接追加对象。 */
(function () {
  var BANK = [];
  var F = window.__KAOYAN_FIG || {};   // 公用示意图库（data/figures.js）

  /* ===================== 一、考研真题 ===================== */
  BANK.push({
    id: 'q_real_2010_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2010 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2010 真题',
    title: '2010 真题：文化火锅：文化融合与包容',
    difficulty: 3, words: '160-200', tags: ["文化","融合","包容"],
    figure: F.twoPanel({ lBubble:'火锅里煮着', rBubble:'各国文化元素', lMarks:'儒 / 道 / 京剧 / 功夫', rMarks:'莎士比亚 / 爱因斯坦 / 天鹅湖', title:'文化“火锅”：既美味又营养' }),
    promptTextZh: '图画/图表内容：一口火锅里煮着多种食材，每样食材上标着一个文化名称（中国的儒、道、京剧、功夫；西方的莎士比亚、爱因斯坦、天鹅湖等），画上方标题为"文化‘火锅’，既美味又营养"。',
    promptZh: '图画是一个"文化火锅"：中式的锅里煮着各国文化元素，画上文字点出"既美味又营养"。要求：①描述图画；②解读寓意；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["文化融合与包容是核心，注意\"和而不同\"的表达","避免只罗列文化符号，要落到\"融合带来活力\""]
  });

  BANK.push({
    id: 'q_real_2011_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2011 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2011 真题',
    title: '2011 真题：旅程之"余"：文明出游',
    difficulty: 3, words: '160-200', tags: ["文明","环境","公德"],
    figure: F.twoPanel({ lBubble:'游客在船上观光', rBubble:'水面漂满垃圾', lMarks:'', rMarks:'瓶子 / 西瓜皮 / 快餐盒', title:'“旅程之‘余’”' }),
    promptTextZh: '图画/图表内容：小船上的游客把垃圾随手丢进水里，水面上漂满瓶子、西瓜皮、快餐盒等垃圾；画上方标题为"旅程之‘余’"。',
    promptZh: '图画中游客把垃圾丢进水里，水面漂满垃圾，标题为"旅程之‘余’"。要求：①描述图画；②解读寓意（旅游文明与公德）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["\"余\"既指\"剩余\"也指\"我留下了什么\"，是审题关键","可提出\"个人自律＋景区监管\"两条线"]
  });

  BANK.push({
    id: 'q_real_2012_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2012 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2012 真题',
    title: '2012 真题：打翻的瓶子：乐观与悲观',
    difficulty: 3, words: '160-200', tags: ["心态","乐观"],
    figure: F.twoPanel({ lBubble:'（一人沮丧）', rBubble:'（一人微笑庆幸）', lMarks:'看到洒掉的部分', rMarks:'看到剩下的部分', title:'（同一只打翻的瓶子，两种反应）' }),
    promptTextZh: '图画/图表内容：地上一个被打翻的瓶子，液体大半流出、所剩无几；两个成年人面对它反应相反，一人沮丧、一人微笑庆幸。',
    promptZh: '同一只打翻的瓶子，两个人给出截然相反的反应。要求：①描述图画；②解读寓意（心态不同，看到的世界不同）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["对照型图画：写清两人的反应差异，再解释根因","结论可落到\"以积极心态面对同一处境\""]
  });

  BANK.push({
    id: 'q_real_2013_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2013 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2013 真题',
    title: '2013 真题：毕业生的选择：站在人生的岔路口',
    difficulty: 3, words: '160-200', tags: ["选择","成长","就业"],
    figure: F.twoPanel({ lBubble:'（站在岔路口）', rBubble:'（多条道路）', lMarks:'出国 / 创业 / 求职 / 考研', rMarks:'', title:'（毕业生面前的多条道路）' }),
    promptTextZh: '图画/图表内容：一群毕业生站在岔路口，面前有多条岔路，分别对应出国、创业、求职、考研等不同选择。',
    promptZh: '图画：毕业生站在人生的岔路口，面前是多条道路。要求：①描述图画；②解读寓意（选择增多带来迷茫，需要理性判断并坚持）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["重点是\"如何选择\"，不是\"选哪一条最好\"","可写 clear self-knowledge / weigh the options"]
  });

  BANK.push({
    id: 'q_real_2014_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2014 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2014 真题',
    title: '2014 真题：相携：你陪我长大，我陪你变老',
    difficulty: 3, words: '160-200', tags: ["家庭","孝道","陪伴"],
    figure: F.twoPanel({ lBubble:'（30 年前：母亲牵着女儿）', rBubble:'（30 年后：女儿搀着母亲）', lMarks:'过去', rMarks:'现在', title:'“相携”' }),
    promptTextZh: '图画/图表内容：标题为"相携"的漫画分左右两幅：左幅是 30 年前年轻母亲牵着年幼女儿的手，右幅是 30 年后长大成人的女儿搀扶着年迈的母亲。',
    promptZh: '图画题为"相携"，两幅图跨越 30 年：母亲牵过女儿，女儿搀起母亲。要求：①描述图画；②解读寓意（亲情相互、代代相承，应关爱赡养年迈父母）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["时间对照是结构特点，可写 the roles are reversed","避免通篇煽情，给出具体做法更得分"]
  });

  BANK.push({
    id: 'q_real_2015_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2015 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2015 真题',
    title: '2015 真题：手机时代的聚会',
    difficulty: 3, words: '160-200', tags: ["科技","人际","家庭"],
    figure: F.phones({ cap:'“手机时代的聚会”（围坐一桌，却各自盯着屏幕）' }),
    promptTextZh: '图画/图表内容：一群年轻人围坐聚会却互不交谈，各自低头专注玩手机；图下方一行汉字"手机时代的聚会"。',
    promptZh: '图画中一群年轻人围坐聚会，却各玩各的手机，题为"手机时代的聚会"。要求：①描述图画；②解读寓意（过度依赖手机、忽视面对面交流）；③给出你的评论或建议。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["可对照 2020 年\"习惯\"题，思路相通","建议部分给出具体做法（如设\"无手机时间\"）比空喊口号得分更高"]
  });

  BANK.push({
    id: 'q_real_2016_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2016 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2016 真题',
    title: '2016 真题：与其只提要求，不如做个榜样',
    difficulty: 3, words: '160-200', tags: ["家庭","教育","身教"],
    figure: F.twoPanel({ lBubble:'你给我好好学习！', rBubble:'（父子各坐一桌读书）', lMarks:'父亲自己在看电视', rMarks:'父亲陪孩子一起读', title:'（两幅图对比：提要求 vs 做榜样）' }),
    promptTextZh: '图画/图表内容：两幅对比图：左图中父亲自己在看电视，却对孩子喊"你给我好好学习"；右图中父子各坐一桌，安静地一起读书。',
    promptZh: '两幅对比图：左图父亲只顾自己看电视却要求孩子学习；右图父子一起读书。要求：①描述图画；②解读寓意（与其只提要求，不如做个榜样）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["两图对比要写清\"差别在哪里\"，这是得分点","寓意句可直接用 Actions speak louder than words"]
  });

  BANK.push({
    id: 'q_real_2017_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2017 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2017 真题',
    title: '2017 真题：有书与读书：藏书≠读书',
    difficulty: 3, words: '160-200', tags: ["读书","行动"],
    figure: F.twoPanel({ lBubble:'我有这么多书', rBubble:'我争取今年读完20本书', lMarks:'（仰头靠在书堆旁）', rMarks:'（坐在桌前真读）', title:'（两幅图：藏书与读书）' }),
    promptTextZh: '图画/图表内容：两幅对比图：左图一人仰头靠在塞满书的书架前说"我有这么多书"；右图一人坐在桌前读书说"我争取今年读完20本书"。',
    promptZh: '两幅对比图：左图炫耀藏书却未读，右图列出计划并真读。要求：①描述图画；②解读寓意（拥有不等于收获，贵在行动）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["分清\"拥有\"与\"使用\"：owning vs reading","可落到\"把意愿变成计划与行动\""]
  });

  BANK.push({
    id: 'q_real_2018_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2018 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2018 真题',
    title: '2018 真题：选课：真本事 vs 好拿分',
    difficulty: 3, words: '160-200', tags: ["教育","选择","功利"],
    figure: F.twoPanel({ lBubble:'知识新、重创新、有难度', rBubble:'给分高、易通过、作业少', lMarks:'（选课系统左侧）', rMarks:'（选课系统右侧）', title:'（屏幕上的两个选项）' }),
    promptTextZh: '图画/图表内容：一名学生坐在电脑前面对"选课系统"，屏幕两侧的选项分别是"知识新、重创新、有难度"与"给分高、易通过、作业少"，他指着屏幕迟疑。',
    promptZh: '图画：学生在选课系统前犹豫，一边"有难度但重创新"，一边"给分高、作业少"。要求：①描述图画；②解读寓意（求学应重真知而非只图轻松高分）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["本题考价值判断，观点要明确、论证要克制","可用 short-term gain vs long-term growth 的对比"]
  });

  BANK.push({
    id: 'q_real_2019_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2019 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2019 真题',
    title: '2019 真题：途中：坚持还是放弃',
    difficulty: 3, words: '160-200', tags: ["坚持","毅力","互助"],
    figure: F.twoPanel({ lBubble:'别呀，休息一下再接着爬', rBubble:'累了，我不爬了', lMarks:'（背包拄杖）', rMarks:'（瘫坐石上）', title:'“途中”' }),
    promptTextZh: '图画/图表内容：山间小路上两名登山者：一人背包拄杖，回头劝同伴"别呀，休息一下再接着爬"；另一人瘫坐在石头上说"累了，我不爬了"。画面题为"途中"。',
    promptZh: '图画题为"途中"：一名登山者鼓励同伴继续，另一名已坐下放弃。要求：①描述图画；②解读寓意（面对疲惫困难不轻言放弃，休整与互勉后继续前行）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["别写成\"必须硬撑\"，允许多样化观点（休整、方法、互相鼓励）","\"同伴的鼓励\"是本题容易被忽略的细节"]
  });

  BANK.push({
    id: 'q_real_2020_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2020 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2020 真题',
    title: '2020 真题：习惯：尽早完成 vs 拖到最后',
    difficulty: 3, words: '160-200', tags: ["习惯","时间管理"],
    figure: F.twoPanel({ lBubble:'尽早完成才放心', rBubble:'不到最后不动手', lMarks:'（桌上堆满文件）', rMarks:'（桌上只有一书一笔）', title:'“习惯”' }),
    promptTextZh: '图画/图表内容：两幅对比图，题为"习惯"：左图一人伏案、桌上堆满文件，对话框写"尽早完成才放心"；右图一人靠在椅背上放松，桌上只有一本书一支笔，对话框写"不到最后不动手"。',
    promptZh: '两幅对比图，题为"习惯"：左图提前完成、从容安心；右图拖到最后、被动应付。要求：①描述图画；②解读寓意（早做带来的从容与拖延带来的焦虑）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["对照型：用 while / in contrast 把两种状态并排写出","建议段可给一个可操作的习惯方法"]
  });

  BANK.push({
    id: 'q_real_2021_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2021 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2021 真题',
    title: '2021 真题：遵从内心的热爱',
    difficulty: 3, words: '160-200', tags: ["热爱","选择","传统戏曲"],
    figure: F.facing({ bubbleL:'很多同学觉得学唱戏不好玩', bubbleR:'你自己不是喜欢吗？那就够了', cap:'（孩子装扮成美猴王，父亲在一旁鼓励）' }),
    promptTextZh: '图画/图表内容：一个装扮成美猴王（孙悟空）、手拿小棒子的男孩对父亲说"很多同学觉得学唱戏不好玩"，父亲回答"你自己不是喜欢吗？那就足够了"。',
    promptZh: '图画：孩子因同学觉得"学唱戏不好玩"而犹豫，父亲告诉他"你自己喜欢就够了"。要求：①描述图画；②解读寓意（遵从内心的热爱，不因他人眼光放弃）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["这题兼有\"传统文化（戏曲）\"与\"遵从热爱\"两层，可都点到","\"就够了\"是父亲的落点，也是寓意的落点"]
  });

  BANK.push({
    id: 'q_real_2022_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2022 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2022 真题',
    title: '2022 真题：跨专业学习、开阔视野',
    difficulty: 3, words: '160-200', tags: ["教育","开放","跨界"],
    figure: F.twoPanel({ lBubble:'不是我们专业的，听了也没用', rBubble:'去听听肯定有好处', lMarks:'（站在“校园讲座”公告栏前）', rMarks:'', title:'（两名学生在讲座公告栏前）' }),
    promptTextZh: '图画/图表内容：两名穿校服的女生站在贴有"校园讲座"通知的公告栏前：短发女生说"不是我们专业的，听了也没用"，长发女生说"去听听肯定有好处"。',
    promptZh: '图画：两名学生在讲座公告栏前产生分歧——"不是本专业的没用"vs"听了肯定有好处"。要求：①描述图画；②解读寓意（知识不应被专业边界锁死，应保持开放好奇）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["题干未给讲座的具体名称，不要编造细节","可写 interdisciplinary / broaden one’s horizons 一类表达"]
  });

  BANK.push({
    id: 'q_real_2023_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2023 年考研英语一 大作文（Part B，20 分，图画作文）', year: '2023 真题',
    title: '2023 真题：龙舟赛：传统民俗的复兴',
    difficulty: 3, words: '160-200', tags: ["传统","民俗","文化自信"],
    figure: F.crowd({ sign:'龙舟赛', cap:'（河上两舟竞渡，两岸人群挥旗呐喊，一对老夫妇含笑观看）' }),
    promptTextZh: '图画/图表内容：河上两艘龙舟激烈竞渡，两岸及拱桥上人群挥旗呐喊；画面右下角一对老夫妇含笑观看，老爷爷感叹"真好啊！咱们村的龙舟赛越来越热闹了"。',
    promptZh: '图画：龙舟竞渡，两岸人山人海，一位老爷爷感叹"咱们村的龙舟赛越来越热闹了"。要求：①描述图画；②解读寓意（传统民俗在乡村复兴、文化自信提升）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["\"越来越热闹\"是变化的信号，落笔要写出\"复兴\"","可联系乡村振兴与文化认同"]
  });

  BANK.push({
    id: 'q_real_2024_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2024 年考研英语一 大作文（Part B，20 分，图画＋柱状图）', year: '2024 真题',
    title: '2024 真题：公园建设与民生（图画＋柱状图）',
    difficulty: 4, words: '160-200', tags: ["公共空间","民生","数据"],
    figure: F.barChart({ title:'某市近三年公园数量', sub:'（单位：座，示意）', yUnit:'', yMax:700, note:'数据示意：2020 年 406 座 → 2021 年 532 座 → 2022 年 670 座', groups:[{label:'2020', values:[{v:406,label:'406'}]},{label:'2021', values:[{v:532,label:'532'}]},{label:'2022', values:[{v:670,label:'670'}]}] }),
    promptTextZh: '图画/图表内容：左图：市民在新建公园里活动（孩子跑步、情侣聊天，有人感叹"家门口新建的小公园真不错"）；右图：某市近三年公园数量柱状图，由 406 座增至 670 座。',
    promptZh: '本题为"图画＋柱状图"：左图画市民在新建公园休闲，右图为某市近三年公园数量（406→532→670 座）。要求：①描述图表；②分析原因；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following chart(s). In your essay, you should\n\n1) describe the chart(s) briefly,\n2) explain the possible reasons for the phenomenon, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["要同时写画面内容和数据变化，别只写一边","数据只挑关键趋势（逐年上升、三年增约六成）即可"]
  });

  BANK.push({
    id: 'q_real_2025_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2025 年考研英语一 大作文（Part B，20 分，表格）', year: '2025 真题',
    title: '2025 真题：耐用消费品拥有量（表格）',
    difficulty: 4, words: '160-200', tags: ["生活水平","消费","数据"],
    figure: F.table({ title:'近年来全国居民平均每百户年末主要耐用消费品拥有量', sub:'（2014 年 → 2023 年）', years:['2014 年','2023 年'], rows:[{name:'空调', values:['75.2 台','145.9 台']},{name:'洗衣机', values:['83.7 台','98.2 台']},{name:'电冰箱', values:['85.5 台','103.4 台']}], note:'数据示意，具体数值以原卷为准（2017 年电冰箱数值各来源有 93.3 / 95.3 之争）' }),
    promptTextZh: '图画/图表内容：表格题为"近年来全国居民平均每百户年末主要耐用消费品拥有量"：空调由 75.2 台增至 145.9 台（近乎翻倍），洗衣机由 83.7 增至 98.2 台，电冰箱由 85.5 增至 103.4 台（2014—2023 年）。',
    promptZh: '本题为表格作文：全国居民每百户耐用消费品拥有量（空调近乎翻倍，洗衣机、电冰箱小幅上升）。要求：①描述表格；②分析原因（收入增长、生活品质追求）；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following chart(s). In your essay, you should\n\n1) describe the chart(s) briefly,\n2) explain the possible reasons for the phenomenon, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["注意区分\"近乎翻倍\"与\"小幅上升\"，趋势描述要分级","原因可写收入增长、消费升级、产业供给"]
  });

  BANK.push({
    id: 'q_real_2026_major', category: 'real', subject: 'en1', kind: 'major',
    source: '2026 年考研英语一 大作文（Part B，20 分，双图表）', year: '2026 真题',
    title: '2026 真题：养老机器人的接受度与顾虑（双图表）',
    difficulty: 4, words: '160-200', tags: ["科技","养老","数据"],
    figure: F.pieChart({ title:'消费者对养老机器人的接受度', sub:'（调查数据，示意）', slices:[{label:'完全接受', v:39.3},{label:'部分接受', v:32.8},{label:'不接受', v:27.9}], note:'（另有柱状图：首要关注点——安全 46.3%、价格 24.9%、便利 10.7%）' }),
    promptTextZh: '图画/图表内容：双图表：饼图显示消费者对养老机器人的接受度（完全接受 39.3%、部分接受 32.8%、不接受 27.9%）；柱状图显示首要关注点（安全 46.3%、价格 24.9%、便利 10.7%）。',
    promptZh: '本题为双图表（2026 年英语一大作文）：一图是养老机器人的消费者接受度，另一图是首要关注点（安全占比最高）。要求：①描述图表；②分析原因；③给出你的评论。',
    promptEn: "Write an essay of 160-200 words based on the following chart(s). In your essay, you should\n\n1) describe the chart(s) briefly,\n2) explain the possible reasons for the phenomenon, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET.",
    hints: ["两图要建立联系：接受度不低，但\"安全\"是最大门槛","\"逾七成不同程度接受\"是概括数据的关键句"]
  });

  BANK.push({
    id: 'q_real_2010_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2010 年考研英语一 小作文（Part A，10 分）', year: '2010 真题',
    title: '2010 真题：研究生会招募国际会议志愿者（通知）',
    difficulty: 3, words: '100', tags: ['应用文', "notice"],
    promptZh: '你是研究生会（Postgraduates\' Association）成员。请以研究生会名义写一则通知，招募"全球化国际会议"的志愿者：①说明招募目的与会议信息；②说明申请者应具备的基本条件；③补充其他相关信息（报名方式与截止时间、联系方式等）。约 100 词，落款只能用 Postgraduates\' Association，不署真名。',
    promptEn: "Suppose you are a student of a Chinese university. Write a notice of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["这是通知不是书信：不要写 Dear... 之类的称呼","落款写 Postgraduates' Association，不要写 Li Ming"]
  });

  BANK.push({
    id: 'q_real_2011_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2011 年考研英语一 小作文（Part A，10 分）', year: '2011 真题',
    title: '2011 真题：向朋友推荐一部电影（书信）',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '请给你的一位朋友写一封约 100 词的信，推荐一部你最喜欢的电影：①点明推荐的影片；②说明推荐理由。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["语体偏非正式（写给朋友），不必过度书面","理由要具体（主题、表演、影响你什么）"]
  });

  BANK.push({
    id: 'q_real_2012_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2012 年考研英语一 小作文（Part A，10 分）', year: '2012 真题',
    title: '2012 真题：学生会致国际学生的欢迎与建议信（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '请以学生会（Students\' Union）名义给即将来校的国际学生写一封约 100 词的邮件：①表示欢迎；②就他们在本校的校园生活提出建议。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["先欢迎、再建议，语气友好","建议写成 2—3 条可操作的小贴士"]
  });

  BANK.push({
    id: 'q_real_2013_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2013 年考研英语一 小作文（Part A，10 分）', year: '2013 真题',
    title: '2013 真题：邀请外教担任英语演讲比赛评委（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '请给本院系的一位外籍教师写一封约 100 词的邮件，邀请他/她担任即将举行的英语演讲比赛的评委：①说明写信目的；②交代必要细节（时间、地点、参赛者与其他评委情况等，可自定）；③期待回复。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write an email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["邀请信三要素：目的、细节、期待回复","评委身份要写清\"希望他/她做什么\""]
  });

  BANK.push({
    id: 'q_real_2014_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2014 年考研英语一 小作文（Part A，10 分）', year: '2014 真题',
    title: '2014 真题：致校长的建议信：改善学生身体状况',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '请给校长（the president of your university）写一封约 100 词的信，就如何改善学生身体状况提出建议：①说明现状或问题；②提出具体建议（可多条）；③说明这样做的意义。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["建议信结构：问题 → 建议 → 意义","对校长写信要注意称呼与语气（Dear President,）"]
  });

  BANK.push({
    id: 'q_real_2015_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2015 年考研英语一 小作文（Part A，10 分）', year: '2015 真题',
    title: '2015 真题：读书会推荐一本书（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你是读书会（reading club）活动的主持人。请给俱乐部成员写一封约 100 词的邮件：①说明即将举办读书会、写信目的是推荐一本书；②给出书名；③说明推荐理由。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["推荐书要\"点名 + 给理由\"，理由别只写 interesting","可提一句希望成员提前读了再来讨论"]
  });

  BANK.push({
    id: 'q_real_2016_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2016 年考研英语一 小作文（Part A，10 分）', year: '2016 真题',
    title: '2016 真题：图书馆致新留学生的通知',
    difficulty: 3, words: '100', tags: ['应用文', "notice"],
    promptZh: '你是校图书馆管理员，请写一则约 100 词的通知，面向新入学的留学生：①表示欢迎；②介绍图书馆的开放时间、借阅规则与资源服务；③留下联系方式。落款 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a notice of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["通知格式：Notice 居中，正文分段，落款人/单位","信息类通知要点齐全即可，不必追求华丽"]
  });

  BANK.push({
    id: 'q_real_2017_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2017 年考研英语一 小作文（Part A，10 分）', year: '2017 真题',
    title: '2017 真题：向新到任外教推荐本市景点（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '新到任的澳大利亚教授 James Cook 想了解这座城市。请写一封约 100 词的邮件：①推荐本市的景点或去处；②说明推荐理由；③表示愿意提供进一步帮助。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["推荐 1—2 处即可，理由要具体（历史/文化/交通便利）","I would be happy to show you around. 是稳妥的收尾"]
  });

  BANK.push({
    id: 'q_real_2018_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2018 年考研英语一 小作文（Part A，10 分）', year: '2018 真题',
    title: '2018 真题：邀请外籍专家出席毕业典礼（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '请代表学校给全校外籍专家写一封约 100 词的邀请邮件，邀请他们出席毕业典礼：①说明典礼时间；②说明地点与相关安排（流程、着装等）；③期待回复。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write an email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["注意\"代表学校\"的身份与语气","时间、地点、流程任选两三点写清"]
  });

  BANK.push({
    id: 'q_real_2019_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2019 年考研英语一 小作文（Part A，10 分）', year: '2019 真题',
    title: '2019 真题：回复国际学生的志愿者咨询（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: '你是"援助农村小学"项目的成员。一位国际学生来信咨询该项目的志愿者招募。请回信约 100 词：①介绍项目内容与活动（如送书、支教）；②说明对志愿者的要求；③留下联系方式，欢迎继续咨询。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a reply email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["回信先感谢来信，再逐条回答","项目细节可自拟，但要具体可信"]
  });

  BANK.push({
    id: 'q_real_2020_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2020 年考研英语一 小作文（Part A，10 分）', year: '2020 真题',
    title: '2020 真题：歌唱比赛通知',
    difficulty: 3, words: '100', tags: ['应用文', "notice"],
    promptZh: '你受校学生会委派，请写一则约 100 词的通知，告知国际学生即将举行的歌唱比赛：①说明比赛的基本信息；②说明时间、地点、赛制与报名方式；③欢迎参加。落款 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a notice of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["通知格式：Notice 居中 + 落款","报名方式要写清楚（邮箱/线上表单）"]
  });

  BANK.push({
    id: 'q_real_2021_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2021 年考研英语一 小作文（Part A，10 分）', year: '2021 真题',
    title: '2021 真题：给外国友人的求职建议（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你的外国朋友刚大学毕业，打算在中国找工作。请写一封约 100 词的邮件：①祝贺毕业并表示欢迎；②给出具体求职建议（如了解行业需求、准备中文简历、使用招聘平台）；③表达祝愿并愿意继续帮忙。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["建议要给\"可执行动作\"，不要只说 good luck","结尾 I am always here if you need help. 自然收束"]
  });

  BANK.push({
    id: 'q_real_2022_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2022 年考研英语一 小作文（Part A，10 分）', year: '2022 真题',
    title: '2022 真题：邀请外教组队参加创新大赛（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '你校将举办国际创新大赛。请给一位英国大学的教授写一封约 100 词的邮件，邀请他/她组队参加：①说明赛事的时间、地点与性质；②说明邀请他/她组队的原因与意义；③期待回复并表示愿意提供协助。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write an email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["题干没有给出赛事的正式名称，不要编造","组队参加要写清\"他/她能带来什么\""]
  });

  BANK.push({
    id: 'q_real_2023_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2023 年考研英语一 小作文（Part A，10 分）', year: '2023 真题',
    title: '2023 真题：为教授研究项目招募学生（通知）',
    difficulty: 3, words: '100', tags: ['应用文', "notice"],
    promptZh: 'Smith 教授正在开展"校园体育活动"研究项目，需要招募一名学生助手。请以 Li Ming 名义写一则约 100 词的通知：①说明项目与招募目的；②说明岗位职责；③说明任职要求与报名方式、截止时间。',
    promptEn: "Suppose you are a student of a Chinese university. Write a notice of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["招募通知要写清 duties / requirements / how to apply","截止时间是常被漏掉的要点"]
  });

  BANK.push({
    id: 'q_real_2024_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2024 年考研英语一 小作文（Part A，10 分）', year: '2024 真题',
    title: '2024 真题：回复留学生关于古代科学家报告的建议（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: '留学生 Paul 来信请你为他的课堂口头报告（主题：中国古代科学家）提建议。请回信约 100 词：①表示乐意帮忙；②给出具体建议（如确定人选、查权威资料、梳理生平与贡献、列提纲）；③提醒练习演讲、控制时间并给予鼓励。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a reply email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["回信要有回应性：先回应请求，再给建议","建议 2—3 条即可，每条一句"]
  });

  BANK.push({
    id: 'q_real_2025_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2025 年考研英语一 小作文（Part A，10 分）', year: '2025 真题',
    title: '2025 真题：回复同学关于手工艺展示的提问（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: '你邀请了年轻匠人进校园做"创新手工艺展示"，同学 Paul 来信问了两个问题。请回信约 100 词：①说明他们会展示什么（如把剪纸做成现代贺卡、陶艺结合数码纹样）；②说明你能提供什么帮助（如设计海报、当天接待）；③感谢他的热情并表达期待。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a reply email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["这题是\"回答两个具体问题\"，务必逐条回应","回答要具体，避免空泛表态"]
  });

  BANK.push({
    id: 'q_real_2026_minor', category: 'real', subject: 'en1', kind: 'minor',
    source: '2026 年考研英语一 小作文（Part A，10 分）', year: '2026 真题',
    title: '2026 真题：回复朋友关于中国家庭手写信的询问（邮件）',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: '你昨天发布了一批中国家庭的老手写信，朋友 Paul 来信表示很感兴趣，问了两个问题。请回信约 100 词：①多介绍这些信（来历、内容、为何珍贵）；②回答"现在是否在某处公开展出"，并说明地点与时间；③回应他想亲眼看看的想法，可提议陪同前往。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a reply email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address.",
    hints: ["两个问题必须都答到，这是本题得分焦点","展出地点与时间自拟即可，写具体一点"]
  });

  BANK.push({
    id: 'q_en2_2010_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2010 年考研英语二 大作文（图表作文，15 分）', year: '2010 真题',
    title: '2010 真题（英语二）：发展中国家与发达国家的手机订阅量',
    difficulty: 3, words: '150', tags: ["科技","通信","发展"],
    figure: F.barChart({ title:'Mobile-phone subscriptions (2000-2008)', sub:'（单位：十亿 / billion，示意图）', yUnit:'', yMax:50, note:'数据示意：2008 年发展中国家约 40 亿，发达国家约 13 亿', groups:[{label:'2000', values:[{v:8,label:'约 8'}]},{label:'2008', values:[{v:40,label:'约 40'}]}] }),
    promptTextZh: '图表内容：柱状图：Mobile-phone subscriptions（2000—2008 年），对比发展中国家与发达国家。2008 年发展中国家约 40 亿用户，约为发达国家（约 13 亿）的三倍；发达国家近十年基本持平。',
    promptZh: '图表题：2000—2008 年手机订阅量，发展中国家快速增长并远超发达国家。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write about 150 words on the ANSWER SHEET.",
    hints: ["发展中国家 vs 发达国家 是本题的核心对比","可落到\"通信普及对发展中国家的意义\""]
  });

  BANK.push({
    id: 'q_en2_2011_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2011 年考研英语二 大作文（图表作文，15 分）', year: '2011 真题',
    title: '2011 真题（英语二）：国内轿车市场部分品牌市场份额',
    difficulty: 3, words: '150', tags: ["经济","市场","品牌"],
    figure: F.twinBars({ title:'2008、2009 年国内轿车市场部分品牌份额', sub:'（%，示意图）', yUnit:'%', yMax:40, groups:[{label:'国产品牌', values:[{v:25,label:'25'},{v:35,label:'35'}]},{label:'日系品牌', values:[{v:35,label:'35'},{v:25,label:'25'}]},{label:'美系品牌', values:[{v:10,label:'10'},{v:15,label:'15'}]}], legend:'浅色＝2008 年，深色＝2009 年' }),
    promptTextZh: '图表内容：柱状图：2008、2009 年国内轿车市场部分品牌市场份额——国产品牌 25%→35%，日系 35%→25%，美系 10%→15%。',
    promptZh: '图表题：两年间国产品牌份额上升、日系下降、美系上升。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write about 150 words on the ANSWER SHEET.",
    hints: ["要写出三种品牌各自的方向与原因","结论可落在自主品牌如何继续提升"]
  });

  BANK.push({
    id: 'q_en2_2012_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2012 年考研英语二 大作文（图表作文，15 分）', year: '2012 真题',
    title: '2012 真题（英语二）：某公司员工工作满意度调查',
    difficulty: 3, words: '150', tags: ["职场","管理","数据"],
    figure: F.table({ title:'某公司员工工作满意度调查', sub:'（%，示意图）', years:['≤40 岁','41—50 岁','>50 岁'], rows:[{name:'满意', values:['16.7','0.0','40.0']},{name:'不清楚', values:['50.0','36.0','50.0']},{name:'不满意', values:['33.3','64.0','—']}], note:'数据示意，具体数值以原卷为准' }),
    promptTextZh: '图表内容：表格：某公司员工工作满意度调查，按年龄分组（≤40 岁 / 41—50 岁 / >50 岁），包含满意、不清楚、不满意三类的比例；41—50 岁员工不满意比例最高（64%）。',
    promptZh: '表格题：公司员工工作满意度按年龄分组的数据。要求：①解读表格；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["横向比年龄组、纵向比态度类别，两个方向都要写","建议可针对中年员工满意度低提对策"]
  });

  BANK.push({
    id: 'q_en2_2013_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2013 年考研英语二 大作文（图表作文，15 分）', year: '2013 真题',
    title: '2013 真题（英语二）：某高校学生兼职情况',
    difficulty: 3, words: '150', tags: ["教育","兼职","就业"],
    figure: F.barChart({ title:'某高校学生兼职情况（按年级）', sub:'（%，示意图）', yUnit:'%', yMax:100, note:'数据示意：大一至大三缓慢上升，大四骤增至 88.24%', groups:[{label:'大一', values:[{v:35,label:'约 35'}]},{label:'大二', values:[{v:45,label:'约 45'}]},{label:'大三', values:[{v:55,label:'约 55'}]},{label:'大四', values:[{v:88,label:'88.2'}]}] }),
    promptTextZh: '图表内容：柱状图：某高校学生兼职情况（按年级）——大一至大三缓慢上升，大四骤增至 88.24%。',
    promptZh: '图表题：学生兼职比例随年级上升，大四出现陡增。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["\"大四骤增\"是数据重点，要解释原因（就业压力、实习需求）","结论可谈学习与兼职的平衡"]
  });

  BANK.push({
    id: 'q_en2_2014_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2014 年考研英语二 大作文（图表作文，15 分）', year: '2014 真题',
    title: '2014 真题（英语二）：20 年间中国城镇与乡村人口变化',
    difficulty: 3, words: '150', tags: ["社会","城市化","人口"],
    figure: F.twinBars({ title:'20 年间中国城镇人口与乡村人口变化', sub:'（亿人，示意图）', yUnit:'亿', yMax:10, groups:[{label:'1990', values:[{v:3.0,label:'3.0'},{v:8.2,label:'8.2'}]},{label:'2000', values:[{v:4.6,label:'4.6'},{v:8.1,label:'8.1'}]},{label:'2010', values:[{v:6.6,label:'6.6'},{v:6.8,label:'6.8'}]}], legend:'浅色＝城镇人口，深色＝乡村人口' }),
    promptTextZh: '图表内容：柱状图：20 年间中国城镇人口与乡村人口变化——城镇人口由约 3 亿增至约 6.6 亿，乡村人口由约 8.2 亿降至约 6.8 亿。',
    promptZh: '图表题：城镇人口持续上升、乡村人口下降，二者差距逐年缩小。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["要写出\"两条线的方向相反\"这一对比","原因可写城市化、就业机会迁移"]
  });

  BANK.push({
    id: 'q_en2_2015_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2015 年考研英语二 大作文（图表作文，15 分）', year: '2015 真题',
    title: '2015 真题（英语二）：某市居民春节假期花销比例',
    difficulty: 3, words: '150', tags: ["消费","节日","社会"],
    figure: F.pie2({ title:'某市居民春节假期花销比例', sub:'（示意图）', slices:[{label:'给他人买礼物', v:40},{label:'交通', v:20},{label:'其他', v:40}], note:'数据示意：礼物 40%、交通 20%（其余分项未核实）' }),
    promptTextZh: '图表内容：饼图：某市居民春节假期花销比例，其中"给他人买礼物"占 40%（最大项）、"交通"占 20%。',
    promptZh: '图表题：春节假期花销构成，人情消费与交通占主要部分。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["占比最大项要放在最前面写","可联系异地工作带来的返乡交通支出"]
  });

  BANK.push({
    id: 'q_en2_2016_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2016 年考研英语二 大作文（图表作文，15 分）', year: '2016 真题',
    title: '2016 真题（英语二）：某高校学生旅游目的调查',
    difficulty: 3, words: '150', tags: ["旅游","消费","心态"],
    figure: F.pie2({ title:'某高校学生旅游目的调查', sub:'（示意图）', slices:[{label:'欣赏风景', v:37},{label:'缓解压力', v:33},{label:'培养独立能力', v:9},{label:'结交朋友', v:6},{label:'其他', v:15}], note:'数据示意，各类对应关系以原卷为准' }),
    promptTextZh: '图表内容：饼图：某高校学生旅游目的调查——欣赏风景 37%、缓解压力 33%、培养独立能力 9%、结交朋友 6%、其他 15%。',
    promptZh: '图表题：大学生旅游动机以审美与放松为主。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["前两项占比合计约七成，要显式概括","可点评\"旅游的教育功能被低估\""]
  });

  BANK.push({
    id: 'q_en2_2017_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2017 年考研英语二 大作文（图表作文，15 分）', year: '2017 真题',
    title: '2017 真题（英语二）：2013—2015 年我国博物馆数量与参观人数',
    difficulty: 3, words: '150', tags: ["文化","公共服务","数据"],
    figure: F.lineChart({ title:'2013—2015 年我国博物馆数量与参观人数', sub:'（示意图）', xLabels:['2013','2014','2015'], yMax:5000, series:[{name:'博物馆数量（家）', values:[4165,4510,4692], labels:['约4165','约4510','约4692']},{name:'参观人数（十万人次）', values:[640,720,780], labels:['约6.4亿','约7.2亿','约7.8亿']}], note:'数据示意；数值细节以原卷为准' }),
    promptTextZh: '图表内容：折线图：2013—2015 年我国博物馆数量与参观人数——博物馆由约 4165 家增至约 4692 家，参观人数由约 6.4 亿增至约 7.8 亿人次。',
    promptZh: '图表题：博物馆数量与参观人数同步上升。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["两条线都要写，并指出\"同步上升\"的关系","原因可提免费开放、文化需求升温"]
  });

  BANK.push({
    id: 'q_en2_2018_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2018 年考研英语二 大作文（图表作文，15 分）', year: '2018 真题',
    title: '2018 真题（英语二）：消费者选择餐厅时的关注因素',
    difficulty: 3, words: '150', tags: ["消费","服务业","数据"],
    figure: F.pie2({ title:'2017 年某市消费者选择餐厅时的关注因素', sub:'（示意图）', slices:[{label:'特色', v:36.3},{label:'环境', v:27.8},{label:'服务', v:26.8},{label:'价格', v:8.4}], note:'数据示意' }),
    promptTextZh: '图表内容：饼图：2017 年某市消费者选择餐厅时的关注因素——特色 36.3%、环境 27.8%、服务 26.8%、价格 8.4%。',
    promptZh: '图表题：消费者更看重特色、环境与服务，价格占比最低。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["\"价格占比最低\"是本题的亮点，要显式对比","结论可写消费升级与服务业转型"]
  });

  BANK.push({
    id: 'q_en2_2019_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2019 年考研英语二 大作文（图表作文，15 分）', year: '2019 真题',
    title: '2019 真题（英语二）：某高校本科毕业生去向统计',
    difficulty: 3, words: '150', tags: ["教育","就业","升学"],
    figure: F.twinBars({ title:'某高校 2013 年与 2018 年本科毕业生去向', sub:'（%，示意图）', yUnit:'%', yMax:80, groups:[{label:'2013 年', values:[{v:68.1,label:'68.1'},{v:26.3,label:'26.3'}]},{label:'2018 年', values:[{v:60.7,label:'60.7'},{v:34.0,label:'34.0'}]}], legend:'浅色＝就业，深色＝升学' }),
    promptTextZh: '图表内容：柱状图：某高校 2013 年与 2018 年本科毕业生去向——就业由 68.1% 降至 60.7%，升学由 26.3% 升至 34.0%，创业变化不明显。',
    promptZh: '图表题：就业比例下降、升学比例上升。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["写出\"一降一升\"的对比","原因可写就业竞争与学历需求"]
  });

  BANK.push({
    id: 'q_en2_2020_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2020 年考研英语二 大作文（图表作文，15 分）', year: '2020 真题',
    title: '2020 真题（英语二）：某高校学生手机阅读目的调查',
    difficulty: 3, words: '150', tags: ["阅读","科技","教育"],
    figure: F.pie2({ title:'某高校学生手机阅读目的调查', sub:'（示意图）', slices:[{label:'获取信息', v:45},{label:'学习知识', v:28},{label:'消磨时间', v:15},{label:'其他', v:12}], note:'数据示意' }),
    promptTextZh: '图表内容：饼图：某高校学生手机阅读目的调查——获取信息 45%、学习知识 28%、消磨时间 15%、其他 12%。',
    promptZh: '图表题：手机阅读以获取信息与学习知识为主。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["前两项合计约七成，可概括为\"目的性阅读为主\"","可建议引导更有深度的阅读"]
  });

  BANK.push({
    id: 'q_en2_2021_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2021 年考研英语二 大作文（图表作文，15 分）', year: '2021 真题',
    title: '2021 真题（英语二）：某市居民体育锻炼方式调查',
    difficulty: 3, words: '150', tags: ["健康","生活方式","数据"],
    figure: F.barChart({ title:'某市居民体育锻炼方式调查', sub:'（%，示意图）', yUnit:'%', yMax:60, note:'数据示意', groups:[{label:'独自锻炼', values:[{v:54.3,label:'54.3'}]},{label:'与朋友一起', values:[{v:47.7,label:'47.7'}]},{label:'与家人一起', values:[{v:23.9,label:'23.9'}]},{label:'其他', values:[{v:15.5,label:'15.5'}]}] }),
    promptTextZh: '图表内容：柱状图：某市居民体育锻炼方式调查——独自锻炼 54.3%、与朋友一起 47.7%、与家人一起 23.9%、其他 15.5%。',
    promptZh: '图表题：居民锻炼以独自或与朋友为主，家庭共同锻炼比例最低。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["\"与家人一起\"占比最低，是可用于评论的对比点","可建议把锻炼变成家庭活动"]
  });

  BANK.push({
    id: 'q_en2_2022_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2022 年考研英语二 大作文（图表作文，15 分）', year: '2022 真题',
    title: '2022 真题（英语二）：2018—2020 年我国快递业务量',
    difficulty: 3, words: '150', tags: ["经济","电商","农村"],
    figure: F.twinBars({ title:'2018—2020 年我国快递业务量变动', sub:'（亿件，示意图）', yUnit:'亿件', yMax:900, groups:[{label:'2018', values:[{v:510,label:'约510'},{v:120,label:'约120'}]},{label:'2019', values:[{v:640,label:'约640'},{v:150,label:'约150'}]},{label:'2020', values:[{v:830,label:'约830'},{v:300,label:'约300'}]}], legend:'浅色＝全国快递量，深色＝农村快递量' }),
    promptTextZh: '图表内容：柱状图：2018—2020 年我国快递业务量——全国由约 510 亿件增至约 830 亿件；农村由约 120 亿件增至约 300 亿件。',
    promptZh: '图表题：快递业务量快速增长，农村增速更明显。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["\"农村增速更快\"要单独指出","原因可写电商下沉、网络与物流普及"]
  });

  BANK.push({
    id: 'q_en2_2023_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2023 年考研英语二 大作文（图表作文，15 分）', year: '2023 真题',
    title: '2023 真题（英语二）：2012—2021 年我国居民健康素养水平',
    difficulty: 3, words: '150', tags: ["健康","趋势","社会"],
    figure: F.lineChart({ title:'2012—2021 年我国居民健康素养水平', sub:'（%，示意图）', xLabels:['2012','2015','2018','2021'], yMax:30, yUnit:'%', series:[{name:'健康素养水平', values:[8.8,10.3,17.1,25.4], labels:['8.8','10.3','17.1','25.4']}], note:'数据示意' }),
    promptTextZh: '图表内容：折线图：2012—2021 年我国居民健康素养水平由 8.8% 稳步升至 25.4%。',
    promptZh: '图表题：居民健康素养十年稳步上升。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["折线题要描述\"起点—终点—趋势\"三要素","原因可写信息可及性与科学就医观念"]
  });

  BANK.push({
    id: 'q_en2_2024_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2024 年考研英语二 大作文（图表作文，15 分）', year: '2024 真题',
    title: '2024 真题（英语二）：某高校学生劳动实践课主要收获',
    difficulty: 3, words: '150', tags: ["教育","劳动","能力"],
    figure: F.pie2({ title:'某高校学生劳动实践课主要收获调查', sub:'（示意图，图型各来源记载不一，以原卷为准）', slices:[{label:'增强动手能力', v:35},{label:'培养劳动观念', v:28},{label:'增进团队协作', v:20},{label:'了解职业方向', v:17}], note:'数据示意；图型（柱/饼）与数值以原卷为准' }),
    promptTextZh: '图表内容：图表：某高校学生劳动实践课主要收获——增强动手能力 35%、培养劳动观念 28%、增进团队协作 20%、了解职业方向 17%。',
    promptZh: '图表题：劳动实践课的收获兼顾技能与观念。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["各来源对该年图型记载不一（柱/饼），答题时只按图表内容描述即可","可点评劳动教育与实践能力的关系"]
  });

  BANK.push({
    id: 'q_en2_2025_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2025 年考研英语二 大作文（图表作文，15 分）', year: '2025 真题',
    title: '2025 真题（英语二）：某社区老年人主要日常休闲活动',
    difficulty: 3, words: '150', tags: ["老龄化","健康","社区"],
    figure: F.barChart({ title:'某社区老年人主要日常休闲活动调查', sub:'（%，示意图）', yUnit:'%', yMax:100, note:'数据示意', groups:[{label:'看电视', values:[{v:90.8,label:'90.8'}]},{label:'散步', values:[{v:68.3,label:'68.3'}]},{label:'养花', values:[{v:34.7,label:'34.7'}]},{label:'阅读', values:[{v:31.8,label:'31.8'}]},{label:'下棋', values:[{v:18.4,label:'18.4'}]}] }),
    promptTextZh: '图表内容：柱状图：某社区老年人主要日常休闲活动——看电视 90.8%、散步 68.3%、养花 34.7%、阅读 31.8%、下棋 18.4%。',
    promptZh: '图表题：老年人休闲以看电视、散步为主，被动型活动占比最高。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["\"看电视 90.8%\"与\"下棋 18.4%\"的落差可用于评论","可建议社区组织更多主动型活动"]
  });

  BANK.push({
    id: 'q_en2_2026_major', category: 'real', subject: 'en2', kind: 'major',
    source: '2026 年考研英语二 大作文（图表作文，15 分）', year: '2026 真题',
    title: '2026 真题（英语二）：关于儿童户外活动看法的调查',
    difficulty: 3, words: '150', tags: ["教育","亲子","健康"],
    figure: F.barChart({ title:'关于儿童户外活动看法的调查', sub:'（%，示意图）', yUnit:'%', yMax:60, note:'数据示意：两项约 54%、两项约 33%；具体数值两来源有出入，以原卷为准', groups:[{label:'满足好奇心', values:[{v:54.6,label:'54.6'}]},{label:'促进观察力', values:[{v:54.5,label:'54.5'}]},{label:'强身健体', values:[{v:33.2,label:'33.2'}]},{label:'增强亲子互动', values:[{v:31.2,label:'31.2'}]}] }),
    promptTextZh: '图表内容：柱状图：关于儿童户外活动看法的调查——满足好奇心约 54.6%、促进观察力约 54.5%、强身健体约 33.2%、增强亲子互动约 31.2%（两项约 54%、两项约 33%）。',
    promptZh: '图表题：家长更看重户外活动对认知能力的帮助，对体魄与亲情的重视相对偏低。要求：①解读图表；②给出你的评论。',
    promptEn: "Write an essay based on the following chart. In your essay, you should\n\n1) interpret the chart, and\n2) give your comments.\n\nYou should write at least 150 words on the ANSWER SHEET.",
    hints: ["两组数据的落差是评论重点：认知 > 体魄/亲情","具体百分比各来源有出入，答题按\"两项约 54%、两项约 33%\"描述最稳妥"]
  });

  BANK.push({
    id: 'q_en2_2010_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2010 年考研英语二 小作文（Part A，10 分）', year: '2010 真题',
    title: '2010 真题（英语二）：致美国同事的感谢信',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你参加了中美文化交流项目并从美国归来。请给你在美国期间的美国同事写一封约 100 词的信：①感谢他/她的接待与帮助；②欢迎他/她日后访问中国。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["感谢信三段：致谢 → 具体回忆 → 欢迎回访","注意语体稍正式：I am writing to express my sincere gratitude for..."]
  });

  BANK.push({
    id: 'q_en2_2011_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2011 年考研英语二 小作文（Part A，10 分）', year: '2011 真题',
    title: '2011 真题（英语二）：祝贺表亲考入大学并给建议',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你的表亲（cousin）考上了大学。请给他/她写一封约 100 词的信：①表示祝贺；②就如何适应与规划大学生活提出建议。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["祝贺 + 建议两件事都要写","建议写 2—3 条具体做法（如时间管理、参加社团）"]
  });

  BANK.push({
    id: 'q_en2_2012_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2012 年考研英语二 小作文（Part A，10 分）', year: '2012 真题',
    title: '2012 真题（英语二）：致网店客服的投诉信',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你在网店购买的电子词典出现质量问题。请给该网店的客服中心写一封约 100 词的投诉信：①说明问题；②提出你希望的解决方式。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["投诉信语气要礼貌但诉求明确","可用 I would appreciate it if you could... 提出要求"]
  });

  BANK.push({
    id: 'q_en2_2013_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2013 年考研英语二 小作文（Part A，10 分）', year: '2013 真题',
    title: '2013 真题（英语二）：邀请同学参加慈善义卖',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '你们班将为贫困儿童举办一场慈善义卖（charity sale）。请给全班同学写一封约 100 词的邮件：①介绍活动的时间、地点与内容；②号召大家参加。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["邀请信要写清时间地点与参与方式","号召句可用 Your participation would mean a lot to..."]
  });

  BANK.push({
    id: 'q_en2_2014_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2014 年考研英语二 小作文（Part A，10 分）', year: '2014 真题',
    title: '2014 真题（英语二）：致未来室友的信：说明习惯并询问',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你即将入住学校宿舍，将有一位未来的室友（future roommate）。请给他/她写一封约 100 词的信：①介绍自己的生活习惯；②询问他/她的习惯与偏好。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["这是\"自我介绍 + 询问\"型书信，两点都要落到","语气友好，可提作息、卫生、安静时段等"]
  });

  BANK.push({
    id: 'q_en2_2015_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2015 年考研英语二 小作文（Part A，10 分）', year: '2015 真题',
    title: '2015 真题（英语二）：夏令营志愿者招募通知',
    difficulty: 3, words: '100', tags: ['应用文', "notice"],
    promptZh: '你校将为高中生举办夏令营，现面向全校学生招募志愿者。请写一则约 100 词的通知：①简要介绍夏令营活动；②说明志愿者工作与报名方式。落款 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["这是英语二 17 届中唯一一次\"通知\"，注意 Notice 标题与落款格式","通知要写清时间、地点、报名方式"]
  });

  BANK.push({
    id: 'q_en2_2016_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2016 年考研英语二 小作文（Part A，10 分）', year: '2016 真题',
    title: '2016 真题（英语二）：致 Jack 的感谢信并给翻译学习建议',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你在翻译比赛中获奖，朋友 Jack 来信祝贺。请给他写一封约 100 词的邮件：①感谢他的祝贺；②就如何学习翻译给出建议。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["感谢 + 建议两段推进","建议可写多读多译、对照原文修改、积累搭配"]
  });

  BANK.push({
    id: 'q_en2_2017_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2017 年考研英语二 小作文（Part A，10 分）', year: '2017 真题',
    title: '2017 真题（英语二）：回复 Williams 教授：接受邀请并说明演讲要点',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: 'Williams 教授邀请你为国际学生做一场关于中国文化的演讲。请给他写一封约 100 词的邮件：①接受邀请；②说明你打算讲的要点或提纲。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["先明确接受，再给出 2—3 个要点","要点要具体（如节日、饮食、书法），不要空泛"]
  });

  BANK.push({
    id: 'q_en2_2018_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2018 年考研英语二 小作文（Part A，10 分）', year: '2018 真题',
    title: '2018 真题（英语二）：致 Smith 教授的道歉信',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你原计划与 Smith 教授一同出行/拜访，但因故需要取消。请给他写一封约 100 词的邮件：①为取消计划道歉；②说明原因；③建议另约时间。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["道歉信三要素：致歉 → 原因 → 弥补建议","语气要诚恳，避免找借口式表述"]
  });

  BANK.push({
    id: 'q_en2_2019_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2019 年考研英语二 小作文（Part A，10 分）', year: '2019 真题',
    title: '2019 真题（英语二）：致 Smith 教授：辩论辩题建议与安排',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: '你们将就"交通"主题举行辩论。请给 Smith 教授写一封约 100 词的邮件：①提出一个具体辩题；②说明你的理由；③告知你的安排。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["辩题要写成明确的立场句（如 Should...? / ...does more harm than good）","三件事都要写，缺一即丢要点分"]
  });

  BANK.push({
    id: 'q_en2_2020_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2020 年考研英语二 小作文（Part A，10 分）', year: '2020 真题',
    title: '2020 真题（英语二）：致国际学生：历史景点参观介绍与建议',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你们将组织一组国际学生参观一处历史景点/遗址。请给他们写一封约 100 词的邮件：①介绍该景点；②给出参观建议（tips）。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["介绍 + 建议两段；建议可写着装、拍照礼仪、时间安排","可用 It is advisable to... / remember to..."]
  });

  BANK.push({
    id: 'q_en2_2021_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2021 年考研英语二 小作文（Part A，10 分）', year: '2021 真题',
    title: '2021 真题（英语二）：邀请国际学生 Jack 参加线上会议',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '你组织了一场线上会议。请给国际学生 Jack 写一封约 100 词的邮件：①邀请他参加；②说明会议的时间、主题与参与方式。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["线上会议要写清平台与链接（可自拟）","结尾期待回复：I look forward to seeing you online."]
  });

  BANK.push({
    id: 'q_en2_2022_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2022 年考研英语二 小作文（Part A，10 分）', year: '2022 真题',
    title: '2022 真题（英语二）：介绍校园美食节并邀请国际学生',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '你校将举办校园美食节（food festival）。请给本校国际学生写一封约 100 词的邮件：①介绍美食节；②邀请他们参加。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["介绍活动要写时间地点与亮点","邀请 + 期待回复两句收尾"]
  });

  BANK.push({
    id: 'q_en2_2023_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2023 年考研英语二 小作文（Part A，10 分）', year: '2023 真题',
    title: '2023 真题（英语二）：在艺术展与机器人展之间给出建议',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '朋友 David 在"艺术展"与"机器人展"之间犹豫。请给他写一封约 100 词的邮件：①给出你的建议（选其中一个）；②说明理由。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["必须明确二选一，不能两边都说好","理由要与他的兴趣或收益挂钩"]
  });

  BANK.push({
    id: 'q_en2_2024_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2024 年考研英语二 小作文（Part A，10 分）', year: '2024 真题',
    title: '2024 真题（英语二）：向搭档 Jack 说明古镇保护调查计划并征询意见',
    difficulty: 3, words: '100', tags: ['应用文', "letter"],
    promptZh: '你们将合作开展一项关于古镇老房子保护的调查。请给搭档 Jack 写一封约 100 词的邮件：①说明你的调查计划；②征求他的意见。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["计划要有可执行要素（对象、方法、时间）","征询意见句：I would like to hear your views on..."]
  });

  BANK.push({
    id: 'q_en2_2025_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2025 年考研英语二 小作文（Part A，10 分）', year: '2025 真题',
    title: '2025 真题（英语二）：介绍你策划的中国古典小说短剧并邀请朋友',
    difficulty: 3, words: '100', tags: ['应用文', "invitation"],
    promptZh: '你根据一部中国古典小说策划了一场短剧（short play）。请给朋友 John 写一封约 100 词的邮件：①介绍这台短剧；②邀请他参加。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["说明作品来源、你的角色、演出时间地点","邀请句不要只写 I hope you can come，可加一句理由"]
  });

  BANK.push({
    id: 'q_en2_2026_minor', category: 'real', subject: 'en2', kind: 'minor',
    source: '2026 年考研英语二 小作文（Part A，10 分）', year: '2026 真题',
    title: '2026 真题（英语二）：回复 Jack：谈家庭中国之行视频的观后感',
    difficulty: 3, words: '100', tags: ['应用文', "reply"],
    promptZh: '朋友 Jack 分享了他家庭中国之行的视频。请给他写一封约 100 词的邮件：①谈谈你的观后感；②表达想了解更多此行细节的愿望。署名 Li Ming。',
    promptEn: "Suppose you are a student of a Chinese university. Write a letter or email of about 100 words based on the requirements above.\n\nDo not use your own name; use \"Li Ming\" instead. Do not write your address. (10 points)",
    hints: ["观后感要具体（提到画面或场景），不要只说 interesting","两个要点都要写；结尾可问他最难忘的一站"]
  });

  BANK.push({
    id: 'q_en2_2010_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2010 年考研英语二 翻译（整段英译汉，15 分）', year: '2010 真题',
    title: '2010 真题（英语二）翻译：可持续生活方式（LOHAS）',
    difficulty: 3, words: '整段，15 分', tags: ["生活方式","可持续"],
    promptTextZh: '选段话题：以 Ted Ning 为例：他经历 90 年代末网络经济的兴衰、卖过保险、长期焦虑失眠，后来加入推广健康与可持续生活方式（LOHAS）的组织；说明"可持续"必须落实到日常选择与行动。',
    promptZh: '英语二翻译（整段英译汉，15 分）：以 Ted Ning 为例：他经历 90 年代末网络经济的兴衰、卖过保险、长期焦虑失眠，后来加入推广健康与可持续生活方式（LOHAS）的组织；说明"可持续"必须落实到日常选择与行动。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["整段翻译，15 分；先通读抓主旨，再逐句划主干","注意人物经历的时间线与\"可持续\"的落地含义"]
  });

  BANK.push({
    id: 'q_en2_2011_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2011 年考研英语二 翻译（整段英译汉，15 分）', year: '2011 真题',
    title: '2011 真题（英语二）翻译：IT 产业的碳足迹（Green IT）',
    difficulty: 3, words: '整段，15 分', tags: ["科技","环保"],
    promptTextZh: '选段话题：IT 产业的温室气体排放量与全球航空业相当（约占 CO2 总量的 2%）；每次搜索、数据中心的耗电与散热都带来环境负担；谷歌等大公司已在监控能效并改进，但仍需更多行动。',
    promptZh: '英语二翻译（整段英译汉，15 分）：IT 产业的温室气体排放量与全球航空业相当（约占 CO2 总量的 2%）；每次搜索、数据中心的耗电与散热都带来环境负担；谷歌等大公司已在监控能效并改进，但仍需更多行动。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意比较结构（as much as）与数据表述","\"仍需更多行动\"是结论句，不要漏译"]
  });

  BANK.push({
    id: 'q_en2_2012_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2012 年考研英语二 翻译（整段英译汉，15 分）', year: '2012 真题',
    title: '2012 真题（英语二）翻译：人才外流（Brain Drain）',
    difficulty: 3, words: '整段，15 分', tags: ["社会","人才"],
    promptTextZh: '选段话题：人才外流长期困扰某些国家：急需的熟练劳动者流向海外，本可教书育人的人才离去；段落讨论人才流动的得失。',
    promptZh: '英语二翻译（整段英译汉，15 分）：人才外流长期困扰某些国家：急需的熟练劳动者流向海外，本可教书育人的人才离去；段落讨论人才流动的得失。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["brain drain 不能直译为\"脑力流失\"，应译\"人才外流\"","注意 gain / drain 的对举"]
  });

  BANK.push({
    id: 'q_en2_2013_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2013 年考研英语二 翻译（整段英译汉，15 分）', year: '2013 真题',
    title: '2013 真题（英语二）翻译：能记住每一天的人（Hyperthymesia）',
    difficulty: 3, words: '整段，15 分', tags: ["心理","记忆"],
    promptTextZh: '选段话题：一位能记住自己生命中每一天的女士自述：记忆异常清晰（vivid）、无法遗忘，这既是天赋也是负担。',
    promptZh: '英语二翻译（整段英译汉，15 分）：一位能记住自己生命中每一天的女士自述：记忆异常清晰（vivid）、无法遗忘，这既是天赋也是负担。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["第一人称叙事，中文保持叙述感","both a gift and a burden 这类对举要译出"]
  });

  BANK.push({
    id: 'q_en2_2014_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2014 年考研英语二 翻译（整段英译汉，15 分）', year: '2014 真题',
    title: '2014 真题（英语二）翻译：为悲观者辩护（防御性悲观）',
    difficulty: 3, words: '整段，15 分', tags: ["心理","心态"],
    promptTextZh: '选段话题：悲观不全是坏事：防御性悲观者通过预想最坏结果来降低焦虑、提前准备，往往表现更好。',
    promptZh: '英语二翻译（整段英译汉，15 分）：悲观不全是坏事：防御性悲观者通过预想最坏结果来降低焦虑、提前准备，往往表现更好。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["defensive pessimism 译\"防御性悲观\"","注意\"看似矛盾却成立\"的逻辑关系"]
  });

  BANK.push({
    id: 'q_en2_2015_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2015 年考研英语二 翻译（整段英译汉，15 分）', year: '2015 真题',
    title: '2015 真题（英语二）翻译：熟路效应（the well-travelled road effect）',
    difficulty: 3, words: '整段，15 分', tags: ["心理","时间感"],
    promptTextZh: '选段话题：为何熟悉的路线感觉更快到达：大脑处理熟悉路况更省力，导致主观时间感"缩短"，属于心理学现象解释。',
    promptZh: '英语二翻译（整段英译汉，15 分）：为何熟悉的路线感觉更快到达：大脑处理熟悉路况更省力，导致主观时间感"缩短"，属于心理学现象解释。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意\"主观时间感\"与\"实际用时\"的区分","因果链（熟悉→省力→感觉快）要译清楚"]
  });

  BANK.push({
    id: 'q_en2_2016_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2016 年考研英语二 翻译（整段英译汉，15 分）', year: '2016 真题',
    title: '2016 真题（英语二）翻译：超市里的心理学',
    difficulty: 3, words: '整段，15 分', tags: ["消费","心理"],
    promptTextZh: '选段话题：超市如何利用心理学（布局、货架高度、气味、动线设计）促使顾客多买；了解这些"套路"有助于理性消费。',
    promptZh: '英语二翻译（整段英译汉，15 分）：超市如何利用心理学（布局、货架高度、气味、动线设计）促使顾客多买；了解这些"套路"有助于理性消费。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意名词化结构的展开（the use of... 译成动词更顺）","结尾\"有助于理性消费\"不要漏"]
  });

  BANK.push({
    id: 'q_en2_2017_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2017 年考研英语二 翻译（整段英译汉，15 分）', year: '2017 真题',
    title: '2017 真题（英语二）翻译：我的梦想（My Dream）',
    difficulty: 3, words: '整段，15 分', tags: ["成长","职业"],
    promptTextZh: '选段话题：作者自述梦想：本想学时装设计，自知难与有创造力的人竞争，转而选择新闻/写作，最终发现写作才是自己所爱。',
    promptZh: '英语二翻译（整段英译汉，15 分）：作者自述梦想：本想学时装设计，自知难与有创造力的人竞争，转而选择新闻/写作，最终发现写作才是自己所爱。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["第一人称叙事；注意 turn to / end up 的译法","\"发现所爱\"是落点"]
  });

  BANK.push({
    id: 'q_en2_2018_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2018 年考研英语二 翻译（整段英译汉，15 分）', year: '2018 真题',
    title: '2018 真题（英语二）翻译：比尔·盖茨一年读 50 本书',
    difficulty: 3, words: '整段，15 分', tags: ["阅读","人物"],
    promptTextZh: '选段话题：盖茨五年级就憧憬未来职业并大量阅读；成名后仍坚持阅读，每年至少读 50 本非虚构书籍，因为书能解释世界如何运转。',
    promptZh: '英语二翻译（整段英译汉，15 分）：盖茨五年级就憧憬未来职业并大量阅读；成名后仍坚持阅读，每年至少读 50 本非虚构书籍，因为书能解释世界如何运转。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["数字与频度（at least 50 books a year）要准确","how the world works 译\"世界如何运转\"帖切"]
  });

  BANK.push({
    id: 'q_en2_2019_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2019 年考研英语二 翻译（整段英译汉，15 分）', year: '2019 真题',
    title: '2019 真题（英语二）翻译：作家吉米·哈利与被低估的努力',
    difficulty: 3, words: '整段，15 分', tags: ["写作","人物"],
    promptTextZh: '选段话题：人们容易低估作家吉米·哈利：文风平易让人以为谁都能写，但他早年"尝试写作"并不容易；作品是多年练习、重写与阅读的成果，成功靠艰苦努力。',
    promptZh: '英语二翻译（整段英译汉，15 分）：人们容易低估作家吉米·哈利：文风平易让人以为谁都能写，但他早年"尝试写作"并不容易；作品是多年练习、重写与阅读的成果，成功靠艰苦努力。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意 take...for granted / underestimate 的译法","\"平易文风\"与\"多年练习\"的对比是重点"]
  });

  BANK.push({
    id: 'q_en2_2020_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2020 年考研英语二 翻译（整段英译汉，15 分）', year: '2020 真题',
    title: '2020 真题（英语二）翻译：从失败中学习',
    difficulty: 3, words: '整段，15 分', tags: ["成长","心态"],
    promptTextZh: '选段话题：人生难免失败；失败本身不可怕，关键在于我们如何解读——可选择把它当作学习经历，从中汲取教训、认识自己与真正的朋友。',
    promptZh: '英语二翻译（整段英译汉，15 分）：人生难免失败；失败本身不可怕，关键在于我们如何解读——可选择把它当作学习经历，从中汲取教训、认识自己与真正的朋友。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["议论类短文，注意 how we interpret it 的译法","\"认识真正的朋友\"这一层不要漏"]
  });

  BANK.push({
    id: 'q_en2_2021_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2021 年考研英语二 翻译（整段英译汉，15 分）', year: '2021 真题',
    title: '2021 真题（英语二）翻译：为什么应该和陌生人交谈',
    difficulty: 3, words: '整段，15 分', tags: ["社交","心理"],
    promptTextZh: '选段话题：与陌生人交谈虽令人不适，但研究显示能提升情绪与归属感；通勤中主动交流的人更快乐。',
    promptZh: '英语二翻译（整段英译汉，15 分）：与陌生人交谈虽令人不适，但研究显示能提升情绪与归属感；通勤中主动交流的人更快乐。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意 although 让步 + 转折的逻辑","findings suggest 译\"研究显示/表明\""]
  });

  BANK.push({
    id: 'q_en2_2022_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2022 年考研英语二 翻译（整段英译汉，15 分）', year: '2022 真题',
    title: '2022 真题（英语二）翻译：画画与创造性地解决问题',
    difficulty: 3, words: '整段，15 分', tags: ["艺术","思维"],
    promptTextZh: '选段话题：画画常不按计划实现，但意外结果有益：你会较快学会应对失望、随机应变、创造性地解决问题，这种能力在日常生活中很有用。',
    promptZh: '英语二翻译（整段英译汉，15 分）：画画常不按计划实现，但意外结果有益：你会较快学会应对失望、随机应变、创造性地解决问题，这种能力在日常生活中很有用。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意 not...as planned 的译法","\"随机应变\"可用成语式表达，但不要过度发挥"]
  });

  BANK.push({
    id: 'q_en2_2023_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2023 年考研英语二 翻译（整段英译汉，15 分）', year: '2023 真题',
    title: '2023 真题（英语二）翻译：诗歌的力量（The Power of Poetry）',
    difficulty: 3, words: '整段，15 分', tags: ["文学","文化"],
    promptTextZh: '选段话题：华兹华斯与浪漫主义颂扬自然；诗歌有力量，其节奏与选词能打动人；诗歌历史早于文字、与歌唱相关，朗诵时更生动也更易理解。',
    promptZh: '英语二翻译（整段英译汉，15 分）：华兹华斯与浪漫主义颂扬自然；诗歌有力量，其节奏与选词能打动人；诗歌历史早于文字、与歌唱相关，朗诵时更生动也更易理解。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["人名 Wordsworth 译\"华兹华斯\"","\"早于文字\"这种比较要译准"]
  });

  BANK.push({
    id: 'q_en2_2024_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2024 年考研英语二 翻译（整段英译汉，15 分）', year: '2024 真题',
    title: '2024 真题（英语二）翻译：从农场到餐桌（农贸市场）',
    difficulty: 3, words: '整段，15 分', tags: ["生活","农业"],
    promptTextZh: '选段话题：农贸市场是感官盛宴：能与种植者直接交流、支持本地经济、买到时令新鲜农产品；省去中间商后农户获利更多，消费者也知道钱流向谁。',
    promptZh: '英语二翻译（整段英译汉，15 分）：农贸市场是感官盛宴：能与种植者直接交流、支持本地经济、买到时令新鲜农产品；省去中间商后农户获利更多，消费者也知道钱流向谁。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["From Farm Gate to Plate 可译\"从农场到餐桌\"","\"中间商\"用 middlemen"]
  });

  BANK.push({
    id: 'q_en2_2025_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2025 年考研英语二 翻译（整段英译汉，15 分）', year: '2025 真题',
    title: '2025 真题（英语二）翻译：对话中的沉默为何令人不安',
    difficulty: 3, words: '整段，15 分', tags: ["心理","交流"],
    promptTextZh: '选段话题：对话中的沉默令人不安，人们担心冷场被负面解读；段落解释沉默的成因及其对交流的影响。',
    promptZh: '英语二翻译（整段英译汉，15 分）：对话中的沉默令人不安，人们担心冷场被负面解读；段落解释沉默的成因及其对交流的影响。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意 be interpreted negatively 的被动处理","\"沉默\"可用 silence / pause，译时区分"]
  });

  BANK.push({
    id: 'q_en2_2026_translation', category: 'real', subject: 'en2', kind: 'translation',
    source: '2026 年考研英语二 翻译（整段英译汉，15 分）', year: '2026 真题',
    title: '2026 真题（英语二）翻译：着装心理学',
    difficulty: 3, words: '整段，15 分', tags: ["心理","自我表达"],
    promptTextZh: '选段话题：衣着不只是遮体：它影响自我认知与他人互动，是自我表达（反映个性、心情、身份），也影响自信，并受文化与社会规范塑造。',
    promptZh: '英语二翻译（整段英译汉，15 分）：衣着不只是遮体：它影响自我认知与他人互动，是自我表达（反映个性、心情、身份），也影响自信，并受文化与社会规范塑造。',
    promptEn: "Translate the following text into Chinese. Write your translation on the ANSWER SHEET.",
    hints: ["注意 not merely / more than 的递进","\"受文化与社会规范塑造\"是结论层"]
  });

  /* ===================== 二、模拟题（原创） ===================== */


  var figA = '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<rect width="640" height="400" fill="#f7f4ee"/>' +
    '<rect x="0" y="300" width="640" height="100" fill="#e6dfd2"/>' +
    '<rect x="60" y="215" width="520" height="82" rx="16" fill="#b9c8d8"/>' +
    '<rect x="60" y="252" width="520" height="12" fill="#a3b4c6"/>' +
    '<rect x="40" y="280" width="36" height="26" rx="6" fill="#c9b79c"/>' +
    '<rect x="564" y="280" width="36" height="26" rx="6" fill="#c9b79c"/>' +
    '<circle cx="205" cy="148" r="30" fill="#f0d3b8" stroke="#8a7a68" stroke-width="3"/>' +
    '<path d="M182 132 q23 -22 46 0 q-8 -16 -23 -16 q-15 0 -23 16z" fill="#6b5b4b"/>' +
    '<rect x="170" y="178" width="72" height="62" rx="16" fill="#7d9a86" stroke="#5f7a68" stroke-width="3"/>' +
    '<rect x="188" y="196" width="40" height="58" rx="5" fill="#3c4653" stroke="#2b333d" stroke-width="3"/>' +
    '<rect x="193" y="203" width="30" height="44" rx="3" fill="#8fd0e8"/>' +
    '<path d="M196 200 q14 -40 34 -50" stroke="#7d9a86" stroke-width="10" fill="none" stroke-linecap="round"/>' +
    '<circle cx="435" cy="180" r="26" fill="#f0d3b8" stroke="#8a7a68" stroke-width="3"/>' +
    '<path d="M409 172 q4 -30 26 -30 q22 0 26 30 q-12 -14 -26 -14 q-14 0 -26 14z" fill="#5a4632"/>' +
    '<rect x="404" y="204" width="62" height="48" rx="14" fill="#d99a94" stroke="#b87b76" stroke-width="3"/>' +
    '<rect x="416" y="216" width="34" height="52" rx="5" fill="#3c4653" stroke="#2b333d" stroke-width="3"/>' +
    '<rect x="420" y="222" width="26" height="40" rx="3" fill="#ffd98a"/>' +
    '<path d="M438 216 q4 -34 16 -44" stroke="#d99a94" stroke-width="9" fill="none" stroke-linecap="round"/>' +
    '<circle cx="208" cy="228" r="34" fill="#8fd0e8" opacity="0.18"/>' +
    '<circle cx="433" cy="244" r="30" fill="#ffd98a" opacity="0.22"/>' +
    '<path d="M300 120 q10 -12 20 0 q10 -12 20 0" stroke="#9aa6b2" stroke-width="3" fill="none"/>' +
    '<text x="320" y="300" font-size="20" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">（两人背对背，各看各的屏幕，全程无对话）</text>' +
    '</svg>';

  BANK.push({
    id: 'q_mock_01_major', category: 'mock', kind: 'major',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2021—2022 年真题）', year: '模拟卷一',
    title: '最熟悉的陌生人：同桌各看手机',
    difficulty: 3, words: '160-200', tags: ['科技', '人际关系', '家庭'],
    figure: figA,
    promptTextZh: '两人坐在同一张沙发上，却各自盯着自己的手机屏幕，全程没有交流。',
    promptZh: '请根据图画写一篇 160—200 词的短文。要求：①简要描述图画内容；②解读图画寓意（家人近在咫尺，却被手机隔开）；③给出你的评论或建议。',
    promptEn: 'Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments.\n\nYou should write neatly on the ANSWER SHEET. (20 points)',
    hints: ['图画中出现两个人物但零互动，对比是写作重点', '注意 physical proximity 与 emotional distance 的对立表达']
  });

  BANK.push({
    id: 'q_mock_01_minor', category: 'mock', kind: 'minor',
    subject: 'en1',
    source: '模拟题（自制，风格对齐近年真题；注意与 2021 真题"推荐演讲人"不是同一道题）', year: '模拟卷一',
    title: '小作文：向社团推荐一位校外导师',
    difficulty: 3, words: '100', tags: ['书信', '推荐信'],
    promptZh: '你所在的创新创业社团正在筹备一系列面向低年级同学的入门工作坊，需要一位校外导师。请给社团负责人 Chris 写一封约 100 词的邮件：①推荐一位你了解的校外导师（可写所在单位与专长）；②说明推荐理由（与工作坊主题的契合度、带教经验）；③提出你对工作坊排期的建议。署名 Li Ming。',
    promptEn: 'Suppose you are a member of the Innovation and Entrepreneurship Club of your university. The club is planning a series of introductory workshops for first-year students and needs a mentor from outside the university. Write an email of about 100 words to Chris, the head of the club, to\n\n1) recommend a mentor you know about,\n2) explain why you recommend him or her, and\n3) suggest a schedule for the workshops.\n\nDo not use your own name; use "Li Ming" instead. (10 points)',
    hints: ['推荐信要点：对象、理由、建议，三段式', '结尾可用 I would be happy to help with the arrangements.']
  });

  BANK.push({
    id: 'q_mock_01_trans', category: 'mock', kind: 'translation',
    subject: 'en1',
    source: '外刊风格原创改写（城市生态评论，难度对齐 2010—2025 真题翻译）', year: '模拟卷一',
    title: '翻译：城市野化与"让自然回来"',
    difficulty: 3, words: '5 句，每句 2 分', tags: ['生态', '城市', '长难句'],
    promptZh: '阅读下面短文，将 5 个划线句译成中文，每句 2 分，共 10 分。注意后置定语、插入语与指代关系。',
    passage: 'For most of the past century, city planners treated nature as decoration: a few trees along a boulevard, a lawn that had to be mown and kept free of weeds. [1] That assumption is now being challenged by a generation of architects and ecologists who argue that the wildness once banished from the city should be invited back, not for its beauty alone, but for the services it quietly performs. [2] In Berlin, where abandoned railway yards have been left to seed themselves, researchers found that unmanaged plots supported nearly three times as many insect species as the manicured parks beside them. [3] Such findings, which surprise few biologists but unsettle many officials, suggest that the neatness long equated with good government may in fact be a form of poverty. [4] Cities that have begun to rewild, however cautiously, report benefits that no engineering project could have delivered at the same cost: cooler streets in summer, cheaper flood control, and a noticeable improvement in the mental health of residents who can walk to a meadow. [5] Whether this experiment survives the pressure of rising land values will depend less on ecology than on politics, for the question it raises is not what nature can do for cities but who has the right to decide what a city should look like.',
    sentences: [
      'That assumption is now being challenged by a generation of architects and ecologists who argue that the wildness once banished from the city should be invited back, not for its beauty alone, but for the services it quietly performs.',
      'In Berlin, where abandoned railway yards have been left to seed themselves, researchers found that unmanaged plots supported nearly three times as many insect species as the manicured parks beside them.',
      'Such findings, which surprise few biologists but unsettle many officials, suggest that the neatness long equated with good government may in fact be a form of poverty.',
      'Cities that have begun to rewild, however cautiously, report benefits that no engineering project could have delivered at the same cost: cooler streets in summer, cheaper flood control, and a noticeable improvement in the mental health of residents who can walk to a meadow.',
      'Whether this experiment survives the pressure of rising land values will depend less on ecology than on politics, for the question it raises is not what nature can do for cities but who has the right to decide what a city should look like.'
    ],
    hints: ['句 1 注意 not for...but for... 的并列与 it 的指代', '句 5 注意 Whether 主语从句 + depend less on A than on B 结构']
  });

  var figB = '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<rect width="640" height="400" fill="#faf6ec"/>' +
    '<rect x="0" y="312" width="640" height="88" fill="#eee3cd"/>' +
    '<rect x="470" y="40" width="130" height="110" rx="6" fill="#cfe6f2" stroke="#a8c2d2" stroke-width="3"/>' +
    '<path d="M535 40 v110 M470 95 h130" stroke="#a8c2d2" stroke-width="3"/>' +
    '<circle cx="500" cy="70" r="14" fill="#ffd97a"/>' +
    '<rect x="60" y="272" width="420" height="16" rx="5" fill="#c69a6b"/>' +
    '<rect x="72" y="288" width="14" height="34" fill="#b0834f"/>' +
    '<rect x="452" y="288" width="14" height="34" fill="#b0834f"/>' +
    '<rect x="300" y="238" width="120" height="34" rx="4" fill="#e2564f" stroke="#c33f38" stroke-width="2"/>' +
    '<circle cx="360" cy="255" r="11" fill="none" stroke="#fff0ec" stroke-width="3"/>' +
    '<path d="M340 255 h-14 M394 255 h14 M360 240 v-10 M360 270 v10" stroke="#fff0ec" stroke-width="3"/>' +
    '<path d="M268 250 l40 -22 M268 262 l40 22" stroke="#8e9aa6" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="262" cy="248" r="9" fill="none" stroke="#8e9aa6" stroke-width="4"/>' +
    '<circle cx="262" cy="264" r="9" fill="none" stroke="#8e9aa6" stroke-width="4"/>' +
    '<circle cx="150" cy="150" r="32" fill="#f5dcc2" stroke="#9c8a76" stroke-width="3"/>' +
    '<path d="M120 140 q6 -34 30 -34 q24 0 30 34 q-10 -16 -30 -16 q-20 0 -30 16z" fill="#e8e5df"/>' +
    '<path d="M126 176 q24 20 48 0 q-6 18 -24 18 q-18 0 -24 -18z" fill="#e8e5df"/>' +
    '<rect x="104" y="190" width="94" height="84" rx="18" fill="#5d7f9c" stroke="#456580" stroke-width="3"/>' +
    '<path d="M196 214 q30 16 60 -4" stroke="#5d7f9c" stroke-width="14" fill="none" stroke-linecap="round"/>' +
    '<circle cx="252" cy="212" r="11" fill="#f5dcc2" stroke="#9c8a76" stroke-width="3"/>' +
    '<circle cx="420" cy="196" r="24" fill="#f5dcc2" stroke="#9c8a76" stroke-width="3"/>' +
    '<path d="M398 188 q2 -26 22 -26 q20 0 22 26 q-10 -12 -22 -12 q-12 0 -22 12z" fill="#3f3125"/>' +
    '<path d="M394 208 q26 -18 52 0 l4 20 q-30 -14 -60 0z" fill="#3f3125"/>' +
    '<rect x="392" y="222" width="58" height="50" rx="14" fill="#e0a75e" stroke="#bd8845" stroke-width="3"/>' +
    '<path d="M392 236 q-26 12 -40 20" stroke="#e0a75e" stroke-width="12" fill="none" stroke-linecap="round"/>' +
    '<circle cx="348" cy="258" r="9" fill="#f5dcc2" stroke="#9c8a76" stroke-width="3"/>' +
    '<rect x="236" y="60" width="86" height="86" rx="6" fill="#fff" stroke="#d9c9ae" stroke-width="3"/>' +
    '<circle cx="279" cy="103" r="24" fill="none" stroke="#e2564f" stroke-width="4"/>' +
    '<path d="M279 79 v-8 M279 127 v8 M255 103 h-8 M303 103 h8 M262 86 l-6 -6 M296 86 l6 -6 M262 120 l-6 6 M296 120 l6 6" stroke="#e2564f" stroke-width="4" stroke-linecap="round"/>' +
    '<text x="320" y="360" font-size="20" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">（老人握着手教，女孩第一次剪出完整的"喜"字）</text>' +
    '</svg>';

  BANK.push({
    id: 'q_mock_02_major', category: 'mock', kind: 'major',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2019、2023 年真题主题）', year: '模拟卷二',
    title: '一剪一纸：老手艺与年轻人',
    difficulty: 3, words: '160-200', tags: ['传统文化', '传承', '代际'],
    figure: figB,
    promptTextZh: '一位老人正手把手教年轻女孩剪"喜"字，桌上放着红纸与剪刀，墙上挂着成品剪纸。',
    promptZh: '请根据图画写一篇 160—200 词的短文。要求：①描述图画内容；②说明图画所揭示的文化传承问题；③就"如何让传统手艺被年轻人接受"提出你的看法。',
    promptEn: 'Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) interpret its cultural implications, and\n3) give your comments on how traditional crafts can be passed on to the young.\n\nYou should write neatly on the ANSWER SHEET. (20 points)',
    hints: ['避免通篇喊口号，给出一个具体做法（如进校园、短视频、文创联名）', '可用 intangible cultural heritage（非物质文化遗产）等术语']
  });

  BANK.push({
    id: 'q_mock_02_minor', category: 'mock', kind: 'minor',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2022 年真题通知样式）', year: '模拟卷二',
    title: '小作文：写一则数据安全讲座通知',
    difficulty: 3, words: '100', tags: ['通知', '格式'],
    promptZh: '校学生会将举办一场面向全体学生的"个人信息与数据安全"讲座。请以学生会名义写一则通知（Notice），约 100 词：①讲座的时间、地点与主讲人；②讲座主要内容与实用价值；③报名方式或注意事项。落款用 The Student Union。',
    promptEn: 'The Student Union of your university is going to hold a lecture on personal information and data security. Write a notice in about 100 words to\n\n1) inform students of the time, place and speaker of the lecture,\n2) introduce the main contents and practical value of the lecture, and\n3) tell them how to sign up.\n\nDo not use your own name. Use "The Student Union" instead. (10 points)',
    hints: ['通知格式：居中标题 Notice、正文、落款单位与日期', '开头常用 In order to / A lecture will be held...']
  });

  BANK.push({
    id: 'q_mock_02_trans', category: 'mock', kind: 'translation',
    subject: 'en1',
    source: '外刊风格原创改写（共享经济社论，难度对齐真题翻译）', year: '模拟卷二',
    title: '翻译：共享经济未兑现的承诺',
    difficulty: 4, words: '5 句，每句 2 分', tags: ['经济', '社会', '长难句'],
    promptZh: '阅读下面短文，将 5 个划线句译成中文，每句 2 分，共 10 分。注意名词化结构、插入语与让步逻辑。',
    passage: 'When the first ride-sharing apps appeared, they were welcomed as a promise of liberation. Anyone with a car, it was said, could earn a living on his own schedule, and anyone without one could travel cheaply. [1] A decade later, that promise looks considerably less generous: the platforms that described themselves as marketplaces have turned out to be extraordinarily efficient machines for concentrating wealth in a handful of headquarters. [2] Drivers, classified as independent contractors rather than employees, bear the costs of fuel, insurance and depreciation while enjoying none of the protections that a regular wage normally brings. [3] What makes the arrangement so durable is not its fairness, which few defend, but the fact that customers have grown attached to prices that would be impossible if the true cost of the service were honestly calculated. [4] Regulators who have tried to intervene, whether by capping commissions or by reclassifying workers, have discovered that a company operating in hundreds of cities can move faster than any single legislature. [5] The real question, then, is not whether the sharing economy has failed — by most measures it has — but whether the convenience it created can be preserved without the exploitation that came with it.',
    sentences: [
      'A decade later, that promise looks considerably less generous: the platforms that described themselves as marketplaces have turned out to be extraordinarily efficient machines for concentrating wealth in a handful of headquarters.',
      'Drivers, classified as independent contractors rather than employees, bear the costs of fuel, insurance and depreciation while enjoying none of the protections that a regular wage normally brings.',
      'What makes the arrangement so durable is not its fairness, which few defend, but the fact that customers have grown attached to prices that would be impossible if the true cost of the service were honestly calculated.',
      'Regulators who have tried to intervene, whether by capping commissions or by reclassifying workers, have discovered that a company operating in hundreds of cities can move faster than any single legislature.',
      'The real question, then, is not whether the sharing economy has failed — by most measures it has — but whether the convenience it created can be preserved without the exploitation that came with it.'
    ],
    hints: ['句 3 是 What 主语从句 + not...but... 结构，注意 which few defend 的插入', '句 5 破折号中间是插入成分，先译主干再补插入']
  });

  var figC = '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<defs><linearGradient id="skyC" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#e8f0f7"/><stop offset="1" stop-color="#f8f4ea"/></linearGradient></defs>' +
    '<rect width="640" height="400" fill="url(#skyC)"/>' +
    '<circle cx="520" cy="86" r="34" fill="#ffd97a"/>' +
    '<path d="M0 300 q140 -60 250 -10 q120 54 200 -6 q90 -66 190 -16 v132 H0z" fill="#dbe6dd"/>' +
    '<rect x="150" y="296" width="300" height="34" rx="6" fill="#8fa9c2" stroke="#6d87a0" stroke-width="3"/>' +
    '<rect x="196" y="258" width="212" height="38" rx="6" fill="#c08a8a" stroke="#a06c6c" stroke-width="3"/>' +
    '<rect x="238" y="222" width="130" height="36" rx="6" fill="#e0b978" stroke="#bd9757" stroke-width="3"/>' +
    '<rect x="272" y="188" width="66" height="34" rx="6" fill="#8fbf9f" stroke="#6f9c7f" stroke-width="3"/>' +
    '<path d="M170 296 v34 M200 296 v34 M430 296 v34 M216 258 v38 M380 258 v38 M252 222 v36 M356 222 v36" stroke="#ffffff" stroke-width="2" opacity="0.6"/>' +
    '<circle cx="305" cy="164" r="18" fill="#ffd97a" opacity="0.55"/>' +
    '<circle cx="305" cy="162" r="9" fill="#ffec9e" stroke="#e0b040" stroke-width="2"/>' +
    '<path d="M305 172 v10" stroke="#9c8a76" stroke-width="3"/>' +
    '<path d="M283 150 q22 -26 44 0" stroke="#e0b040" stroke-width="3" fill="none"/>' +
    '<circle cx="352" cy="228" r="18" fill="#f5dcc2" stroke="#9c8a76" stroke-width="3"/>' +
    '<path d="M336 222 q4 -20 16 -20 q12 0 16 20 q-8 -10 -16 -10 q-8 0 -16 10z" fill="#3f3125"/>' +
    '<rect x="336" y="248" width="34" height="42" rx="10" fill="#5d7f9c" stroke="#456580" stroke-width="3"/>' +
    '<path d="M336 258 q-22 -18 -34 -34" stroke="#5d7f9c" stroke-width="10" fill="none" stroke-linecap="round"/>' +
    '<path d="M370 258 q22 -12 30 -26" stroke="#5d7f9c" stroke-width="10" fill="none" stroke-linecap="round"/>' +
    '<rect x="340" y="288" width="12" height="30" rx="5" fill="#4a5a6a"/>' +
    '<rect x="356" y="288" width="12" height="26" rx="5" fill="#4a5a6a"/>' +
    '<path d="M330 214 q-4 6 0 10 q4 -4 0 -10z" fill="#8fd0e8"/>' +
    '<path d="M470 240 v-70 M470 170 l-16 20 M470 170 l16 20" stroke="#8fa9c2" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<text x="320" y="372" font-size="20" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">（一格一格往上爬，山顶亮着灯）</text>' +
    '</svg>';

  BANK.push({
    id: 'q_mock_03_major', category: 'mock', kind: 'major',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2017、2020 年真题主题）', year: '模拟卷三',
    title: '书山有路：一格一格往上爬',
    difficulty: 2, words: '160-200', tags: ['教育', '成长', '奋斗'],
    figure: figC,
    promptTextZh: '一个学生沿着由书堆成的台阶向上攀爬，山顶亮着一盏灯。',
    promptZh: '请根据图画写一篇 160—200 词的短文。要求：①描述图画内容；②解释图画寓意；③谈谈你对"学习是一条需要一步步走完的长路"的看法。',
    promptEn: 'Write an essay of 160-200 words based on the following drawing. In your essay, you should\n\n1) describe the drawing briefly,\n2) explain its intended meaning, and\n3) give your comments on learning as a step-by-step journey.\n\nYou should write neatly on the ANSWER SHEET. (20 points)',
    hints: ['可参考 step by step / incremental progress / sustained effort 等表达', '结尾建议给出可操作的学习态度，而非空喊努力']
  });

  BANK.push({
    id: 'q_mock_03_minor', category: 'mock', kind: 'minor',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2018 年真题邮件样式）', year: '模拟卷三',
    title: '小作文：回复国际学生关于翻译项目的邮件',
    difficulty: 3, words: '100', tags: ['邮件', '回复信'],
    promptZh: '你收到国际学生 Anna 的邮件：她所在的社团想把一份英文研究摘要译成中文，希望你在翻译规范上给些建议，并询问你是否愿意帮他们校对。请回信约 100 词：①表示愿意提供帮助；②说明翻译时需要注意的两点（如术语统一、中文表达习惯）；③约定后续沟通方式。署名 Li Ming。',
    promptEn: 'You have received an email from Anna, an international student, who asks for your advice on translating an English research abstract into Chinese and wonders whether you could proofread it. Write an email of about 100 words to\n\n1) offer your help,\n2) point out two things that matter in translation, and\n3) suggest how to keep in touch.\n\nDo not use your own name; use "Li Ming" instead. (10 points)',
    hints: ['回信要有回应性：先回应对方请求，再提建议', '两点建议用 First... Second... 或 One thing to note is... 组织']
  });

  BANK.push({
    id: 'q_mock_03_trans', category: 'mock', kind: 'translation',
    subject: 'en1',
    source: '外刊风格原创改写（法律与科技评论，偏难）', year: '模拟卷三',
    title: '翻译：当算法作出决定，谁来解释',
    difficulty: 5, words: '5 句，每句 2 分', tags: ['法律', '人工智能', '长难句'],
    promptZh: '阅读下面短文，将 5 个划线句译成中文，每句 2 分，共 10 分。本卷句子结构较复杂，先划主干再动笔。',
    passage: 'A judge who sentences a defendant is expected to give reasons; an algorithm that decides who gets a loan or a job is under no such obligation. [1] This asymmetry, long tolerated because the systems involved were assumed to be objective, has begun to look less like a technical detail than a hole in the rule of law. [2] The difficulty is not that machines make mistakes — human decision-makers do so constantly — but that their errors are hard to detect, impossible to cross-examine and, when they recur, applied to thousands of people at once. [3] Courts in several countries have therefore started to insist that a decision reached with the help of an automated system must be explainable in terms that the person affected can understand and challenge. [4] What such a requirement will mean in practice is far from settled, since the firms that build these systems argue that the details are trade secrets, while the agencies that buy them often lack the expertise to inspect what they have purchased. [5] The most promising proposals shift the burden: instead of asking whether an algorithm is fair in general, they require those who deploy it to show, case by case, that the reasons given for a decision would survive scrutiny.',
    sentences: [
      'This asymmetry, long tolerated because the systems involved were assumed to be objective, has begun to look less like a technical detail than a hole in the rule of law.',
      'The difficulty is not that machines make mistakes — human decision-makers do so constantly — but that their errors are hard to detect, impossible to cross-examine and, when they recur, applied to thousands of people at once.',
      'Courts in several countries have therefore started to insist that a decision reached with the help of an automated system must be explainable in terms that the person affected can understand and challenge.',
      'What such a requirement will mean in practice is far from settled, since the firms that build these systems argue that the details are trade secrets, while the agencies that buy them often lack the expertise to inspect what they have purchased.',
      'The most promising proposals shift the burden: instead of asking whether an algorithm is fair in general, they require those who deploy it to show, case by case, that the reasons given for a decision would survive scrutiny.'
    ],
    hints: ['句 1 的 long tolerated... 是过去分词短语作后置定语，修饰 asymmetry', '句 5 冒号后是解释；those who deploy it 作 require 的宾语']
  });

  /* ============ 外刊长难句翻译专项（辅助训练，不打考研总分，归在模拟题类别） ============ */
  BANK.push({
    id: 'q_drill_01', category: 'mock', kind: 'drill',
    subject: 'en1',
    source: '外刊风格原创改写（The Economist 风格，科技与社会）', year: '专项训练',
    title: '长难句 01：学者为什么开始怀疑"高效"',
    difficulty: 4, words: '1 句，4 分', tags: ['专项', '长难句', '社会科学'],
    promptZh: '把下面这句译成中文（4 分）。先划出主干，再处理修饰成分。',
    passage: 'Scholars who spent their careers measuring the productivity of knowledge workers are now asking a question their training hardly prepared them for: whether the tools that were supposed to free such workers from routine tasks have instead filled their days with the very busywork the tools were meant to remove.',
    sentences: [
      'Scholars who spent their careers measuring the productivity of knowledge workers are now asking a question their training hardly prepared them for: whether the tools that were supposed to free such workers from routine tasks have instead filled their days with the very busywork the tools were meant to remove.'
    ],
    hints: ['主干：Scholars ... are now asking a question ...', '冒号后 whether 从句作 question 的同位语', 'the very busywork (that) the tools were meant to remove：省略关系词的定语从句']
  });

  window.__KAOYAN_QUESTIONS = BANK;
})();
