/* 批改补丁 sub_0002 —— 由 AI (kaoyan-english-tutor) 生成，网页自动加载 */
window.__KAOYAN_PATCHES = window.__KAOYAN_PATCHES || {};
window.__KAOYAN_PATCHES['sub_0002'] = {
  "id": "sub_0002",
  "status": "graded",
  "gradedAt": "2026-02-14T11:26:00+08:00",
  "grading": {
    "score": 7,
    "fullScore": 10,
    "band": "7.0/10（句子主干基本抓住，细节与逻辑关系失分较多）",
    "wordCount": 0,
    "wordCountNote": "本篇为翻译题，不统计英文词数；5 句全部作答，无漏答",
    "summary": "五句都译出了主干，说明你\"找主谓\"的能力是有的，这是好消息。五句合计 7 分。主要失分点集中在三类：①从句层次没有拉开——把定语从句、原因状语从句的意思压成并列的短句，导致原文的因果、让步关系丢失（第 1、5 句）；②个别关键词理解偏了（第 2 句 unmanaged、第 4 句 mental health、第 5 句 land values）；③代词与省略成分还原不到位（第 4 句 it、第 2 句 themselves）。最需要注意的是第 2、4 句：这两句你其实是\"猜大意\"而不是\"读结构\"，把修饰成分丢掉了。建议先按\"划主干→圈连词→标指代\"三步走，再动笔翻译。",
    "dimensions": [
      {
        "name": "准确性",
        "level": "基本",
        "comment": "第 1、3、5 句主干准确；第 2 句 unmanaged plots 译成\"没人管理的土地\"意思偏（应为\"无人修剪、任其自生的地块/荒地\"），第 4 句 mental health 漏译、land values 译成\"土地价格\"（应为\"地价/土地价值上升的压力\"）。"
      },
      {
        "name": "完整性",
        "level": "基本",
        "comment": "第 3 句丢失\"让生物学家不以为奇\"这一层，第 4 句丢失\"在同样成本下\"的比较含义与\"能走到草地旁\"的定语从句信息；其余句子意思基本完整。"
      },
      {
        "name": "中文通顺",
        "level": "较好",
        "comment": "中文表达流畅，没有翻译腔硬伤；\"与其说……不如说……\"（第 5 句）处理得体。个别处因为过度直译而显得生硬（\"被留下来自我播种\"）。"
      }
    ],
    "sentences": [
      {
        "no": 1,
        "original": "That assumption is now being challenged by a generation of architects and ecologists who argue that the wildness once banished from the city should be invited back, not for its beauty alone, but for the services it quietly performs.",
        "score": 1.5,
        "points": [
          {
            "en": "That assumption is now being challenged by ...",
            "meaning": "这一假设如今正受到……的质疑（被动转主动更符合中文：\"如今正有……对这一假设提出质疑\"）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "a generation of architects and ecologists who argue that ...",
            "meaning": "一代建筑师和生态学家，他们主张……（who 引导定语从句修饰人，翻译时可拆成后置分句）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "the wildness once banished from the city should be invited back",
            "meaning": "曾被逐出城市的\"野性\"应当被请回来（once banished 是过去分词短语作后置定语）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "not for its beauty alone, but for the services it quietly performs",
            "meaning": "不仅因为它的美，更因为它默默提供的\"服务/功能\"（it quietly performs 是省略了 that 的定语从句，修饰 services）",
            "score": 0.5,
            "got": 0
          }
        ],
        "errors": [
          "最后一个采分点只译出\"服务\"，没有体现 not for ... alone, but for ... 的递进（不仅为了……更为了……），也未点出 services 在此指生态服务功能。",
          "结构提醒：本句主干是 That assumption is being challenged by ...；who 从句与 it performs 从句是两个不同层次的定语，不要把它们的谓语混在一起读。"
        ],
        "revised": "如今，一代建筑师和生态学家正在对这一假设提出质疑：他们认为，曾被逐出城市的野性应当被请回来——这不仅因为它美，更因为它默默发挥着各种功能。",
        "comment": "已是本次翻译中最好的一句，注意把\"不仅……更……\"的递进关系译出来即可拿满分。"
      },
      {
        "no": 2,
        "original": "In Berlin, where abandoned railway yards have been left to seed themselves, researchers found that unmanaged plots supported nearly three times as many insect species as the manicured parks beside them.",
        "score": 1,
        "points": [
          {
            "en": "In Berlin, where abandoned railway yards have been left to seed themselves",
            "meaning": "在柏林，废弃的铁路调车场一直任其自然生长（seed themselves 意为\"自行繁衍、自己长出植物\"）",
            "score": 0.5,
            "got": 0.25
          },
          {
            "en": "researchers found that unmanaged plots supported ...",
            "meaning": "研究人员发现，无人修剪打理的地块养育着……（unmanaged = 未经管理的、任其自生的）",
            "score": 0.5,
            "got": 0.25
          },
          {
            "en": "nearly three times as many insect species as the manicured parks beside them",
            "meaning": "昆虫种类几乎是旁边修剪整齐的公园的三倍（倍数表达 A is three times as many as B）",
            "score": 1,
            "got": 0.5
          }
        ],
        "errors": [
          "railway yards 译为\"铁路堆场\"（应为铁路调车场/货场）；\"自我播种\"是逐字直译，中文不通，应处理为\"任其自然生长、自行繁衍\"。",
          "unmanaged 译成\"没人管理的土地\"方向偏了：这里的 unmanaged 指\"不经修剪打理\"，与后文 manicured（修剪整齐的）形成对照，是得分关键词。",
          "\"支持的昆虫种类\"中\"支持\"是 support 的直译，中文里应为\"养育了/生存着\"。"
        ],
        "revised": "在柏林，一些废弃的铁路调车场一直任其自然生长，研究人员发现，这些无人打理的地块养育的昆虫种类，几乎是旁边修剪整齐的公园的三倍。",
        "comment": "倍数表达译对了，很关键。整句的问题在\"看词不看结构\"：where 从句是地点状语，主句才是 researchers found，翻译时要先把状语放前面。"
      },
      {
        "no": 3,
        "original": "Such findings, which surprise few biologists but unsettle many officials, suggest that the neatness long equated with good government may in fact be a form of poverty.",
        "score": 1.5,
        "points": [
          {
            "en": "Such findings ... suggest that ...",
            "meaning": "这类发现表明……（suggest 此处意为\"表明/说明\"，不是\"建议\"）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "which surprise few biologists but unsettle many officials",
            "meaning": "（插入语）这些发现让生物学家不感到意外，却让许多官员感到不安（surprise few = 几乎不让人吃惊）",
            "score": 0.5,
            "got": 0
          },
          {
            "en": "the neatness long equated with good government may in fact be a form of poverty",
            "meaning": "长期以来被等同于\"善治\"的整洁，实际上可能是一种匮乏/贫瘠",
            "score": 1,
            "got": 1
          }
        ],
        "errors": [
          "漏译 which 定语从句中的\"让生物学家不感到意外\"，只译了\"让很多官员不安\"，少了一个对比层次。",
          "poverty 译为\"贫穷\"略生硬，此处与 neatness 对举，指\"生态上的贫瘠/匮乏\"，译为\"贫乏\"更贴切。",
          "插入语位置：中文可把它单独成句或放进括号，不要与主句谓语 suggest 混在一起。"
        ],
        "revised": "这类发现让生物学家不以为奇，却让许多官员感到不安；它们表明，长期以来被等同于\"善治\"的整洁，实际上可能是一种贫乏。",
        "comment": "主干译得准，但插入语是本题的采分点之一，漏掉就直接丢掉 0.5 分。看到逗号夹住的 which 从句，先单独译，再嵌回主句。"
      },
      {
        "no": 4,
        "original": "Cities that have begun to rewild, however cautiously, report benefits that no engineering project could have delivered at the same cost: cooler streets in summer, cheaper flood control, and a noticeable improvement in the mental health of residents who can walk to a meadow.",
        "score": 1,
        "points": [
          {
            "en": "Cities that have begun to rewild, however cautiously, report benefits ...",
            "meaning": "已经开始\"再野化\"的城市，无论多么谨慎，都报告了种种好处（however cautiously 是让步插入语）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "that no engineering project could have delivered at the same cost",
            "meaning": "这些好处是任何工程项目以同等成本都无法带来的（at the same cost 是采分点，不能漏）",
            "score": 0.5,
            "got": 0.25
          },
          {
            "en": "cooler streets in summer, cheaper flood control",
            "meaning": "夏日更凉爽的街道、成本更低的洪水防治",
            "score": 0.5,
            "got": 0.25
          },
          {
            "en": "and a noticeable improvement in the mental health of residents who can walk to a meadow",
            "meaning": "以及能够走到草地旁的居民在心理健康方面的明显改善",
            "score": 0.5,
            "got": 0
          }
        ],
        "errors": [
          "漏译 mental health 与 who can walk to a meadow：\"居民的显著改善\"没有说明改善的是什么，且丢掉了定语从句限定的那部分居民。",
          "at the same cost 译成\"以同样的代价\"方向可接受但不够准；\"更便宜的水灾控制\"应为\"成本更低的防洪\"。",
          "结构提醒：冒号后面是对 benefits 的具体列举，翻译时建议保留冒号或改为\"包括……\"。"
        ],
        "revised": "已经开始\"再野化\"的城市，无论多么谨慎，都报告了任何工程项目以同等成本都无法带来的好处：夏日更凉爽的街道、成本更低的防洪，以及能够步行到草地的居民在心理健康上的明显改善。",
        "comment": "本句最长，考查的正是\"长句不漏信息\"。方法：先数冒号前有几层修饰（that 从句 + that 从句），再逐项翻译冒号后的并列成分，一项都不能丢。"
      },
      {
        "no": 5,
        "original": "Whether this experiment survives the pressure of rising land values will depend less on ecology than on politics, for the question it raises is not what nature can do for cities but who has the right to decide what a city should look like.",
        "score": 2,
        "points": [
          {
            "en": "Whether this experiment survives the pressure of rising land values",
            "meaning": "这一实验能否顶住地价上涨的压力而存续下去（Whether 引导主语从句）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "will depend less on ecology than on politics",
            "meaning": "与其说取决于生态学，不如说取决于政治（depend less on A than on B）",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "for the question it raises is not what nature can do for cities",
            "meaning": "因为它所提出的问题并不是自然能为城市做什么",
            "score": 0.5,
            "got": 0.5
          },
          {
            "en": "but who has the right to decide what a city should look like",
            "meaning": "而是谁有权决定一座城市应该是什么样子",
            "score": 0.5,
            "got": 0.5
          }
        ],
        "errors": [],
        "revised": "这一实验能否顶住地价上涨的压力而延续下去，与其说取决于生态学，不如说取决于政治；因为它提出的问题并不是自然能为城市做什么，而是谁有权决定一座城市该是什么样子。",
        "comment": "满分。主语从句 + less...than + not...but... 三层结构都处理对了，这就是\"先找主干再译\"的效果，请保持。"
      }
    ],
    "typoDeduction": 0,
    "totalScore": 7,
    "revisedEssay": "",
    "revisedWordCount": 0,
    "expressions": [
      {
        "phrase": "be equated with",
        "meaning": "被等同于、被与……划等号",
        "usage": "评价类文章的常用被动搭配：Success should not be equated with wealth. 翻译真题中也高频出现（equate A with B）。"
      },
      {
        "phrase": "depend less on A than on B",
        "meaning": "与其说取决于 A，不如说取决于 B",
        "usage": "表达\"关键因素其实是另一个\"时的精准结构，作文里同样好用：Whether we succeed depends less on talent than on persistence."
      },
      {
        "phrase": "at the same cost",
        "meaning": "以同等的成本",
        "usage": "讨论公共投入、政策比较时的采分点式短语；写作中可扩展为 at a fraction of the cost（以极小成本）。"
      },
      {
        "phrase": "however cautiously",
        "meaning": "无论多么谨慎（让步插入语）",
        "usage": "however + 副词/形容词 引导让步，插在主语与谓语之间；翻译时单独成小句：\"无论多么谨慎\"。同类：however difficult, however reluctantly。"
      },
      {
        "phrase": "unmanaged / manicured",
        "meaning": "无人打理的 / 修剪整齐的",
        "usage": "一对反义对照词，翻译与阅读中常成对出现，用来制造对比；作文里写城市与自然时可直接借用。"
      }
    ],
    "review": {
      "priority": [
        "补全修饰成分：第 3、4 句都因为漏掉定语从句/插入语而丢分。练习动作：每天从真题翻译里挑 2 句，先用铅笔把\"主干\"和\"所有修饰成分（定语从句、分词短语、插入语）\"分别框出来，写成两列；只把修饰成分逐条译成中文短句（不追求通顺），坚持 10 天，你会发现漏译明显减少。",
        "还原指代与省略：第 2 句 themselves、第 4 句 it、第 5 句 it raises 都需要还原所指。练习动作：做\"指代标注\"训练——给每句里的 it/they/this/that/such 画线并写出它指的是哪个名词短语，每篇 5 句，一周 4 篇；标注完再翻译，顺序不能颠倒。",
        "处理倍数与比较结构：第 2 句的 three times as many ... as 已经译对，说明这类结构可以拿下。练习动作：整理一张\"比较结构卡片\"——three times as many as / twice as much as / no more than / less ... than / not so much A as B，每类抄 1 个真题例句并仿写 1 句，考前每周默写一遍。"
      ],
      "framework": "翻译五步法（建议每次都按这个顺序，别跳步）：\n① 划主干：找主谓宾/主系表，先在心里译出一个\"丑但完整\"的中文主干；\n② 圈连词：which/that/who/whether/because/although 逐个标出它管到哪里；\n③ 标指代：it/they/this/that/such 逐个写出指代对象；\n④ 定语序：后置定语前置、被动转主动、插入语单独成句或加括号；\n⑤ 润色：检查是否有漏译（尤其列举项）、搭配是否自然、是否有错别字。\n本次可直接套用的句式：\"与其说……不如说……\"（depend less on A than on B）、\"不仅因为……更因为……\"（not for ... alone but for ...）。"
    }
  }
};
