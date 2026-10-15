# 考研英语一 · 外刊长难句翻译专项训练模块

> 定位：**日常能力训练**模块，不打考研总分。用星级难度（★1—★5）与「采分点得分率」反馈，
> 专治"翻译基础薄弱、句子一长就散架"的问题。与 `english1_translation.md`（真题划线句 5×2 分模式）互为补充。

---

## 1. 适用场景

**加载本模块的触发语**（用户说出任意一条即加载）：

- "练长难句翻译" / "长难句专项"
- "外刊句子翻译" / "经济学人句子" / "卫报句子"
- "翻译专项训练" / "翻译基础不好，从句子练起"
- "帮我拆句子" / "句子结构分析 + 翻译"

**与 `english1_translation.md` 的分工（必须区分，不得混用打分口径）：**

| 维度 | 本模块（长难句专项） | `english1_translation.md`（真题模式） |
|---|---|---|
| 目的 | 日常能力训练、结构识别与表达打磨 | 真题实战、折算考研分数 |
| 计分 | **采分点得分率**（如 3.5/4 = 87.5%） | 5 句 × 2 分 = 10 分，计入总分 |
| 难度标尺 | ★1—★5 星级 | 真题年份难度自然分层 |
| 落盘 | `data/patches/sub_<id>.json`，`partial:true` | `data/patches/sub_<id>.json`，完整真题结构 |
| 网页显示 | "专项训练"标签 | "真题翻译" |

**硬规则**：本模块**绝不打考研总分**。`fullScore` 只表示该句的采分点满分（通常 3—5 分），
禁止出现"本次得分计入总分 X/10"这类表述。
唯一例外：若用户当次明确要求按真题 5 句 20 分模式练，则**改按 `english1_translation.md` 的结构落盘**，不套用本模块的 `partial:true`。

**默认训练量**：一次 1—3 句。单句精拆优先于数量堆砌；用户说"来一组"时给 3 句（难度递增 ★3→★4→★5 或按用户指定）。

---

## 2. 语料标准（后续选材共用，必须遵守）

### 2.1 来源类型

- **外刊社论与科普**：The Economist、The Times、The Guardian、The New Yorker、Scientific American、Nature 等。
- **考研英语一真题翻译的长难句风格**（2010—2025 年真题偏爱题材）：
  - 社会科学评论（社会心态、教育公平、城市化副作用）
  - 学术书评（对某本著作的评价、反驳、方法论批评）
  - 生态与城市规划（绿地、通勤、环境政策的权衡）
  - 法律与媒体（言论边界、隐私、新闻伦理）
- 真题**只用于难度与风格校准**，不作为句子来源。

### 2.2 句法难度门槛

- **长度**：35—60 词（低于 35 词练不出结构，高于 60 词偏折磨，除非用户主动要 ★5 极限句）。
- **必须含至少 2 类**下列结构（在 `hints` 或批改中标注命中了哪几类）：

| 结构类型 | 识别特征 |
|---|---|
| 多重后置定语 / 分词短语 | of which、现在分词/过去分词作定语连挂 |
| 名词性从句 | that/what/whether 引导主/宾/表/同位语从句 |
| 非限制性定语从句 | , which / , who 补充说明整句或整段 |
| 让步 / 条件状语从句嵌套 | although…, even if…, provided that… 套在主句与从句之间 |
| 倒装或强调结构 | Not until… did…；It is X that…；only when… |
| it 形式主语 / 形式宾语 | It is tempting to…；make it clear that… |
| 插入语 | 双破折号、双逗号切断主干 |
| 指代链 | it/they/this/that/such 跨句回指 |

### 2.3 原创性（版权红线）

- **绝对不得直接复制真题原句**。
- 须为**原创或改写拼接**：可重组真题的句法骨架（如"让步从句 + it 形式主语 + 非限制性定语从句"），
  但填充内容、用词、指代对象必须更换。
- 改写时**保留真题的句法难度**——降难度到简单句视为不合格选材。
- 外刊句子同样不得逐字照搬整段；引用式短句需改写为等难度的近似句。

---

## 3. 题目呈现格式

每条练习在对话中以下列字段呈现（字段名与 `data/questions.js` 一致，便于并入网页题库）：

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 形如 `sub_0004`，四位递增，全局唯一 |
| `sourceType` | string | 外刊类型 / 真题风格，如 `"The Economist 社论风格"`、`"真题风格·生态与城市规划"` |
| `topic` | string | 主题，如 `"城市绿地与心理健康"` |
| `difficulty` | number | 1—5，对应 ★1—★5 |
| `sentence` | string | 英文原句（35—60 词） |
| `context` | string | 1—2 句背景，专为解释指代而写（this/they 指向什么） |
| `hints` | string[] | 可选，1—2 条提醒，如 `"注意 it 为形式主语"` |

**呈现示例（对话中）：**

```
【sub_0004】★★★☆☆  来源：The Guardian 社论风格 · 主题：城市绿地与心理健康

句子：
  It is tempting to treat urban greening as a purely aesthetic concern, yet the
  evidence now accumulating — much of it from longitudinal studies that tracked
  residents across a decade — suggests that access to parks, however modest,
  shapes mental health outcomes as reliably as income does.

背景：
  讨论城市规划预算之争。this/它 指"把城市绿化当纯美学问题"这一立场；
  "the evidence" 指下文的纵向研究。

提示：
  ① 注意 It 为形式主语，真主语是 to treat… 不定式。
  ② however modest 是让步状语从句的省略形式（= however modest it is）。
```

若并入网页题库，**统一写进 `data/questions.js` 的 `translationDrills` 数组**。
`translationDrills` 是题库的**专用分类容器**；问答/批改链路仍以 `web_bridge.md` 的题目对象为准
（`kind:"drill"`）。落盘时把下列字段**同步为 `web_bridge.md` 规定的题目对象字段**：

| 本模块字段 | 网页题库字段（`data/questions.js` → `state.questions`） |
|---|---|
| `id` | `id`，题库内改为 `q_drill_01` 形式；`sub_*` 只用于提交与补丁 |
| （固定） | `kind: "drill"` |
| `sourceType` | `source`（如 `"The Guardian 社论风格改写"`） |
| `topic` | `title`（中文标题）+ `tags`（主题标签） |
| `difficulty` | `difficulty`（1—5） |
| `sentence` + `context` | `promptZh`（中文题目说明，含背景）＋ `passage`（英文原句与背景） |
| `hints` | `hints` |
| — | `year` 可省略（专项练习无年份） |

```js
// data/questions.js
export const translationDrills = [
  {
    id: "q_drill_01",                 // 题库 id（sub_* 留给提交与补丁）
    kind: "drill",                    // 长难句专项固定值
    source: "The Guardian 社论风格改写",
    title: "城市绿地与心理健康",
    difficulty: 3,
    promptZh: "翻译下列长难句。背景：讨论城市规划预算之争；"
            + "「它」指把城市绿化当纯美学问题这一立场，「the evidence」指下文的纵向研究。",
    passage: "It is tempting to treat urban greening as a purely aesthetic concern, ...",
    hints: ["注意 It 为形式主语", "however modest 是让步状语从句的省略形式"],
    tags: ["城市规划", "公共卫生"]
  }
];
```

> 本模块的 `sourceType` / `topic` / `sentence` / `context` 四个字段名**只用于对话呈现**，
> 便于逐句讲解时字段清晰；写进题库时必须按上表映射，不得原样塞入 `questions[]`。

---

## 4. 批改输出要求（对话中呈现，七项齐全）

批改必须按 ① — ⑦ 顺序输出，缺项视为不合格批改。

### ① 句子主干与结构图解

- 用**文字**标出主语 / 谓语 / 宾语（无需画图工具）。
- 从句用**缩进**表示挂载关系（谁修饰谁、挂在哪一层）。

```
主句：It is tempting … , yet the evidence suggests that …
  主语：It（形式主语）
  谓语：is
  表语：tempting
  真主语：to treat urban greening as a purely aesthetic concern（不定式）
  ├─ 并列连词 yet 引出转折分句
  │   主语：the evidence（后置定语：now accumulating）
  │   插入语：— much of it from longitudinal studies … —
  │       └─ 定语从句：that tracked residents across a decade
  │   谓语：suggests
  │   宾语从句：that access to parks … shapes mental health outcomes
  │       ├─ 让步状语（省略）：however modest
  │       └─ 比较状语：as reliably as income does
```

### ② 指代与逻辑关系说明

- 逐个交代 `it / they / this / that / such / one` 指什么（回指哪个名词、短语还是整句）。
- 交代 `but / however / yet / while / although` 的逻辑：是**转折对比**还是**让步**，让步时"退一步要承认什么"。
- 说明省略结构还原（如 `however modest` → `however modest it is`）。

### ③ 3—4 个采分点表

| # | 英文片段 | 应表达的意思 | 分值 | 我的得分 |
|---|---|---|---|---|
| 1 | `It is tempting to treat … as …` | （参考译法） | 1 | — |
| 2 | `much of it from longitudinal studies` | （参考译法） | 1 | — |
| 3 | `however modest` | （参考译法） | 0.5 | — |
| 4 | `as reliably as income does` | （参考译法） | 1.5 | — |

- 分值之和 = `fullScore`（通常 3—5 分），按结构难度与信息量分配，**不要平均切分**。
- "我的得分"按用户实际译文逐点判定（满分 / 部分分 / 0 分），部分分需写清扣在哪里。

### ④ 错误分析

按四类归档，并**明确区分"真正错误"与"可选优化"**：

- **误译**（意思跑偏、逻辑反了）
- **漏译**（片段整块没译）
- **语序问题**（英文语序直搬，中文读不通）
- **搭配与选词**（中文搭配不当、术语不准）

标注约定：
- `❌ 真正错误`：影响采分点得分，必须改。
- `🔸 可选优化`：语义正确但表达可更地道，改不改都不扣分（写明"不扣分"）。

**讲透语法（本项目硬性要求，见 `SKILL.md` 二·6）**：每个 ❌ 真正错误必须写清
**「错在哪 → 为什么错（点名语法规则）→ 怎么改 → 同类错误如何自查」**。
语法术语首次出现时加中文注释，如「非谓语动词（不做谓语的动词形式：doing / done / to do）」
「让步状语从句（退一步承认某情况，主句仍成立）」。用户翻译基础薄弱，**不能只给结论**。

### ⑤ 修改译文

- 给出完整参考译文。
- **保留用户译文中正确的表达**（用「沿用」标出），只改错处，不做无差别重写。

### ⑥ 值得背的结构与仿写

- 提炼 **1—2 个**结构或词组（写清可迁移的使用场景）。
- 配 **1 句同结构仿写练习**（英文，用户自己译）。

### ⑦ 得分率与达标建议

- 格式：`得分率：3.5/4 = 87.5%`。
- 达标建议分档：
  - **≥ 80%**：合格，可进入下一难度。
  - **60%—79%**：基本达标，需巩固同结构，建议补做 1 句。
  - **< 60%**：**未达标，建议重做同结构句子**（换语料、保结构）。

---

## 5. 落盘数据契约（本项目约定，必须遵守）

批改后写入 **`data/patches/sub_<id>.json`**，结构与真题翻译一致但有扩展：

```json
{
  "id": "sub_0004",
  "status": "graded",
  "gradedAt": "2025-01-01T09:30:00.000Z",
  "partial": true,
  "grading": {
    "score": 3.5,
    "fullScore": 4,
    "band": "长难句专项（非考研总分）",
    "summary": "主干抓取准确，让步省略结构识别到位；插入语漏译一段，中文语序偶有英文腔。",
    "dimensions": [
      { "name": "准确性", "level": "基本", "comment": "however modest 的让步关系译成了转折，逻辑偏差。" },
      { "name": "完整性", "level": "基本", "comment": "插入语中「追踪十年」的信息漏译。" },
      { "name": "中文通顺", "level": "较好", "comment": "整体通顺，个别长定语堆叠。" }
    ],
    "structureNotes": "主句：It is tempting …, yet the evidence suggests that …\n  主语：It（形式主语）→ 真主语：to treat urban greening as a purely aesthetic concern\n  谓语：is / 表语：tempting\n  ├─ yet 转折分句：the evidence（后置定语 now accumulating）suggests\n     插入语：— much of it from longitudinal studies … —\n       └─ 定语从句：that tracked residents across a decade\n     宾语从句：that access to parks … shapes mental health outcomes\n       ├─ 让步状语（省略）：however modest\n       └─ 比较状语：as reliably as income does",
    "sentences": [
      {
        "no": 1,
        "original": "It is tempting to treat urban greening as a purely aesthetic concern, yet the evidence now accumulating — much of it from longitudinal studies that tracked residents across a decade — suggests that access to parks, however modest, shapes mental health outcomes as reliably as income does.",
        "score": 3.5,
        "points": [
          { "en": "It is tempting to treat … as …", "meaning": "人们很容易把……当作……", "score": 1, "got": 1 },
          { "en": "much of it from longitudinal studies that tracked residents across a decade", "meaning": "其中大部分来自追踪居民十年的纵向研究", "score": 1, "got": 0.5 },
          { "en": "however modest", "meaning": "无论多么小（让步）", "score": 0.5, "got": 0 },
          { "en": "as reliably as income does", "meaning": "其可靠程度不亚于收入", "score": 1.5, "got": 1.5 }
        ],
        "errors": [
          "误译：however modest 的让步关系译成转折「但很小」，逻辑偏差。",
          "漏译：插入语 much of it from longitudinal studies 只译出「研究」，丢失「追踪十年」。",
          "可选优化：中文长定语堆叠，可拆成短句（不扣分）。"
        ],
        "revised": "人们很容易把城市绿化当作纯粹的美学问题，但如今不断积累的证据——其中大部分来自追踪居民长达十年的纵向研究——表明，接触公园无论规模多小，其对心理健康的影响都与收入一样确定。",
        "comment": "错别字已扣 0 分；语序基本无需调整。"
      }
    ],
    "expressions": [
      { "phrase": "It is tempting to treat A as B", "meaning": "人们很容易把 A 当作 B", "usage": "引出一种流行但片面的看法，后接 yet/but 转折批驳。" },
      { "phrase": "however + adj.（省略式让步）", "meaning": "无论多么……", "usage": "however modest = however modest it is，让步状语，常置于插入语位置。" }
    ],
    "review": {
      "priority": ["让步状语 however + adj. 的省略还原", "插入语与主干切分", "长定语中文化拆句"],
      "framework": "同结构仿写：____ is tempting to treat ____ as ____, yet the evidence ____ — much of it from ____ — suggests that ____, however ____, ____ as ____ as ____ does. 下一步：补做 1 句 ★3 同结构句，重点练让步省略与插入语切分，达标后再升 ★4。"
    }
  }
}
```

### 契约要点

- **本文件的结构以 `references/web_bridge.md` 为准**；冲突时以 `web_bridge.md` 为准，本模块只在其上做如下扩展。
- **扩展字段（本模块特有）**：顶层 `partial: true`；`dimensions[].level`（`"较好" | "基本" | "待加强"`）；
  `grading.structureNotes`（长难句专项专属，`web_bridge.md` 第 92 行已预留）；`sentences[].comment`（可选）。
- **`partial: true` 与 `fullScore` 用于表示这不是考研总分**，网页会显示为「专项训练」。
- `band` 固定写 `"长难句专项（非考研总分）"`。
- `structureNotes` 为**纯文本**，可用缩进 / 箭头 / 换行（`\n`）。
- `sentences` 数组：本模块一般只有 1 个元素（`no: 1`）；一次练多句时按 `no` 递增。
- `points[].score` 之和 = `sentences[].score` 的满分（即 `fullScore`）；`points[].got` 之和 = `sentences[].score`。
- `dimensions` 沿用翻译类三维度：**准确性 / 完整性 / 中文通顺**（不得自造维度名）；
  `structureNotes` 承载结构识别内容，结构问题写入 `sentences[].errors`。
- `expressions` 给 3—5 条。
- `review.priority` **恰好 3 条**，且每条含可执行练习建议（`web_bridge.md` 检查清单硬性要求）；
  `review.framework` 含**同结构仿写练习**与下一步训练建议。
- 写文件用 write 工具，**UTF-8 无 BOM**，JSON 可被 `JSON.parse` 解析（无注释、无尾逗号）；
  写完在对话中报告题号、得分率、补丁路径，并提示"刷新网页（或等约 8 秒自动加载）"。
- **例外**：若该次练习确实属于真题 5 句 20 分模式，则按 `english1_translation.md` 的结构落盘，
  **不写 `partial:true`**，`band` 用真题口径（如 `13-16 分档`）。

---

## 6. 评分口径（采分点制）

- **只按采分点给分**，不做整体印象分。
- 判定档位：
  - **满分**：意思完整且中文可读。
  - **半分档**：大意对但漏关键修饰 / 逻辑关系错 / 中文拗口。
  - **0 分**：误译、漏译整块、逻辑反了。
- 中文表达不计独立分，但**严重不通顺可倒扣**至该采分点的半分档。
- 得分率 = `score / fullScore`，四舍五入到 0.1%。

---

## 7. 难度与训练进阶

| 星级 | 特征 | 典型结构组合 |
|---|---|---|
| ★1 | 40 词内，1 个从句 | 简单定语从句 + 分词短语 |
| ★2 | 35—45 词，2 类结构 | 名词性从句 + 后置定语 |
| ★3 | 40—50 词，2—3 类结构 | it 形式主语 + 非限制性定语从句 + 插入语 |
| ★4 | 45—55 词，3 类结构 | 让步从句嵌套 + 指代链 + 分词短语 |
| ★5 | 50—60 词，3—4 类结构 | 倒装或强调 + 多重后置定语 + 名词性从句 |

**进阶规则**：

- 连续 2 次得分率 ≥ 80% → 升一星。
- 任一次 < 60% → 不升星，**换语料、保结构**重做同星级 1—2 句。
- 每次训练在 `review.framework` 记录下一步建议，便于跨会话续训。

---

## 8. 与其他模块的衔接

- 与 `english1_translation.md`：本模块升到 ★5 且连续达标后，建议切换到真题 5 句 20 分模式实战。
- 与词汇 / 长难句语法模块：`expressions` 中提炼的结构同步进复习优先级列表。
- 网页题库：`translationDrills` 里的题（`id` 如 `q_drill_01`）被网页引用后，用户提交会生成 `sub_*` 提交；
  批改补丁 `data/patches/sub_<id>.json` 与提交 `id` 必须一致（**不是与题库 `id` 一致**），缺 patch 视为未批改。
- 读取待办、写回补丁的完整流程与检查清单见 `references/web_bridge.md`，本模块不得另立一套路径。

---

## 9. 指令模板（agent 自用）

**出题**：

> 按第 2 条语料标准出 {N} 句 ★{D} 长难句专项练习（题材：{题材}），
> 按第 3 条字段呈现，标注命中的结构类型。

**批改**：

> 用户译文：{译文}
> 按第 4 条①—⑦七项输出批改，按第 5 条写入 `data/patches/sub_{id}.json`（含 `partial:true`），
> 末行给得分率与达标建议。

**续训**：

> 读取最近 3 个 `data/patches/sub_*.json`，统计 `dimensions` 中反复出现 `"待加强"` 的维度
> 与 `sentences[].errors` 里高频的结构类型，出 2 句同结构新语料，
> 难度按第 7 条进阶规则决定，并在 `review.framework` 写明下一步。
