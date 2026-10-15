/* 示例提交：把这两条复制到 app/data/state.js 的 draft 数组里，就能在网页上看到完整效果
   （配合 examples/patches/ 下的两条示例补丁一起使用） */
[
  {
    id: 'sub_0001',
    questionId: 'q_mock_01_major',
    submittedAt: '2026-02-14T09:40:00+08:00',
    status: 'pending',
    note: '第一次写图画作文，重点帮我看主谓一致和名词单复数。',
    imagePath: '',
    essayText: [
      'As is vividly shown in the picture, a father and his daughter are sitting on the same sofa, but each of them are staring at their own mobile phone. The father\'s screen glows with work messages, while the daughter\'s screen is bright with videos. During one and a half hours, they have no conversation at all.',
      'The picture reveal a common problem in modern families. Mobile phones bring us a lot of convenient, but they also take away the time we should spend with our family members. Many people think they are together, but in fact they are alone. The distance between the two people on the sofa is less than half a meter, yet their hearts are far away.',
      'In my opinion, we should use mobile phones reasonable. I suggest every family set a "no phone time" during dinner. In this way, we can talk with our parents and children, and we will find that real communication is much warmer than any screen. Only when we put down the phones, we can truly be together.'
    ].join('\n\n')
  },
  {
    id: 'sub_0002',
    questionId: 'q_mock_01_trans',
    submittedAt: '2026-02-14T11:05:00+08:00',
    status: 'pending',
    note: '翻译是我的弱项，麻烦把每句主干都拆出来讲。',
    imagePath: '',
    essayText: [
      '第1句：这一假设现在正被一代建筑师和生态学家所挑战，他们认为曾经被驱逐出城市的野性应该被邀请回来，不仅是为了它的美，也是为了它默默提供的服务。',
      '第2句：在柏林，废弃的铁路堆场被留下来自我播种，研究者发现，没人管理的土地支持的昆虫种类几乎是旁边修剪整齐的公园的三倍。',
      '第3句：这些发现让很多官员不安，它们表明，长期被等同于良好治理的整洁，可能实际上是一种贫穷。',
      '第4句：已经开始重新野化的城市报告说，没有哪个工程项目能以同样的代价带来这些好处：夏天更凉的街道、更便宜的水灾控制，以及居民的显著改善。',
      '第5句：这个实验能否在土地价格上涨的压力下存活，与其说取决于生态学，不如说取决于政治，因为它提出的问题不是自然能为城市做什么，而是谁有权决定城市应该是什么样子。'
    ].join('\n')
  }
]
