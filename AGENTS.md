# AGENTS.md —— 给 AI 智能体（Codex / Cursor / Claude Code / DSH 等）的工作说明

本仓库是一个**考研英语（一）（二）作文练习台**：静态网页负责写作与查看，AI 负责批改，两者通过本地文件交换数据。
你（智能体）在这里的核心职责只有两件事：**批改作文** 与 **更新题库**。请严格按下面的约定操作。

---

## 一、先读批改标准

批改前**必须完整读取**：

1. `skill/SKILL.md` —— 总入口：执行流程、**科目与题型路由**、通用守则
2. **先确认科目**（英语一 / 英语二），再按题型读对应文档：

   | 科目 + 题型 | 文档 | 满分 / 词数 |
   |---|---|---|
   | 英语一 · 大作文（图画或图表） | `skill/references/english1_essay_major.md` | 20 分 / 160—200 词 |
   | 英语一 · 小作文 | `skill/references/english1_essay_minor.md` | 10 分 / 约 100 词 |
   | 英语一 · 翻译（5 个划线句） | `skill/references/english1_translation.md` | 10 分 / 每句 2 分 |
   | **英语二 · 大作文（图表作文）** | `skill/references/english2_essay_major.md` | **15 分 / 约 150 词** |
   | **英语二 · 小作文（应用文）** | `skill/references/english2_essay_minor.md` | 10 分 / 约 100 词 |
   | **英语二 · 翻译（整段英译汉）** | `skill/references/english2_translation.md` | **15 分** |
   | 外刊长难句专项（两科通用） | `skill/references/translation_long_sentence.md` | 不计考研总分 |

   - 英语一大作文注意：**2010—2023 是图画作文；2024 是图画+柱状图；2025 是表格；2026 是双图表**。先看题干是 `drawing` 还是 `chart`，再看文件里第 6 节（图画）/ 第 6B 节（图表）两套检查清单。
   - **科目判断依据**：题目 `subject` 字段（`en1`/`en2`）、id 前缀（`q_en2_*` 为英语二）、或题目 Directions。拿不准先问用户，**不要用英语一的满分（20/10/10）去批英语二**。
3. 数据格式与字段契约 → `skill/references/web_bridge.md`（**写文件前必读**）

> 用户如果用 DSH：`skill/` 的内容也会被安装到 `~/.dsh/skills/kaoyan-english-tutor/`，可直接加载。

---

## 二、批改任务的标准流程

1. 读 `app/data/state.js`，找 `completions` 里 `status: "pending"` 的提交（网页里新提交可能存在浏览器 localStorage，若文件里没有，请让用户导出或直接粘贴作文）。
2. 按 `questionId` 到 `app/data/questions.js`（或 `state.js` 的 `questions`）取题目与写作要求。
3. 按对应标准文档批改，输出：整体评价与评分 → 逐句批改 → 修改后全文 → 表达积累 → 复审建议。
4. **按 `web_bridge.md` 的契约写补丁**：`app/data/patches/sub_<编号>.js`，格式为

   ```js
   window.__KAOYAN_PATCHES = window.__KAOYAN_PATCHES || {};
   window.__KAOYAN_PATCHES['sub_0003'] = { id:'sub_0003', status:'graded', gradedAt:'<ISO 时间>', grading:{ … } };
   ```

   必须是 **`.js`**（网页在 `file://` 下无法 fetch JSON），UTF-8 无 BOM，字段与分值必须自洽。
5. 写完运行 `node app/tools/validate.js`，确认无 FAIL。
6. 告知用户：得分、补丁路径、网页会在 8 秒内自动刷新。

**不要做的事**：不要重写整个 `state.js`（会覆盖用户草稿）；不要删除用户的提交或补丁；不要改动补丁里的 `revises / draftGroup / draftNo`（那是改稿链的关联字段）。

---

## 三、题目归类与判重（重要）

题库分三类：`real`（考研真题）/ `mock`（模拟题）/ `mine`（用户自带）。

用户提供的题目（`ownPrompt` 有值，或直接粘在对话里）必须先与题库比对：

- **是同一道题** → 不新建题目，把提交的 `questionId` 指向已有题目的 id，练习次数自然 +1；
- **确实是新题** → 新建到 `mine` 类（id 用 `q_mine_001` 递增），写入 `app/data/state.js` 的 `questions`；
- **拿不准** → 先问用户，不要擅自判重。

---

## 四、题库更新任务（每年 12 月后）

触发方式：用户在网页点「一键更新题库」，或对你说「联网更新题库，补齐 20XX 年」。

**必须同时覆盖英语一与英语二**：

| 科目 | 每年要补的题 | id 规则 |
|---|---|---|
| 英语一 | 大作文（20 分）+ 小作文（10 分） | `q_real_<年份>_major` / `_minor` |
| 英语二 | **图表**大作文（15 分）+ 小作文（10 分）+ 整段翻译（15 分） | `q_en2_<年份>_major` / `_minor` / `_translation` |

要求：

1. 用联网搜索查明目标年份两科的真实题目；**每年交叉核对 2—4 个来源**，查不到就如实说"查不到"，**不要编造**。注意区分两科（英语一大作文是图画/图表；英语二大作文是图表；英语二翻译是整段而非划线句）。
2. **写进数据源，不要手工改产物**：`app/data/questions.js` 是生成器产出物，手改会在下次生成时被丢弃。真题写数据源（英语一 → `app/tools/gen-questions.js` 的 `MAJOR`/`MINOR`；英语二 → `app/tools/en2-data.js` 的 `EN2_MAJOR`/`EN2_MINOR`/`EN2_TRANS`），模拟题与长难句专项写 `app/tools/mock-data.js`，然后运行 `node app/tools/gen-questions.js` 重新生成。每条都要有 `subject`（`en1`/`en2`）、`category:"real"`、`kind`、`year`、`title`、`source`、`promptZh`、`promptTextZh`、`promptEn`、`hints`、`tags`；英语二翻译还必须给 `passage`（英文原文）与按句拆分的 `sentences`。
   图表用现成函数：`F.barChart / F.table / F.pieChart / F.pie2 / F.pieBar / F.twinBars / F.lineChart`；英语一图画用 `F.twoPanel / F.facing / F.crowd / F.phones`。
3. **只增不改**：不要改已有年份的题目或其 id。
4. **不要发明图库里没有的函数名**；若确需新图型，必须同时在 `app/data/figures.js` 里定义并挂到 `window.__KAOYAN_FIG`——否则整个题库文件会执行中断，网页一道题都读不出来。
5. 写完运行 `node app/tools/validate.js`（必要时加 `--report`），确认输出"结果：全部通过"（它会分别检查两科 2010—2026 的完整性，并拦住"英语二翻译缺英文原文"）。
6. 报告：两科各新增了哪几年哪几道题、来源链接、哪些细节不确定。

---

## 五、硬性约束

- **只改该改的文件**：批改只写 `app/data/patches/`；更新题库只改 `app/data/questions.js`（必要时 `figures.js`）。不要顺手重构网页或工具脚本。
- **不要动这些**：`app/index.html` 的既有逻辑、`app/tools/validate.js` 的既有检查项、用户的 `uploads/` 与既有补丁。
- **绝对不联网**在任何其它场景：只有「更新题库」这一个任务需要联网检索。
- **不代写冒充**：可以给句式和参考范文，但要标注"参考范文，勿直接背诵套用"。
- 中英文约定：用中文讲解，英文呈现原句 / 修改句 / 修改后全文。

---

## 六、环境与命令速查

| 目的 | 命令 |
|---|---|
| 安装与自检 | `node install.js` |
| 打开网页 | 双击 `app/index.html` |
| 一次性批改 | `node tools/grade-once.js`（`--agent codex` 可换智能体，`--cmd "…{task}"` 自定义） |
| 更新题库 | `node tools/grade-once.js --update 2027` |
| 常驻服务（网页按钮） | `node app/tools/grade-helper.js` |
| 校验数据与页面 | `node app/tools/validate.js --report` |
| 重新生成题库 | `node app/tools/gen-questions.js`（`--max-year 2020` 可只生成到某年） |
