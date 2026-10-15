/* 生成 Windows 批处理脚本（避免中文编码问题），运行一次即可
 *
 * 规则（改动前先读）：
 *   1. .cmd 的行尾必须是 CRLF、编码必须是 UTF-8 无 BOM，否则中文会乱码、双击可能直接报错；
 *   2. node 的查找顺序：PATH → DSH 自带运行时（DSH_HOME 推断 → 常见安装位置 → 各盘符扫描）。
 *      **不要写死盘符**（DSH 可能装在 D:\dsh、E:\dsh 这类非系统盘）；
 *   3. 找不到 dsh 时的提示只写"相对安装位置"，不要把某一台机器的绝对路径写进仓库。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

/* node 的查找代码（各脚本共用），%%d 是 cmd 的 for 变量 */
const FIND_NODE = [
  'rem 找 node：先看 PATH（自己装过 Node.js 的情况），再找 DSH 自带运行时（含非系统盘）',
  'set "NODE="',
  'where node >nul 2>nul',
  'if not errorlevel 1 set "NODE=node"',
  'if not defined NODE if exist "%DSH_HOME%\\..\\dsh\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe" set "NODE=%DSH_HOME%\\..\\dsh\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe"',
  'if not defined NODE if exist "%LOCALAPPDATA%\\Programs\\DSH\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe" set "NODE=%LOCALAPPDATA%\\Programs\\DSH\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe"',
  'if not defined NODE if exist "%ProgramFiles%\\DSH\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe" set "NODE=%ProgramFiles%\\DSH\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe"',
  'if not defined NODE for %%d in (C D E F G H I J K L M N) do if not defined NODE if exist "%%d:\\dsh\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe" set "NODE=%%d:\\dsh\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe"',
  'if not defined NODE for %%d in (C D E F G H I J K L M N) do if not defined NODE if exist "%%d:\\DSH\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe" set "NODE=%%d:\\DSH\\resources\\runtime\\primary-runtime\\dependencies\\node\\bin\\node.exe"'
].join('\r\n');

const NONODE = [
  ':nonode',
  'echo.',
  'echo [错误] 找不到 node，也找不到 DSH 自带的运行时。',
  'echo   三种办法任选：',
  'echo   1. 安装 Node.js 18 以上版本：https://nodejs.org/ ，装完重新双击本文件',
  'echo   2. 不用命令行：双击 一键批改.cmd，或在 DSH 对话里说一句「批改待批改作文」',
  'echo      （后者需要先把网页提交同步成 app\\data\\pending_submissions.json，见 README 第 2.3 节）',
  'echo   3. 如果 DSH 装在别的盘，请确认该盘根目录下有 dsh\\resources\\runtime\\primary-runtime',
  'echo.',
  'pause',
  'exit /b 1'
].join('\r\n');

const files = {
  'install.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    'title 考研英语（一）（二）· 安装与自检',
    FIND_NODE,
    'if not defined NODE goto nonode',
    'echo.',
    '"%NODE%" install.js',
    'echo.',
    'pause',
    'exit /b 0',
    '',
    NONODE
  ].join('\r\n'),

  'start-helper.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    'title 考研英语（一）（二）· 辅助服务（这个窗口要一直开着）',
    FIND_NODE,
    'if not defined NODE goto nonode',
    'echo.',
    'echo 启动中……然后回到网页：题库页有「一键更新题库」，提交页有「一键批改」。',
    'echo 使用的 node：%NODE%',
    'echo 结束：关掉本窗口，或双击 stop-helper.cmd',
    'echo.',
    '"%NODE%" app\\tools\\grade-helper.js',
    'echo.',
    'echo 服务已退出。',
    'pause',
    'exit /b 0',
    '',
    NONODE
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
    FIND_NODE,
    'if not defined NODE goto nonode',
    'echo.',
    'echo ============================================================',
    'echo  一键批改：把网页里待批改的作文交给 AI 批改',
    'echo  工作目录：%CD%',
    'echo  使用的 node：%NODE%',
    'echo  批改结果会写到 app\\data\\patches\\，网页会自动刷新显示',
    'echo  通常需要 1 到 5 分钟，请不要关闭本窗口。',
    'echo ============================================================',
    'echo.',
    '"%NODE%" tools\\grade-once.js',
    'echo.',
    'pause',
    'exit /b 0',
    '',
    NONODE
  ].join('\r\n'),

  '更新题库.cmd': [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    FIND_NODE,
    'if not defined NODE goto nonode',
    'set /p YEARS=要补齐的年份（例如 2027，多个用逗号分隔）：',
    'if "%YEARS%"=="" (',
    '  echo 没有输入年份，已取消。',
    '  pause',
    '  exit /b 1',
    ')',
    'echo.',
    'echo 正在让 AI 联网核查 %YEARS% 年的考研英语（一）（二）真题并补进题库……',
    '"%NODE%" tools\\grade-once.js --update %YEARS%',
    'echo.',
    'pause',
    'exit /b 0',
    '',
    NONODE
  ].join('\r\n')
};

for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, name), Buffer.from(body, 'utf8'));   // UTF-8 无 BOM
  console.log('已生成 ' + name);
}
