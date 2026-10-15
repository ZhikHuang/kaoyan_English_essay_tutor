# 考研英语二 · 翻译（整段英译汉，15 分）批改模块

> 满分 15 分，**整段英译汉**（约 150 词的一段英文），不是英语一的 5 个划线句。
> 数据落盘以 `references/web_bridge.md` 为准。

---

## 0. 适用场景

- "批改英语二翻译" / "英语二翻译 15 分"
- 提交内容为 `subject:"en2"` 且 `kind:"translation"` 的待批改提交
- 题干为 `Translate the following text into Chinese. Write your translation on the ANSWER SHEET.`

**与英语一翻译的区别（先确认，别批错）**：

| | 英语一 | 英语二 |
|---|---|---|
| 形式 | 一段短文中 5 个划线句 | **整段英译汉**（通常一整段约 150 词） |
| 满分 | 10 分（每句 2 分） | **15 分** |
| 题材 | 学术评论、社会科学、法律与媒体 | 科普、社会现象、经济与管理、日常生活 |

---

## 1. 角色设定

**① 阅卷老师**：按"模拟采分点"给分，严格客观；每句的扣分都要能指出对应的英文片段。

**② 辅导老师**：面向基础一般的考生，必须**逐句拆主干讲清结构**（英语二段落长句多，这是得分关键）。

---

## 2. 输入槽位

| 槽位 | 字段 | 说明 |
|------|------|------|
| 英文原文 | `questions[].passage` | 必需；如有上下文请一并提供 |
| 待译句 | `questions[].sentences` | 整段翻译时，可放按句拆开的版本，便于逐句给分 |
| 我的译文 | `completions[].essayText` | 按句或整段均可 |
| 参考译文 | 用户可选提供 | 有则作为采分点校准，无则不编造"标准答案" |

---

## 3. 评分规则（满分 15 分）

**按点给分**：

1. 把整段拆成 **7—10 个句子**（或意群），每句给出 **2—3 个采分点**，分值合计 **15 分**，并注明"模拟划分"。
2. 意思准确即可得分，**不要求与参考译文用词、语序完全一致**。
3. 综合评价准确性、完整性与中文通顺程度：
   - 整句明显扭曲原意：该句最多得 0.5—1 分；
   - 未作答或完全无关：该句 0 分。
4. 漏译、误译按对应采分点扣，**不重复扣分**。
5. **错别字**（不影响原意的笔误）：全篇累计，每满 3 个扣 0.5 分，不足 3 个不扣；已按误译扣分的错误不重复计算。总分最低 0 分。
6. 同一处给出多个备选译法时，若其中有错，按错误译法评价。

**档位参考（供整体评价用，非机械换算）**：

| 档位 | 分数 | 表现 |
|------|------|------|
| 优秀 | 13—15 | 理解准确完整，中文通顺自然，长句结构处理得当 |
| 良好 | 10—12 | 基本准确完整，个别处理解偏差或中文稍生硬 |
| 及格 | 7—9 | 大意可懂，但有明显误译、漏译或语序问题 |
| 较差 | 4—6 | 多处误译，句子结构未理清，中文不成句 |
| 差 | 0—3 | 基本未理解原文 |

---

## 4. 长难句拆解（每句必做，四项齐全）

面向基础一般的考生，**每句都要给**：

1. **句子主干**：主语 + 谓语 +（宾语/表语），用文字标出。
2. **修饰与从句挂载**：哪个成分修饰哪个词；从句归属哪一层（用缩进或箭头表示层级）。
3. **指代关系**：it / they / this / that / such / the former 等指什么。
4. **语序调整**：后置定语前置、状语位置、被动转主动、名词化结构展开、插入语单独成句。

---

## 5. 输出格式（逐句四要素 + 汇总）

逐句输出：

- **① 单句得分**：X / （该句采分点合计分）
- **② 采分点**：列出对应英文片段、应表达的意思、分值、我的得分
- **③ 错误分析**：误译、漏译、语序与表达问题；说明关键词含义、句子主干、修饰或指代关系；区分真正错误与可选优化（正确但不够漂亮的表达不判错）
- **④ 修改译文**：尽量保留我的正确表达，给出准确、完整、自然的译文

**汇总输出**：各句得分表 → 错别字扣分 → 总分（X/15）与档位 → 3 个主要问题（附练习动作）→ 值得积累的词组或句法。

---

## 6. 批改输出落盘（数据契约）

写入 `data/patches/sub_<id>.js`：

```js
window.__KAOYAN_PATCHES = window.__KAOYAN_PATCHES || {};
window.__KAOYAN_PATCHES['sub_0005'] = {
  "id": "sub_0005",
  "status": "graded",
  "gradedAt": "2026-02-14T10:30:00+08:00",
  "grading": {
    "score": 11.5,
    "fullScore": 15,
    "band": "10-12 分档（良好，基本准确完整）",
    "wordCount": 0,
    "wordCountNote": "整段翻译，不统计英文词数；全段已作答，无漏译整句",
    "summary": "长句结构基本理清，主干译得准；主要失分在名词化结构与个别关键词，另有两处漏译。",
    "dimensions": [
      { "name": "准确性", "level": "基本", "comment": "第 2、5 句关键词理解偏（…）；其余句主干准确。" },
      { "name": "完整性", "level": "基本", "comment": "第 4 句漏译括号内的补充说明；第 7 句漏译 one of the reasons。" },
      { "name": "中文通顺", "level": "较好", "comment": "中文表达自然，个别处因直译而略生硬。" }
    ],
    "sentences": [
      {
        "no": 1,
        "original": "The idea that machines can replace human judgement has gained ground in recent years.",
        "score": 2,
        "points": [
          { "en": "The idea that machines can replace human judgement", "meaning": "机器能够取代人类判断这一想法（that 引导同位语从句）", "score": 1, "got": 1 },
          { "en": "has gained ground", "meaning": "越来越被接受 / 日益流行（不是「获得土地」）", "score": 0.5, "got": 0.5 },
          { "en": "in recent years", "meaning": "近年来", "score": 0.5, "got": 0.5 }
        ],
        "errors": [],
        "revised": "近年来，「机器能够取代人类判断」这一想法日益流行。",
        "comment": "主干与同位语从句都译对了，满分。"
      },
      {
        "no": 2,
        "original": "What makes the trend difficult to reverse is the fact that the technology keeps improving.",
        "score": 1,
        "points": [
          { "en": "What makes the trend difficult to reverse", "meaning": "使这一趋势难以逆转的（是……）（What 引导主语从句）", "score": 0.75, "got": 0.5 },
          { "en": "is the fact that ...", "meaning": "在于这样一个事实：……（the fact that 引导同位语从句）", "score": 0.5, "got": 0.5 },
          { "en": "the technology keeps improving", "meaning": "技术一直在进步", "score": 0.75, "got": 0 }
        ],
        "errors": [
          "漏译 the technology keeps improving，只写了「难以逆转」，后半句信息缺失。",
          "What 主语从句译成了「这个趋势很难逆转」，丢掉了「使……的」这层逻辑关系。"
        ],
        "revised": "使这一趋势难以逆转的，是技术仍在不断进步这一事实。",
        "comment": "英语二的段落里 What / the fact that 这类名词性从句很常见，先标出引导词再译。"
      }
    ],
    "typoDeduction": 0,
    "totalScore": 11.5,
    "revisedEssay": "",
    "revisedWordCount": 0,
    "expressions": [
      { "phrase": "gain ground", "meaning": "越来越被接受、日益流行", "usage": "描述观念或趋势时使用：The view is gaining ground among young people." },
      { "phrase": "reverse a trend", "meaning": "逆转趋势", "usage": "社科类段落高频搭配。" }
    ],
    "review": {
      "priority": [
        "名词性从句（What / that / the fact that）：本篇有 2 处丢层次。练习动作：每天从真题翻译里挑 2 个含名词性从句的句子，先画出从句边界再译。",
        "不漏译修饰成分：先框出所有修饰语（定语从句、分词短语、插入语）再逐条译。",
        "关键词要多义辨析：gain ground、reverse 这类词不能逐字译。练习动作：整理一张「易误译词」卡片，每周默写。"
      ],
      "framework": "整段翻译五步：① 通读全段抓主旨 → ② 逐句划主干 → ③ 圈连词标从句层级 → ④ 标指代、调语序（后置定语前置、被动转主动）→ ⑤ 润色检查漏译与错别字。"
    }
  }
};
```

**落盘自检**：`fullScore` 必须是 15；`sentences[]` 每句 `points[].score` 合计应等于该句分值，`got` 合计应等于该句 `score`；`score` = 各句 `score` 之和 − `typoDeduction`；`totalScore` 与 `score` 一致；写完运行 `node tools/validate.js`。

---

## 7. 边界

- 只批英语二翻译（整段，15 分）。
- 若用户给的是"5 个划线句"形式，说明这更接近英语一题型，并提示切换到 `english1_translation.md` 的口径（或按用户指定的科目满分执行）。
- 缺少原文上下文时，说明不确定之处，**不要编造**。
- 手写译文先转录，无法辨认处请用户确认，不把识别错误当作用户错误。
