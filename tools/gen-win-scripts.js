/* 生成 Windows 批处理脚本（避免中文编码问题），运行一次即可 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const files = {
  'start-helper.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    'title 考研英语一 · 辅助服务（这个窗口要一直开着）',
    'where node >nul 2>nul',
    'if errorlevel 1 (',
    '  echo.',
    '  echo [错误] 找不到 node，无法启动服务。',
    '  echo 你仍然可以双击 一键批改.cmd 或直接在 DSH 会话里批改。',
    '  echo.',
    '  pause',
    '  exit /b 1',
    ')',
    'echo.',
    'echo 启动中……然后回到网页：题库页有「一键更新题库」，提交页有「一键批改」。',
    'echo 结束：关掉本窗口，或双击 stop-helper.cmd',
    'echo.',
    'node app\\tools\\grade-helper.js',
    'echo.',
    'echo 服务已退出。',
    'pause'
  ].join('\r\n'),

  'stop-helper.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'echo 正在停止辅助服务（结束占用 8787 端口的 node 进程）……',
    'set FOUND=0',
    'for /f "tokens=5" %%a in (\'netstat -ano ^| findstr ":8787" ^| findstr "LISTENING"\') do (',
    '  echo   结束进程 PID %%a',
    '  taskkill /f /pid %%a >nul 2>nul',
    '  set FOUND=1',
    ')',
    'if "%FOUND%"=="0" echo   没有发现正在运行的服务。',
    'echo 完成。',
    'timeout /t 2 >nul'
  ].join('\r\n'),

  '一键批改.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    'where node >nul 2>nul',
    'if errorlevel 1 (',
    '  echo.',
    '  echo [错误] 找不到 node。请先安装 Node.js（18 以上），或用 DSH 会话直接批改。',
    '  echo.',
    '  pause',
    '  exit /b 1',
    ')',
    'echo.',
    'echo ============================================================',
    'echo  一键批改：把网页里待批改的作文交给 AI 批改',
    'echo  工作目录：%CD%',
    'echo  批改结果会写到 app\\data\\patches\\，网页会自动刷新显示',
    'echo  通常需要 1 到 5 分钟，请不要关闭本窗口。',
    'echo ============================================================',
    'echo.',
    'node tools\\grade-once.js',
    'echo.',
    'pause'
  ].join('\r\n'),

  '更新题库.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    'where node >nul 2>nul',
    'if errorlevel 1 (',
    '  echo [错误] 找不到 node。',
    '  pause',
    '  exit /b 1',
    ')',
    'set /p YEARS=要补齐的年份（例如 2027，多个用逗号分隔）：',
    'if "%YEARS%"=="" (',
    '  echo 没有输入年份，已取消。',
    '  pause',
    '  exit /b 1',
    ')',
    'echo.',
    'echo 正在让 AI 联网核查 %YEARS% 年的考研英语一真题并补进题库……',
    'node tools\\grade-once.js --update %YEARS%',
    'echo.',
    'pause'
  ].join('\r\n')
};

for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, name), Buffer.from(body, 'utf8'));
  console.log('已生成 ' + name);
}
