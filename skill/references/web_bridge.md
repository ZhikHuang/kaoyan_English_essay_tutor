# 网页数据桥接说明（web_bridge）

本文件定义"本地网页练习台"与 AI 之间的唯一数据契约。网页是**纯静态离线页面**（`index.html`，无服务器、无联网），通过 `<script src="data/state.js">` 读取数据；AI 通过写补丁文件回填批改结果。

## 一、文件布局

```
新建文件夹/
├─ index.html                 ← 网页（双击即可用）
├─ data/
│  ├─ state.js                ← 全局状态（题库 + 提交记录），网页启动时加载
│  ├─ questions.js             ← 题库（真题风格模拟题 + 外刊长难句专项），可选，网页加载后合并进 state
│  ├─ patches/                ← AI 写回的批改补丁，一题一文件（JS 形式，见第三节）
│  │   └─ sub_0001.js
│  └─ uploads/                 ← 手写作文图片（用户从网页"保存图片到 uploads"或用资源管理器放入）
└─ README.md                  ← 使用说明
```

## 二、`data/state.js` 结构

```js
window.__KAOYAN_STATE__ = {
  meta: { version: 3, updatedAt: "2026-02-14T10:30:00+08:00", examDate: "2026-12-19" },
  questions: [ /* 题目对象，见下 */ ],
  completions: [ /* 提交对象，见下 */ ]
};
```

### 题目对象 `questions[]`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✓ | 英语一真题 `q_real_2021_major`；**英语二真题 `q_en2_2021_major`**；模拟题 `q_mock_01_major`；专项 `q_drill_01`；用户自带题 `q_mine_001` 递增 |
| **`subject`** | string | ✓ | **科目**：`en1`（英语一）/ `en2`（英语二）。**每道题都要写**；缺省时网页按英语一处理，并按 id 前缀 `q_en2_` 兜底识别 |
| `category` | string | ✓ | **三类之一**：`real`(考研真题) / `mock`(模拟题) / `mine`(我的题目，用户自带)；网页按它分类展示 |
| `kind` | string | ✓ | `major`(大作文) / `minor`(小作文) / `translation`(翻译) / `drill`(长难句专项)。**满分随科目不同**：英语一 20/10/10；英语二 15/10/15 |
| `source` | string | ✓ | 来源，如 `模拟题（自制）` / `2021 年考研英语一 大作文（Part B，20 分）` / `2023 年考研英语二 翻译（15 分）` / `我自己上传的题目` |
| `year` | string | | 年份标签，如 `2021 真题` / `模拟卷一` / `我的题目` |
| `title` | string | ✓ | 中文标题，如「最熟悉的陌生人：同桌各看手机」 |
| `difficulty` | number | | 1—5 星 |
| `promptTextZh` | string | | 题干文字说明（真题图画/图表作文用：描述画面或图表内容，因为本站用自绘 SVG 代替真题原图） |
| `promptZh` | string | ✓ | 中文题目说明（写作/翻译要求的中文交代） |
| `promptEn` | string | | 英文题干原文（真题风格；`\n\n` 分段） |
| `words` | string | | 词数要求，如英语一 `160-200`、英语二 `150`、小作文 `100`、翻译可写 `整段，15 分` |
| `figure` | string | | SVG 字符串（内嵌示意图），图画/图表作文必填 |
| `passage` | string | | 翻译题英文原文/上下文（**英语二整段翻译放这里**） |
| `sentences` | string[] | | 英语一：5 个划线句；**英语二：整段按句拆开的版本**（便于逐句给采分点） |
| `hints` | string[] | | 提示（如「注意 it 为形式主语」；英语二翻译可注明「整段翻译，15 分」） |
| `tags` | string[] | | 主题标签，如 `["科技","人际关系"]` |

> 真题题目只写**题干与写作要求**，不写参考范文；模拟题与配图必须原创。
> 图库函数（`data/figures.js`）：图画用 `F.twoPanel / F.facing / F.crowd / F.phones / F.books / F.deskPerson`；图表用 `F.table / F.barChart / F.pieChart / F.pie2 / F.pieBar / F.twinBars / F.lineChart`。**不要发明库里没有的函数名**——那会让整份题库加载失败。

### 提交对象 `completions[]`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✓ | 形如 `sub_0001`（补丁文件名必须一致） |
| `questionId` | string | ✓ | 关联题目（**同一道题反复练时保持不变**，练习次数才统计得对） |
| `submittedAt` | string | ✓ | ISO 时间 |
| `essayText` | string | | 作文/译文正文（图片转录后也放这里） |
| `imagePath` | string | | `data/uploads/xxx.jpg`（手写照片相对路径） |
| `note` | string | | 用户附加要求（如"重点看时态"） |
| `status` | string | ✓ | `pending`(待批改) / `graded`(已批改) |
| `ownPrompt` | string | | **用户自带的题目原文**（网页「上传自己的题目」板块写入），AI 据此判重与归并 |
| `revises` | string | | **改稿关系**：这一篇是哪一篇的修改稿（填上一稿的提交 id）。网页据此把同一篇作文的多稿并排对比 |
| `draftGroup` | string | | 稿组标识，通常等于**第一稿的提交 id**；同一组的稿归为"同一篇作文" |
| `draftNo` | integer | | 第几稿（第一稿可省略，后续从 2 开始递增） |

> **批改时不要改动这些关联字段**；补丁只负责写 `status/gradedAt/grading`。若用户把一篇标成了修改稿，批改时可在 `summary` 里点出"这是第 N 稿，上一次的 X 问题已解决/仍存在"，但**不要**去改 `revises/draftGroup/draftNo`。

> 新提交由网页写入并保存在浏览器 localStorage；AI 也读取 `data/state.js` 中已有的 `completions`。
> 用户希望 AI 直接读到网页里的新提交时，让其点「错题与语言点库 → 导出本机提交 JSON」另存为 `data/pending_submissions.json` 并告知文件名；或直接粘贴作文。

### 同一篇作文的多稿（改稿链）

- 用户在网页提交时可选「6. 这一篇和这道题的关系 → 是某一篇的修改稿」，网页会自动写入 `revises/draftGroup/draftNo`。
- 同一 `draftGroup` 的所有稿 = 同一篇作文的多次修改；网页题库的「练习与改稿记录」面板会显示稿次，并提供「**总览对比**」把每稿的作文原文、得分、【必须修改】清单、复盘重点、修改后全文并排展示，还会自动比对"上一稿的问题是否已解决"。
- 用户若在对话里直接发来修改稿（例如"这是我按你的意见改的第三版"），**提醒他把该篇标为修改稿**（或在 `data/state.js` 里补 `revises/draftGroup/draftNo`），这样对比视图才连得起来；否则只能靠 `questionId` 归到同一道题下，无法并排对比。

### 题目判重与归并（AI 必做）

用户提供的题目（`ownPrompt` 有值，或直接粘在对话里）要按下列顺序处理：

1. 与 `data/questions.js` + `data/state.js` 里的 `real`/`mock` 题目比对题干（中英文都算）：题型一致、要点一致即视为**同一道题**。
2. **同一道题** → 不新建题目；把本次提交的 `questionId` 设为已有题目的 id，批改补丁照常写 `data/patches/sub_<id>.js`，并在对话里说明「已归并到《题名》，练习次数 +1」。
3. **新题** → 新建 `q_mine_00X`，写进 `data/state.js` 的 `S.questions`（或 `data/questions.js`），`category:"mine"`、`source:"我自己上传的题目"`，再让提交指向它。
4. 拿不准是否同一道题时**先问用户**，不要擅自归并或新建。
5. 网页侧用题干预计算相似度给出提示（覆盖率 + 二元组相似度），AI 侧以语义判断为准。

## 三、`data/patches/sub_<id>.js` 补丁结构

**必须写成 JS 形式**，因为用户在 `file://` 下双击打开网页时浏览器会拦截 `fetch()`；`<script>` 标签是唯一在本地文件模式下 100% 可靠的加载方式。

文件模板（整体照抄，只替换 `sub_0001` 与对象内容）：

```js
/* 批改补丁 sub_0001 —— 由 AI (kaoyan-english-tutor) 生成，网页自动加载 */
window.__KAOYAN_PATCHES = window.__KAOYAN_PATCHES || {};
window.__KAOYAN_PATCHES['sub_0001'] = {
  "id": "sub_0001",
  "status": "graded",
  "gradedAt": "2026-02-14T10:30:00+08:00",
  "grading": { /* 见下 */ }
};
```

等价的可选写法：`window.__KAOYAN_PATCHES['sub_0001'] = {...};`（对象字面量必须能被 JS 解析，因此**字符串里的引号要转义**，不能有尾逗号、不能有 `//` 注释以外的杂项）。
若同时提供 `data/patches/sub_0001.json`，网页只在 http(s) 模式下读取；**本地文件模式下只认 `.js`**，所以务必写 `.js`。

### 通用 `grading` 字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `score` | number | 得分（大作文 /20、小作文 /10、翻译 /10、专项按 `fullScore`） |
| `fullScore` | number | 满分，如 20 / 10 / 10 |
| `band` | string | 档位描述，如 `13-16 分档`；专项写 `长难句专项（非考研总分）` |
| `wordCount` | number | 统计词数 |
| `wordCountNote` | string | 词数是否符合要求 |
| `summary` | string | 整体评价 2—4 句（含定档依据） |
| `dimensions` | array | `[{name, level, comment}]`；大作文：内容与审题 / 语言准确性与丰富性 / 结构与衔接；小作文：内容要点 / 格式与文体 / 语言与衔接；翻译：准确性 / 完整性 / 中文通顺 |
| `sentenceNotes` | array | 逐个句子批改（大作文、小作文必填；翻译可用 `sentences` 代替） |
| `sentences` | array | 翻译题逐句批改，5 个元素 |
| `revisedEssay` | string | 修改后全文；主要修改处用 `**加粗**`；段落间 `\n\n` |
| `revisedWordCount` | number | 修改后词数 |
| `expressions` | array | `[{phrase, meaning, usage}]` 3—5 条积累 |
| `review` | object | `{priority: [3 条], framework: "段落思路与句式框架"}` |
| `structureNotes` | string | 长难句专项：主干与结构图解（纯文本，可用缩进/箭头） |
| `typoDeduction` | number | 翻译错别字扣分 |
| `totalScore` | number | 翻译总分（与 `score` 一致） |

### `sentenceNotes[]` 元素

```json
{ "original": "原文句", "level": "must", "issue": "问题描述",
  "revised": "修改句", "explain": "中文解释：错在哪→为什么错→怎么改→如何自查" }
```
- `level` 只能是 `must`（必须修改）/ `optional`（可选优化）/ `ok`（可保留，`issue` 可空）。
- `cat`（可选，string）：错误类别，用于错题库归类。可填：`主谓一致` / `时态与语态` / `名词与冠词` / `词性与搭配` / `从句与句法` / `代词与指代` / `拼写与标点` / `内容与审题` / `结构与衔接` / `其他`。省略时网页会用 `issue`+`explain` 做关键词匹配，**建议显式填写**以便归库准确。

### `sentences[]` 元素（翻译）

```json
{ "no": 1, "original": "划线句英文", "score": 1.5,
  "points": [{ "en": "英文片段", "meaning": "应表达的意思", "score": 0.5, "got": 0.5 }],
  "errors": ["关键词含义/主干/修饰与指代问题"],
  "revised": "修改译文",
  "comment": "可选的补充说明（如错别字、语序）" }
```

## 四、写作规范（AI 侧）

1. 用 write 工具写补丁文件 `data/patches/sub_<id>.js`，**UTF-8 无 BOM**，内容必须是合法 JS（对象字面量里不能有尾逗号；中文引号不要写成 `“”`；`\n` 用转义的 `\\n` 表示换行；SVG 字符串里的引号要转义）。
2. 一次批改只写自己那一个补丁文件；**绝不重写整个 `state.js`**，以免覆盖用户草稿。
3. 对话输出与补丁内容必须一致（分数、修改句、表达积累不允许只落盘不展示）。
4. 写完后向用户报告：题号、得分、补丁文件路径，并提示"网页会在 8 秒内自动刷新"。
5. 若用户要求修正历史批改，改写对应补丁文件即可，网页会以补丁为准覆盖同 id 结果。
6. 每写完一个补丁，用一条命令做语法自检（避免整页挂掉）：
   `node -e "global.window={}; require('...绝对路径/sub_0001.js'); console.log(Object.keys(window.__KAOYAN_PATCHES))"`
   若报错说明补丁写坏了，立即修正。

## 五、网页刷新机制与题库更新

- 网页每 8 秒自动重新注入 `data/state.js`、`data/questions.js` 与 `data/patches/sub_*.js`（`<script>` 标签 + 时间戳防缓存），检测到新补丁即更新，无需手动操作；也可点右上角「重新加载数据」。
- **题库合并规则**：页面把 `state.js` 的 `questions` 与 `questions.js` 的 `window.__KAOYAN_QUESTIONS` **合并后按 id 去重**（同 id 以 `state.js` 优先），再叠加「我的题目」。因此**追加新真题/模拟题只需写 `data/questions.js`，不必同步改 `state.js`**。
- **补丁探测范围是动态的**：页面按"已见到的最大提交编号 + 8"生成探测清单（`rebuildPatchIds()`）。练到第 30、50 篇都不会漏补丁，无需改代码；但补丁文件名必须严格是 `sub_<四位数>.js`（如 `sub_0025.js`），否则探测不到。
- **题库更新规则（AI 侧必须遵守）**：
  1. **只增不改**：新题追加到文件末尾，不修改已有题目对象。
  2. **id 终身不变**：`q_real_2021_major` / `q_mock_01_major` / `q_mine_001` 一旦分配不得更改，因为提交、练习次数、补丁都靠 id 关联。
  3. **写入位置**：真题与模拟题 → `data/questions.js`（`window.__KAOYAN_QUESTIONS = BANK`）；用户自带的题 → `data/state.js` 的 `S.questions`，`category:""mine""`，id 用 `q_mine_001` 递增。
  3b. **分科目**：每条题目都要写 `subject`（`en1`/`en2`）。英语二真题 id 用 `q_en2_<年份>_major`（图表大作文 15 分）/ `_minor`（小作文 10 分）/ `_translation`（整段英译汉 15 分）。
  3c. **一键更新要覆盖两个科目**：「一键更新题库」按科目分别检查缺失年份（英语一缺某年就补英语一那年的题，英语二缺某年就补英语二那年的题），并把结果分别写入 `questions.js`。
  4. **查重优先**：加题前先搜题库里是否已有同一道题（题干相似、题型一致、要点一致即算同一道）；同一道题**不新建**，把提交的 `questionId` 指向已有题目即可。
  5. **新增真题**：`category:"real"`、`year:"20XX 真题"`、`source` 写明"20XX 年考研英语一 大/小作文（A/B 节，X 分）"；图画用自绘 SVG（`figure`）并在 `promptTextZh` 里描述真题画面；**不写参考范文**。
  6. **新增模拟题**：`category:"mock"`、`year:"模拟卷N"`，风格对齐近年真题并原创，图画必须配内嵌 SVG。
- 用户在网页里的新草稿存在 localStorage；与文件数据合并规则：**同 id 以补丁（已批改）优先，未批改的以 localStorage 草稿优先**。
- 若用户希望 AI 直接读到网页里的新提交，让其点「错题与语言点库 → 导出本机提交 JSON」，另存为 `data/pending_submissions.json` 并告知 AI；AI 读取该文件即可拿到 `completions[]`（结构与 `state.js` 一致）。

## 六、补丁生成检查清单

- [ ] `id` 与补丁文件名、`state.js` 中的提交 id 完全一致，文件名是 `sub_XXXX.js`
- [ ] 文件以 `window.__KAOYAN_PATCHES = window.__KAOYAN_PATCHES || {};` 开头
- [ ] `status:"graded"`、`gradedAt` 为 ISO 时间
- [ ] `score` ≤ `fullScore`，`revisedWordCount` 与 `revisedEssay` 实际词数接近
- [ ] 所有 `level` 值合法；`sentenceNotes` 覆盖了原文每个有问题的句子
- [ ] `review.priority` 恰好 3 条且每条含可执行练习建议
- [ ] 语法自检命令已跑通（见第四节第 6 条）
