/* 用 Chromium 系浏览器的 DevTools 协议在真实浏览器里求值，验证页面实际状态
   用法：node tools/eval-in-browser.js <file-url> "<js表达式>"
   浏览器查找顺序：环境变量 DSH_BROWSER → Edge → Chrome → Chromium（都在标准安装位置）；
   找不到就打印提示并退出（本脚本只是开发自检用，不影响批改功能）。 */
'use strict';
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const URL_ = process.argv[2];
const EXPR = process.argv[3] || '1';
const CANDIDATES = [
  process.env.DSH_BROWSER || '',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium'
].filter(Boolean);
const BROWSER = CANDIDATES.find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (!BROWSER) {
  console.log('没找到 Chromium 系浏览器（Edge / Chrome）。可用环境变量 DSH_BROWSER 指定可执行文件路径。');
  process.exit(1);
}

const profile = path.join(os.tmpdir(), 'cdp-profile-' + Date.now());
const child = spawn(BROWSER, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9222', '--user-data-dir=' + profile, URL_
], { stdio: 'ignore', windowsHide: true });

function get(pathname) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: 9222, path: pathname }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve(JSON.parse(b || '{}')));
    }).on('error', reject);
  });
}

/* 极简 WebSocket 客户端（只需要发文本帧 + 读回文本帧） */
function wsConnect(wsUrl) {
  const u = new URL(wsUrl);
  const key = Buffer.from(Math.random().toString(36)).toString('base64');
  const req = http.request({
    host: u.hostname, port: u.port, path: u.pathname + u.search,
    headers: { Connection: 'Upgrade', Upgrade: 'websocket', 'Sec-WebSocket-Key': key, 'Sec-WebSocket-Version': '13' }
  });
  return new Promise((resolve, reject) => {
    req.on('upgrade', (res, socket) => {
      let buf = Buffer.alloc(0);
      const handlers = [];
      socket.on('data', d => {
        buf = Buffer.concat([buf, d]);
        while (buf.length >= 2) {
          const len0 = buf[1] & 0x7f;
          let off = 2, len = len0;
          if (len0 === 126) { len = buf.readUInt16BE(2); off = 4; }
          else if (len0 === 127) { len = Number(buf.readBigUInt64BE(2)); off = 10; }
          if (buf.length < off + len) break;
          const payload = buf.slice(off, off + len).toString('utf8');
          buf = buf.slice(off + len);
          try { handlers.forEach(h => h(JSON.parse(payload))); } catch (e) {}
        }
      });
      const send = (obj) => {
        const data = Buffer.from(JSON.stringify(obj), 'utf8');
        const mask = Buffer.from([1, 2, 3, 4]);
        let header;
        if (data.length < 126) header = Buffer.from([0x81, 0x80 | data.length]);
        else { header = Buffer.alloc(4); header[0] = 0x81; header[1] = 0x80 | 126; header.writeUInt16BE(data.length, 2); }
        const masked = Buffer.alloc(data.length);
        for (let i = 0; i < data.length; i++) masked[i] = data[i] ^ mask[i % 4];
        socket.write(Buffer.concat([header, mask, masked]));
      };
      resolve({ send, onMessage: h => handlers.push(h), close: () => socket.destroy() });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  // 等 DevTools 端口就绪
  let targets = null;
  for (let i = 0; i < 50; i++) {
    try { targets = await get('/json/list'); if (targets && targets.length) break; } catch (e) {}
    await new Promise(r => setTimeout(r, 250));
  }
  const page = (targets || []).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
  if (!page) { console.log('❌ 未能连接浏览器的调试端口'); child.kill(); process.exit(1); }
  const ws = await wsConnect(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  ws.onMessage(msg => { if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } });
  const call = (method, params) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send({ id: i, method, params: params || {} }); });

  // 等页面加载并跑完数据加载（约 3 秒足够 file:// 场景）
  await new Promise(r => setTimeout(r, 3000));
  const r = await call('Runtime.evaluate', { expression: EXPR, returnByValue: true, awaitPromise: true });
  if (r.result && r.result.exceptionDetails) {
    console.log('求值异常：', JSON.stringify(r.result.exceptionDetails.exception || {}).slice(0, 300));
  } else {
    console.log(typeof r.result.result.value === 'string' ? r.result.result.value : JSON.stringify(r.result.result.value, null, 2));
  }
  ws.close();
  child.kill();
  await new Promise(r => setTimeout(r, 300));
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  process.exit(0);
})().catch(e => { console.log('失败：' + e.message); try { child.kill(); } catch (_) {} process.exit(1); });
