/* 公用 SVG 示意图库（本站自绘，非真题原图）
   真题作文的图画在此按"画面结构"归类复用，避免 34 道题各画一张。
   每个函数返回 <svg> 字符串；题库用 fig.xxx 直接引用。 */
(function () {
  var W = 'viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img"';

  /* 通用：人物（用色块简笔画），sx/sy 为脚底中心点，h 为身高比例 */
  function person(sx, sy, h, shirt, hair, skin) {
    h = h || 1; shirt = shirt || '#7d9a86'; hair = hair || '#3f3125'; skin = skin || '#f0d3b8';
    var headR = 26 * h, bodyW = 62 * h, bodyH = 84 * h, neck = 14 * h;
    var headCY = sy - bodyH - neck - headR;
    return ''
      + '<circle cx="' + sx + '" cy="' + headCY + '" r="' + headR + '" fill="' + skin + '" stroke="#8a7a68" stroke-width="3"/>'
      + '<path d="M' + (sx - headR * 0.86) + ' ' + (headCY - headR * 0.3) + ' q' + (headR * 0.9) + ' ' + (-headR * 1.25) + ' ' + (headR * 1.72) + ' 0 q-' + (headR * 0.4) + ' -' + (headR * 0.7) + ' -' + (headR * 0.86) + ' -' + (headR * 0.7) + ' q-' + (headR * 0.46) + ' 0 -' + (headR * 0.86) + ' ' + (headR * 0.7) + 'z" fill="' + hair + '"/>'
      + '<rect x="' + (sx - bodyW / 2) + '" y="' + (sy - bodyH) + '" width="' + bodyW + '" height="' + bodyH + '" rx="' + (14 * h) + '" fill="' + shirt + '" stroke="#5f6b62" stroke-width="3"/>';
  }
  /* 通用：书架/桌面 */
  function desk(y) {
    return '<rect x="60" y="' + y + '" width="520" height="16" rx="5" fill="#c69a6b"/>' +
           '<rect x="74" y="' + (y + 16) + '" width="14" height="40" fill="#b0834f"/>' +
           '<rect x="552" y="' + (y + 16) + '" width="14" height="40" fill="#b0834f"/>';
  }
  function caption(t) {
    return '<text x="320" y="384" font-size="19" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + t + '</text>';
  }
  function frame(inner) {
    return '<svg ' + W + '><rect width="640" height="400" fill="#f8f5ee"/>' + inner + '</svg>';
  }
  /* 两个人物并排（用于"对照型"图画：左=一人，右=另一人） */
  function twoPeople(opt) {
    opt = opt || {};
    var s = '<rect x="0" y="330" width="640" height="70" fill="#e9e3d6"/>';
    s += person(190, 330, 1.15, opt.lShirt || '#8fa9c2', opt.lHair || '#3f3125');
    s += person(450, 330, 1.15, opt.rShirt || '#5d7f9c', opt.rHair || '#e8e5df');
    if (opt.split) s += '<line x1="320" y1="60" x2="320" y2="330" stroke="#ddd6c8" stroke-width="3" stroke-dasharray="10 8"/>';
    if (opt.lLabel) s += '<text x="190" y="362" font-size="17" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.lLabel + '</text>';
    if (opt.rLabel) s += '<text x="450" y="362" font-size="17" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.rLabel + '</text>';
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }
  /* 一个人 + 一块文字牌/海报 */
  function oneWithPoster(opt) {
    opt = opt || {};
    var s = desk(300);
    s += person(210, 300, 1.1, opt.shirt || '#7d9a86', opt.hair || '#6b5b4b');
    s += '<rect x="380" y="150" width="170" height="120" rx="6" fill="#fff" stroke="#d9c9ae" stroke-width="3"/>';
    s += '<rect x="396" y="168" width="138" height="10" rx="5" fill="#cfd8cf"/>';
    s += '<rect x="396" y="190" width="110" height="8" rx="4" fill="#e2e8e2"/>';
    s += '<rect x="396" y="208" width="128" height="8" rx="4" fill="#e2e8e2"/>';
    s += '<rect x="396" y="226" width="90" height="8" rx="4" fill="#e2e8e2"/>';
    if (opt.posterText) s += '<text x="465" y="262" font-size="15" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.posterText + '</text>';
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }
  /* 一个人面向笔记本电脑/手机 */
  function oneWithScreen(opt) {
    opt = opt || {};
    var s = desk(300);
    s += person(320, 300, 1.1, opt.shirt || '#8fa9c2', opt.hair || '#3f3125');
    s += '<rect x="' + (opt.left ? '150' : '420') + '" y="228" width="70" height="72" rx="6" fill="#3c4653" stroke="#2b333d" stroke-width="3"/>';
    s += '<rect x="' + (opt.left ? '156' : '426') + '" y="236" width="58" height="56" rx="3" fill="' + (opt.screen || '#8fd0e8') + '"/>';
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }
  /* 一群人（观众/学生/听众） */
  function crowd(opt) {
    opt = opt || {};
    var s = '<rect x="0" y="330" width="640" height="70" fill="#e9e3d6"/>';
    var xs = [90, 190, 290, 390, 490, 570];
    var shirts = ['#8fa9c2', '#c08a8a', '#e0b978', '#8fbf9f', '#a9a2c2', '#d0a0a0'];
    xs.forEach(function (x, i) {
      s += person(x, 330 + (i % 2) * 6, 0.95 + (i % 3) * 0.06, shirts[i % shirts.length], i % 2 ? '#3f3125' : '#5a4632');
    });
    if (opt.sign) {
      s += '<rect x="220" y="60" width="200" height="70" rx="8" fill="#fff" stroke="#c9b79c" stroke-width="3"/>';
      s += '<text x="320" y="102" font-size="20" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.sign + '</text>';
    }
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }
  /* 低头看手机（家庭/社交场景） */
  function phones(opt) {
    opt = opt || {};
    var s = '<rect x="40" y="250" width="560" height="80" rx="16" fill="#b9c8d8"/>';
    s += '<rect x="40" y="288" width="560" height="12" fill="#a3b4c6"/>';
    s += person(210, 250, 0.95, opt.lShirt || '#7d9a86', '#6b5b4b');
    s += person(430, 250, 0.95, opt.rShirt || '#d99a94', '#5a4632');
    s += '<rect x="188" y="176" width="40" height="58" rx="5" fill="#3c4653" stroke="#2b333d" stroke-width="3"/>';
    s += '<rect x="193" y="183" width="30" height="44" rx="3" fill="#8fd0e8"/>';
    s += '<rect x="416" y="196" width="34" height="52" rx="5" fill="#3c4653" stroke="#2b333d" stroke-width="3"/>';
    s += '<rect x="420" y="202" width="26" height="40" rx="3" fill="#ffd98a"/>';
    s += '<path d="M300 150 q10 -12 20 0 q10 -12 20 0" stroke="#9aa6b2" stroke-width="3" fill="none"/>';
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }
  /* 两人面对面（对话/交流） */
  function facing(opt) {
    opt = opt || {};
    var s = '<rect x="0" y="330" width="640" height="70" fill="#e9e3d6"/>';
    s += person(150, 330, 1.1, opt.lShirt || '#8fa9c2', opt.lHair || '#3f3125');
    s += person(490, 330, 1.1, opt.rShirt || '#c08a8a', opt.rHair || '#5a4632');
    s += '<path d="M230 250 q90 -40 180 0" stroke="#c9b79c" stroke-width="4" fill="none" stroke-dasharray="8 6"/>';
    if (opt.bubbleL) s += '<rect x="60" y="90" width="170" height="76" rx="10" fill="#fff" stroke="#d9c9ae" stroke-width="3"/><text x="145" y="135" font-size="16" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.bubbleL + '</text>';
    if (opt.bubbleR) s += '<rect x="410" y="90" width="170" height="76" rx="10" fill="#fff" stroke="#d9c9ae" stroke-width="3"/><text x="495" y="135" font-size="16" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.bubbleR + '</text>';
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }
  /* 一个人 + 一堆书/台阶（努力、成长） */
  function books(opt) {
    opt = opt || {};
    var s = '<path d="M0 320 q160 -50 320 0 q160 50 320 0 v80 H0z" fill="#dbe6dd"/>';
    s += '<rect x="150" y="296" width="300" height="30" rx="6" fill="#8fa9c2" stroke="#6d87a0" stroke-width="3"/>';
    s += '<rect x="196" y="262" width="212" height="34" rx="6" fill="#c08a8a" stroke="#a06c6c" stroke-width="3"/>';
    s += '<rect x="238" y="230" width="130" height="32" rx="6" fill="#e0b978" stroke="#bd9757" stroke-width="3"/>';
    s += '<rect x="272" y="200" width="66" height="30" rx="6" fill="#8fbf9f" stroke="#6f9c7f" stroke-width="3"/>';
    s += '<circle cx="305" cy="176" r="16" fill="#ffd97a" opacity="0.6"/><circle cx="305" cy="174" r="8" fill="#ffec9e" stroke="#e0b040" stroke-width="2"/>';
    s += '<circle cx="352" cy="238" r="17" fill="#f5dcc2" stroke="#9c8a76" stroke-width="3"/>';
    s += '<path d="M336 232 q4 -18 16 -18 q12 0 16 18 q-8 -9 -16 -9 q-8 0 -16 9z" fill="#3f3125"/>';
    s += '<rect x="336" y="256" width="32" height="40" rx="10" fill="#5d7f9c" stroke="#456580" stroke-width="3"/>';
    return frame(s + (opt.cap ? caption(opt.cap) : ''));
  }

  /* ============ 折线图（英语二常见题型：逐年变化趋势） ============ */
  /* { title, sub, xLabels:[...], series:[{name, color, values:[...], labels:[...]}], yMax, yUnit, note } */
  function lineChart(opt) {
    opt = opt || {};
    var xLabels = opt.xLabels || [], series = opt.series || [];
    var yMax = opt.yMax || 100, plotX = 90, plotY = 116, plotW = 470, plotH = 196;
    var palette = ['#8fa9c2', '#c08a8a', '#8fbf9f', '#e0b978', '#a9a2c2'];
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="42" font-size="19" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="66" font-size="13" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    [0, 0.25, 0.5, 0.75, 1].forEach(function (t) {
      var y = plotY + plotH * (1 - t);
      s += '<line x1="' + plotX + '" y1="' + y + '" x2="' + (plotX + plotW) + '" y2="' + y + '" stroke="#ece6da" stroke-width="1"/>';
      s += '<text x="' + (plotX - 8) + '" y="' + (y + 4) + '" font-size="11" text-anchor="end" fill="#8d8477" font-family="sans-serif">' +
        (Math.round(yMax * t * 100) / 100) + (opt.yUnit || '') + '</text>';
    });
    s += '<line x1="' + plotX + '" y1="' + (plotY + plotH) + '" x2="' + (plotX + plotW) + '" y2="' + (plotY + plotH) + '" stroke="#b9b0a0" stroke-width="2"/>';
    var n = xLabels.length || 1, slot = plotW / Math.max(1, n - 1 || 1);
    var xs = function (i) { return n === 1 ? plotX + plotW / 2 : plotX + slot * i; };
    xLabels.forEach(function (lb, i) {
      s += '<text x="' + xs(i).toFixed(1) + '" y="' + (plotY + plotH + 22) + '" font-size="12" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(lb) + '</text>';
    });
    series.forEach(function (se, si) {
      var color = se.color || palette[si % palette.length];
      var pts = (se.values || []).map(function (v, i) {
        return xs(i).toFixed(1) + ',' + (plotY + plotH * (1 - Number(v) / yMax)).toFixed(1);
      });
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="2.5"/>';
      (se.values || []).forEach(function (v, i) {
        var cx = xs(i), cy = plotY + plotH * (1 - Number(v) / yMax);
        s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="4" fill="#fff" stroke="' + color + '" stroke-width="2.5"/>';
        var lb = (se.labels && se.labels[i] != null) ? se.labels[i] : v;
        s += '<text x="' + cx.toFixed(1) + '" y="' + (cy - 9).toFixed(1) + '" font-size="11" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(lb) + '</text>';
      });
    });
    // 图例
    var lx = 100;
    series.forEach(function (se, si) {
      var color = se.color || palette[si % palette.length];
      s += '<line x1="' + lx + '" y1="' + 372 + '" x2="' + (lx + 26) + '" y2="' + 372 + '" stroke="' + color + '" stroke-width="3"/>';
      s += '<text x="' + (lx + 32) + '" y="' + 376 + '" font-size="12" fill="#5b5348" font-family="sans-serif">' + escT(se.name || '') + '</text>';
      lx += 40 + String(se.name || '').length * 13;
    });
    if (opt.note) s += '<text x="320" y="' + 396 + '" font-size="11" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }
  /* 饼图 + 空心圆环（英语二"占比"类图表常用） */
  /* { title, sub, slices:[{label, v}], note, donut:true } */
  function pie2(opt) {
    opt = opt || {};
    var slices = opt.slices || [];
    var total = slices.reduce(function (a, b) { return a + Number(b.v || 0); }, 0) || 1;
    var cx = 210, cy = 212, r = 104, ang = -Math.PI / 2;
    var colors = ['#8fa9c2', '#e0b978', '#c08a8a', '#8fbf9f', '#a9a2c2', '#d0a0a0'];
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="42" font-size="19" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="66" font-size="13" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    slices.forEach(function (sl, i) {
      var frac = Number(sl.v || 0) / total, a2 = ang + frac * Math.PI * 2;
      var x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang);
      var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      s += '<path d="M' + cx + ' ' + cy + ' L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (frac > 0.5 ? 1 : 0) + ' 1 ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + ' Z" fill="' + colors[i % colors.length] + '" stroke="#fff" stroke-width="2"/>';
      var mid = (ang + a2) / 2, lx = cx + r * 0.6 * Math.cos(mid), ly = cy + r * 0.6 * Math.sin(mid);
      s += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 5).toFixed(1) + '" font-size="13" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(sl.v) + '%</text>';
      ang = a2;
    });
    if (opt.donut) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.5) + '" fill="#fffdf9" stroke="#e3ddd1" stroke-width="2"/>';
    slices.forEach(function (sl, i) {
      var ly = 132 + i * 32;
      s += '<rect x="368" y="' + (ly - 12) + '" width="17" height="17" rx="3" fill="' + colors[i % colors.length] + '" stroke="#8a8a8a" stroke-width="1"/>';
      s += '<text x="394" y="' + ly + '" font-size="14" fill="#26221d" font-family="sans-serif">' + escT(sl.label) + '　' + escT(sl.v) + '%</text>';
    });
    if (opt.note) s += '<text x="320" y="376" font-size="12" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }

  /* ================= 图表类（近年真题已出现图表/表格大作文） ================= */
  function escT(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  /* 表格：{ title, years:[...], rows:[{name, values:[...] , unit}], note } */
  function table(opt) {
    var years = opt.years || [], rows = opt.rows || [];
    var x0 = 90, y0 = 130, colW = Math.min(140, (640 - x0 - 60) / Math.max(1, years.length)), rowH = 44;
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="52" font-size="21" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="80" font-size="16" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    // 表头
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + (colW * (years.length + 1)) + '" height="34" fill="#f2ece0" stroke="#d9cfbd" stroke-width="2"/>';
    s += '<text x="' + (x0 + 12) + '" y="' + (y0 + 23) + '" font-size="15" fill="#5b5348" font-family="sans-serif">项目 \\ 年份</text>';
    years.forEach(function (y, i) {
      s += '<line x1="' + (x0 + colW * (i + 1)) + '" y1="' + y0 + '" x2="' + (x0 + colW * (i + 1)) + '" y2="' + (y0 + 34 + rowH * rows.length) + '" stroke="#d9cfbd" stroke-width="2"/>';
      s += '<text x="' + (x0 + colW * (i + 1) + colW / 2) + '" y="' + (y0 + 23) + '" font-size="15" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(y) + '</text>';
    });
    // 数据行
    rows.forEach(function (r, ri) {
      var ry = y0 + 34 + rowH * ri;
      s += '<rect x="' + x0 + '" y="' + ry + '" width="' + (colW * (years.length + 1)) + '" height="' + rowH + '" fill="' + (ri % 2 ? '#fbf8f2' : '#fff') + '" stroke="#e3ddd1" stroke-width="1"/>';
      s += '<text x="' + (x0 + 12) + '" y="' + (ry + 28) + '" font-size="15" fill="#26221d" font-family="sans-serif">' + escT(r.name) + '</text>';
      (r.values || []).forEach(function (v, vi) {
        s += '<line x1="' + (x0 + colW * (vi + 1)) + '" y1="' + ry + '" x2="' + (x0 + colW * (vi + 1)) + '" y2="' + (ry + rowH) + '" stroke="#e3ddd1" stroke-width="1"/>';
        s += '<text x="' + (x0 + colW * (vi + 1) + colW / 2) + '" y="' + (ry + 28) + '" font-size="15" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(v) + '</text>';
      });
      if (r.unit) s += '<text x="' + (x0 + colW * (years.length + 1) + 8) + '" y="' + (ry + 28) + '" font-size="13" fill="#8d8477" font-family="sans-serif">' + escT(r.unit) + '</text>';
    });
    if (opt.note) s += '<text x="320" y="' + (y0 + 34 + rowH * rows.length + 42) + '" font-size="14" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }
  /* 柱状图：{ title, sub, groups:[{label, values:[{v,label}]}] , yMax, yUnit, note } */
  function barChart(opt) {
    var groups = opt.groups || [];
    var yMax = opt.yMax || 100, plotX = 90, plotY = 110, plotW = 470, plotH = 210;
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="52" font-size="21" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="78" font-size="15" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    // 坐标轴与网格
    [0, 0.25, 0.5, 0.75, 1].forEach(function (t) {
      var y = plotY + plotH * (1 - t);
      s += '<line x1="' + plotX + '" y1="' + y + '" x2="' + (plotX + plotW) + '" y2="' + y + '" stroke="#ece6da" stroke-width="1"/>';
      s += '<text x="' + (plotX - 10) + '" y="' + (y + 5) + '" font-size="12" text-anchor="end" fill="#8d8477" font-family="sans-serif">' + Math.round(yMax * t) + (opt.yUnit || '') + '</text>';
    });
    s += '<line x1="' + plotX + '" y1="' + (plotY + plotH) + '" x2="' + (plotX + plotW) + '" y2="' + (plotY + plotH) + '" stroke="#b9b0a0" stroke-width="2"/>';
    // 柱
    var n = groups.length || 1, slot = plotW / n;
    var colors = ['#8fa9c2', '#c08a8a', '#e0b978', '#8fbf9f', '#a9a2c2', '#d0a0a0', '#9ec3c0'];
    groups.forEach(function (g, gi) {
      var vals = g.values || [], m = vals.length || 1;
      var bw = Math.min(56, (slot * 0.7) / m);
      vals.forEach(function (v, vi) {
        var hgt = Math.max(2, plotH * (Number(v.v) / yMax));
        var bx = plotX + slot * gi + slot * 0.15 + vi * (bw + 6);
        var by = plotY + plotH - hgt;
        s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + hgt + '" rx="4" fill="' + colors[(gi + vi) % colors.length] + '" stroke="#6d7a86" stroke-width="1.5"/>';
        s += '<text x="' + (bx + bw / 2) + '" y="' + (by - 7) + '" font-size="13" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(v.label != null ? v.label : v.v) + '</text>';
      });
      s += '<text x="' + (plotX + slot * gi + slot / 2) + '" y="' + (plotY + plotH + 26) + '" font-size="14" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(g.label) + '</text>';
    });
    if (opt.note) s += '<text x="320" y="' + (plotY + plotH + 60) + '" font-size="14" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }
  /* 饼图：{ title, sub, slices:[{label, v}], note（小图例放右侧） } */
  function pieChart(opt) {
    var slices = opt.slices || [], total = slices.reduce(function (a, b) { return a + Number(b.v || 0); }, 0) || 1;
    var cx = 215, cy = 220, r = 110, ang = -Math.PI / 2;
    var colors = ['#8fa9c2', '#e0b978', '#c08a8a', '#8fbf9f', '#a9a2c2'];
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="52" font-size="21" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="78" font-size="15" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    slices.forEach(function (sl, i) {
      var frac = Number(sl.v || 0) / total, a2 = ang + frac * Math.PI * 2;
      var x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang);
      var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      var large = frac > 0.5 ? 1 : 0;
      s += '<path d="M' + cx + ' ' + cy + ' L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + ' Z" fill="' + colors[i % colors.length] + '" stroke="#fff" stroke-width="2"/>';
      var mid = (ang + a2) / 2, lx = cx + r * 0.62 * Math.cos(mid), ly = cy + r * 0.62 * Math.sin(mid);
      s += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 5).toFixed(1) + '" font-size="14" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(sl.v) + '%</text>';
      ang = a2;
    });
    // 图例
    slices.forEach(function (sl, i) {
      var ly = 150 + i * 34;
      s += '<rect x="400" y="' + (ly - 13) + '" width="18" height="18" rx="3" fill="' + colors[i % colors.length] + '" stroke="#8a8a8a" stroke-width="1"/>';
      s += '<text x="428" y="' + ly + '" font-size="15" fill="#26221d" font-family="sans-serif">' + escT(sl.label) + '　' + escT(sl.v) + '%</text>';
    });
    if (opt.note) s += '<text x="320" y="376" font-size="14" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }

  /* 双图表：左饼图＋右柱状图并排（2026 真题题型；双图表题通用）
     { title, sub, pieTitle, slices:[{label,v}], barTitle, bars:[{name,v,label}], yMax, yUnit, note } */
  function pieBar(opt) {
    opt = opt || {};
    var slices = opt.slices || [], bars = opt.bars || [];
    var colors = ['#8fa9c2', '#e0b978', '#c08a8a', '#8fbf9f', '#a9a2c2'];
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="40" font-size="19" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="64" font-size="13" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    s += '<line x1="318" y1="88" x2="318" y2="372" stroke="#e3ddd1" stroke-width="2" stroke-dasharray="8 8"/>';
    var cx = 158, cy = 208, r = 76, ang = -Math.PI / 2;
    var total = slices.reduce(function (a, b) { return a + Number(b.v || 0); }, 0) || 1;
    s += '<text x="158" y="92" font-size="16" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(opt.pieTitle || '') + '</text>';
    slices.forEach(function (sl, i) {
      var frac = Number(sl.v || 0) / total, a2 = ang + frac * Math.PI * 2;
      var x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang);
      var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      s += '<path d="M' + cx + ' ' + cy + ' L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (frac > 0.5 ? 1 : 0) + ' 1 ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + ' Z" fill="' + colors[i % colors.length] + '" stroke="#fff" stroke-width="2"/>';
      var mid = (ang + a2) / 2, lx = cx + r * 0.58 * Math.cos(mid), ly = cy + r * 0.58 * Math.sin(mid);
      s += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 5).toFixed(1) + '" font-size="13" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(sl.v) + '%</text>';
      ang = a2;
    });
    slices.forEach(function (sl, i) {
      var ly = 308 + i * 24;
      s += '<rect x="46" y="' + (ly - 11) + '" width="15" height="15" rx="3" fill="' + colors[i % colors.length] + '" stroke="#8a8a8a" stroke-width="1"/>';
      s += '<text x="68" y="' + ly + '" font-size="13" fill="#26221d" font-family="sans-serif">' + escT(sl.label) + '　' + escT(sl.v) + '%</text>';
    });
    var yMax = opt.yMax || 50, plotX = 350, plotY = 140, plotW = 240, plotH = 150;
    s += '<text x="470" y="92" font-size="16" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(opt.barTitle || '') + '</text>';
    [0, 0.5, 1].forEach(function (t) {
      var y = plotY + plotH * (1 - t);
      s += '<line x1="' + plotX + '" y1="' + y + '" x2="' + (plotX + plotW) + '" y2="' + y + '" stroke="#ece6da" stroke-width="1"/>';
      s += '<text x="' + (plotX - 8) + '" y="' + (y + 4) + '" font-size="11" text-anchor="end" fill="#8d8477" font-family="sans-serif">' + (yMax * t) + (opt.yUnit || '') + '</text>';
    });
    s += '<line x1="' + plotX + '" y1="' + (plotY + plotH) + '" x2="' + (plotX + plotW) + '" y2="' + (plotY + plotH) + '" stroke="#b9b0a0" stroke-width="2"/>';
    var slot = plotW / (bars.length || 1), bw = Math.min(48, slot * 0.55);
    bars.forEach(function (b, bi) {
      var hgt = Math.max(2, plotH * (Number(b.v || 0) / yMax));
      var bx = plotX + slot * bi + (slot - bw) / 2, by = plotY + plotH - hgt;
      s += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + hgt.toFixed(1) + '" rx="4" fill="' + colors[bi % colors.length] + '" stroke="#6d7a86" stroke-width="1.5"/>';
      s += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (by - 6).toFixed(1) + '" font-size="12" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(b.label != null ? b.label : b.v) + '</text>';
      s += '<text x="' + (plotX + slot * bi + slot / 2).toFixed(1) + '" y="' + (plotY + plotH + 24) + '" font-size="13" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(b.name || '') + '</text>';
    });
    if (opt.note) s += '<text x="320" y="386" font-size="12" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }
  /* 两组数据并排对照（同一年里两个对象对比，如"城镇 vs 乡村"） */
  function twinBars(opt) {
    opt = opt || {};
    var groups = opt.groups || [];
    var yMax = opt.yMax || 100, plotX = 80, plotY = 110, plotW = 480, plotH = 200;
    var colors = ['#8fa9c2', '#c08a8a'];
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<text x="320" y="44" font-size="19" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(opt.title || '') + '</text>';
    if (opt.sub) s += '<text x="320" y="68" font-size="13" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.sub) + '</text>';
    [0, 0.25, 0.5, 0.75, 1].forEach(function (t) {
      var y = plotY + plotH * (1 - t);
      s += '<line x1="' + plotX + '" y1="' + y + '" x2="' + (plotX + plotW) + '" y2="' + y + '" stroke="#ece6da" stroke-width="1"/>';
      s += '<text x="' + (plotX - 8) + '" y="' + (y + 4) + '" font-size="11" text-anchor="end" fill="#8d8477" font-family="sans-serif">' + Math.round(yMax * t) + (opt.yUnit || '') + '</text>';
    });
    s += '<line x1="' + plotX + '" y1="' + (plotY + plotH) + '" x2="' + (plotX + plotW) + '" y2="' + (plotY + plotH) + '" stroke="#b9b0a0" stroke-width="2"/>';
    var slot = plotW / (groups.length || 1);
    groups.forEach(function (g, gi) {
      (g.values || []).forEach(function (v, vi) {
        var bw = Math.min(52, slot * 0.32);
        var hgt = Math.max(2, plotH * (Number(v.v || 0) / yMax));
        var bx = plotX + slot * gi + slot * 0.2 + vi * (bw + 6), by = plotY + plotH - hgt;
        s += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + hgt.toFixed(1) + '" rx="4" fill="' + colors[vi % colors.length] + '" stroke="#6d7a86" stroke-width="1.5"/>';
        s += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (by - 6).toFixed(1) + '" font-size="12" text-anchor="middle" fill="#26221d" font-family="sans-serif">' + escT(v.label != null ? v.label : v.v) + '</text>';
      });
      s += '<text x="' + (plotX + slot * gi + slot / 2).toFixed(1) + '" y="' + (plotY + plotH + 24) + '" font-size="13" text-anchor="middle" fill="#5b5348" font-family="sans-serif">' + escT(g.label || '') + '</text>';
    });
    if (opt.legend) s += '<text x="320" y="' + (plotY + plotH + 52) + '" font-size="12" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.legend) + '</text>';
    if (opt.note) s += '<text x="320" y="' + (plotY + plotH + 74) + '" font-size="12" text-anchor="middle" fill="#8a7a68" font-family="sans-serif">' + escT(opt.note) + '</text>';
    return frame(s);
  }

  /* 桌椅前的人（伏案用功 / 懒散）＋可选提示气泡 */
  function deskPerson(opt) {
    opt = opt || {};
    var s = '<rect x="0" y="330" width="640" height="70" fill="#e9e3d6"/>';
    s += desk(296);
    s += person(320, 296, 1.1, opt.shirt || '#8fa9c2', opt.hair || '#3f3125');
    // 桌上物品
    if (opt.books) {
      s += '<rect x="234" y="268" width="52" height="12" rx="3" fill="#c08a8a" stroke="#a06c6c" stroke-width="2"/>';
      s += '<rect x="240" y="256" width="44" height="12" rx="3" fill="#8fbf9f" stroke="#6f9c7f" stroke-width="2"/>';
      s += '<rect x="378" y="268" width="46" height="12" rx="3" fill="#e0b978" stroke="#bd9757" stroke-width="2"/>';
    }
    if (opt.stacks) {   // 堆满文件
      for (var i = 0; i < 4; i++) s += '<rect x="' + (200 + i * 3) + '" y="' + (266 - i * 10) + '" width="70" height="9" rx="2" fill="#e6dfd2" stroke="#c9b79c" stroke-width="1.5"/>';
    }
    if (opt.phone) s += '<rect x="392" y="250" width="30" height="48" rx="5" fill="#3c4653" stroke="#2b333d" stroke-width="2.5"/>';
    var left = opt.leftBubble, right = opt.rightBubble;
    if (left) s += '<rect x="30" y="80" width="240" height="86" rx="12" fill="#fff" stroke="#d9c9ae" stroke-width="3"/><text x="150" y="118" font-size="16" fill="#5b5348" text-anchor="middle" font-family="sans-serif">' + left + '</text><text x="150" y="146" font-size="14" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + (opt.leftSub || '') + '</text>';
    if (right) s += '<rect x="370" y="80" width="240" height="86" rx="12" fill="#fff" stroke="#d9c9ae" stroke-width="3"/><text x="490" y="118" font-size="16" fill="#5b5348" text-anchor="middle" font-family="sans-serif">' + right + '</text><text x="490" y="146" font-size="14" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + (opt.rightSub || '') + '</text>';
    if (opt.cap) s += caption(opt.cap);
    return frame(s);
  }
  /* 中英共用的两幅小图对照（左小图 / 右小图），用于"两图对比"型真题 */
  function twoPanel(opt) {
    opt = opt || {};
    var s = '<rect width="640" height="400" fill="#fffdf9"/>';
    s += '<rect x="24" y="30" width="280" height="300" rx="10" fill="#fbf8f2" stroke="#e3ddd1" stroke-width="2"/>';
    s += '<rect x="336" y="30" width="280" height="300" rx="10" fill="#fbf8f2" stroke="#e3ddd1" stroke-width="2"/>';
    s += person(120, 330 - 40, 0.95, opt.lShirt || '#8fa9c2', opt.lHair || '#3f3125');
    s += person(430, 330 - 40, 0.95, opt.rShirt || '#8fbf9f', opt.rHair || '#5a4632');
    if (opt.lBubble) s += '<rect x="46" y="60" width="236" height="66" rx="10" fill="#fff" stroke="#d9c9ae" stroke-width="2.5"/><text x="164" y="100" font-size="15" fill="#5b5348" text-anchor="middle" font-family="sans-serif">' + opt.lBubble + '</text>';
    if (opt.rBubble) s += '<rect x="358" y="60" width="236" height="66" rx="10" fill="#fff" stroke="#d9c9ae" stroke-width="2.5"/><text x="476" y="100" font-size="15" fill="#5b5348" text-anchor="middle" font-family="sans-serif">' + opt.rBubble + '</text>';
    if (opt.lMarks) s += '<text x="164" y="220" font-size="15" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.lMarks + '</text>';
    if (opt.rMarks) s += '<text x="476" y="220" font-size="15" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.rMarks + '</text>';
    if (opt.title) s += '<text x="320" y="372" font-size="20" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + opt.title + '</text>';
    return frame(s);
  }
  /* 座位/会议室式场景（多人就座，用于"习惯/会议/课堂"类） */
  function seatedRow(opt) {
    opt = opt || {};
    var s = '<rect x="0" y="300" width="640" height="100" fill="#eee7da"/>';
    s += '<rect x="60" y="272" width="520" height="14" rx="4" fill="#c69a6b"/>';
    [140, 320, 500].forEach(function (x, i) {
      s += person(x, 272, 1.0, ['#8fa9c2', '#c08a8a', '#8fbf9f'][i], i === 1 ? '#3f3125' : '#5a4632');
    });
    if (opt.bubbles) opt.bubbles.forEach(function (b, i) {
      var x = 70 + i * 190;
      s += '<rect x="' + x + '" y="70" width="170" height="70" rx="10" fill="#fff" stroke="#d9c9ae" stroke-width="2.5"/><text x="' + (x + 85) + '" y="100" font-size="15" fill="#5b5348" text-anchor="middle" font-family="sans-serif">' + b[0] + '</text><text x="' + (x + 85) + '" y="124" font-size="13" fill="#8a7a68" text-anchor="middle" font-family="sans-serif">' + (b[1] || '') + '</text>';
    });
    if (opt.cap) s += caption(opt.cap);
    return frame(s);
  }

  /* 把"预设参数 + 可覆盖"包装成函数，这样题库里既能 fig.phones() 也能 fig.phones({cap:'…'}) */
  function preset(fn, defaults) {
    return function (over) {
      var o = {};
      var k;
      for (k in defaults) if (Object.prototype.hasOwnProperty.call(defaults, k)) o[k] = defaults[k];
      for (k in (over || {})) if (Object.prototype.hasOwnProperty.call(over, k)) o[k] = over[k];
      return fn(o);
    };
  }

  window.__KAOYAN_FIG = {
    person: person, desk: desk, caption: caption, frame: frame,
    table: table, barChart: barChart, pieChart: pieChart, pieBar: pieBar, twinBars: twinBars,
    lineChart: lineChart, pie2: pie2,
    deskPerson: deskPerson, twoPanel: twoPanel, seatedRow: seatedRow,
    /* 基础图形（题库可直接传参数调用） */
    twoPeople: twoPeople, oneWithPoster: oneWithPoster, oneWithScreen: oneWithScreen,
    crowd: crowd, phones: phones, facing: facing, books: books,
    /* 命名图形（题库里可用 fig.KEY() 或 fig.KEY({...}) 覆盖文字） */
    phones: preset(phones, {
      lShirt: '#7d9a86', rShirt: '#d99a94',
      cap: '（两人坐在一起，却各自盯着自己的手机屏幕）'
    }),
    twoA: preset(twoPeople, { split: true, lLabel: '一个人', rLabel: '另一个人', cap: '（同一情境，两种不同反应）' }),
    twoB: preset(twoPeople, { lShirt: '#e0a75e', rShirt: '#5d7f9c', cap: '（两位人物，状态形成对照）' }),
    twoC: preset(twoPeople, { lShirt: '#8fbf9f', rShirt: '#c08a8a', cap: '（两种不同处境 / 两种不同选择）' }),
    posterA: preset(oneWithPoster, { cap: '（人物正在专注做事，墙上贴着一张说明性的海报）' }),
    posterB: preset(oneWithPoster, { shirt: '#5d7f9c', cap: '（人物与墙上的海报：文字点明主题）' }),
    screenA: preset(oneWithScreen, { cap: '（一个人对着屏幕，屏幕里是他正在做的事）' }),
    screenB: preset(oneWithScreen, { left: true, screen: '#ffd98a', cap: '（屏幕/工具占据了画面中心）' }),
    crowdSign: preset(crowd, { sign: '活动 / 主题', cap: '（一群人聚在一起，前面立着一块牌子）' }),
    crowdA: preset(crowd, { cap: '（一群人，共同参与同一件事）' }),
    facingA: preset(facing, { bubbleL: 'A 方观点', bubbleR: 'B 方观点', cap: '（两人面对面交流，各有说法）' }),
    facingB: preset(facing, { lShirt: '#e0a75e', rShirt: '#5d7f9c', cap: '（两个人正在对话/协作）' }),
    booksA: preset(books, { cap: '（一格一格往上爬，山顶亮着灯）' }),
    booksB: preset(books, { cap: '（由书堆成的台阶，一步步向上）' })
  };
})();
