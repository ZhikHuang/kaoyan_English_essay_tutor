/* 模拟题与长难句专项的数据源（原创题目，与考研真题无关）。
 * 生成器 tools/gen-questions.js 只读这个文件 + 真题数据源，不再读自己的产物 data/questions.js。
 * 想加一道模拟题：直接在这里并按同样格式追加一个 PUSH({...}) 即可，然后运行 node tools/gen-questions.js。
 */
'use strict';

const LIST = [];
function PUSH(q){ LIST.push(q); }
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

  PUSH({
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

  PUSH({
    id: 'q_mock_01_minor', category: 'mock', kind: 'minor',
    subject: 'en1',
    source: '模拟题（自制，风格对齐近年真题；注意与 2021 真题"推荐演讲人"不是同一道题）', year: '模拟卷一',
    title: '小作文：向社团推荐一位校外导师',
    difficulty: 3, words: '100', tags: ['书信', '推荐信'],
    promptZh: '你所在的创新创业社团正在筹备一系列面向低年级同学的入门工作坊，需要一位校外导师。请给社团负责人 Chris 写一封约 100 词的邮件：①推荐一位你了解的校外导师（可写所在单位与专长）；②说明推荐理由（与工作坊主题的契合度、带教经验）；③提出你对工作坊排期的建议。署名 Li Ming。',
    promptEn: 'Suppose you are a member of the Innovation and Entrepreneurship Club of your university. The club is planning a series of introductory workshops for first-year students and needs a mentor from outside the university. Write an email of about 100 words to Chris, the head of the club, to\n\n1) recommend a mentor you know about,\n2) explain why you recommend him or her, and\n3) suggest a schedule for the workshops.\n\nDo not use your own name; use "Li Ming" instead. (10 points)',
    hints: ['推荐信要点：对象、理由、建议，三段式', '结尾可用 I would be happy to help with the arrangements.']
  });

  PUSH({
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

  PUSH({
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

  PUSH({
    id: 'q_mock_02_minor', category: 'mock', kind: 'minor',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2022 年真题通知样式）', year: '模拟卷二',
    title: '小作文：写一则数据安全讲座通知',
    difficulty: 3, words: '100', tags: ['通知', '格式'],
    promptZh: '校学生会将举办一场面向全体学生的"个人信息与数据安全"讲座。请以学生会名义写一则通知（Notice），约 100 词：①讲座的时间、地点与主讲人；②讲座主要内容与实用价值；③报名方式或注意事项。落款用 The Student Union。',
    promptEn: 'The Student Union of your university is going to hold a lecture on personal information and data security. Write a notice in about 100 words to\n\n1) inform students of the time, place and speaker of the lecture,\n2) introduce the main contents and practical value of the lecture, and\n3) tell them how to sign up.\n\nDo not use your own name. Use "The Student Union" instead. (10 points)',
    hints: ['通知格式：居中标题 Notice、正文、落款单位与日期', '开头常用 In order to / A lecture will be held...']
  });

  PUSH({
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

  PUSH({
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

  PUSH({
    id: 'q_mock_03_minor', category: 'mock', kind: 'minor',
    subject: 'en1',
    source: '模拟题（自制，风格对齐 2018 年真题邮件样式）', year: '模拟卷三',
    title: '小作文：回复国际学生关于翻译项目的邮件',
    difficulty: 3, words: '100', tags: ['邮件', '回复信'],
    promptZh: '你收到国际学生 Anna 的邮件：她所在的社团想把一份英文研究摘要译成中文，希望你在翻译规范上给些建议，并询问你是否愿意帮他们校对。请回信约 100 词：①表示愿意提供帮助；②说明翻译时需要注意的两点（如术语统一、中文表达习惯）；③约定后续沟通方式。署名 Li Ming。',
    promptEn: 'You have received an email from Anna, an international student, who asks for your advice on translating an English research abstract into Chinese and wonders whether you could proofread it. Write an email of about 100 words to\n\n1) offer your help,\n2) point out two things that matter in translation, and\n3) suggest how to keep in touch.\n\nDo not use your own name; use "Li Ming" instead. (10 points)',
    hints: ['回信要有回应性：先回应对方请求，再提建议', '两点建议用 First... Second... 或 One thing to note is... 组织']
  });

  PUSH({
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
  PUSH({
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
module.exports = { questions: LIST };
