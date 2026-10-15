@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 考研英语（一）（二）· 辅助服务（这个窗口要一直开着）
rem 找 node：先看 PATH（自己装过 Node.js 的情况），再找 DSH 自带运行时（含非系统盘）
set "NODE="
where node >nul 2>nul
if not errorlevel 1 set "NODE=node"
if not defined NODE if exist "%DSH_HOME%\..\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%DSH_HOME%\..\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "%LOCALAPPDATA%\Programs\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%LOCALAPPDATA%\Programs\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "%ProgramFiles%\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%ProgramFiles%\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE for %%d in (C D E F G H I J K L M N) do if not defined NODE if exist "%%d:\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%%d:\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE for %%d in (C D E F G H I J K L M N) do if not defined NODE if exist "%%d:\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%%d:\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE goto nonode
echo.
echo 启动中……然后回到网页：题库页有「一键更新题库」，提交页有「一键批改」。
echo 使用的 node：%NODE%
echo 结束：关掉本窗口，或双击 stop-helper.cmd
echo.
"%NODE%" app\tools\grade-helper.js
echo.
echo 服务已退出。
pause
exit /b 0

:nonode
echo.
echo [错误] 找不到 node，也找不到 DSH 自带的运行时。
echo   三种办法任选：
echo   1. 安装 Node.js 18 以上版本：https://nodejs.org/ ，装完重新双击本文件
echo   2. 不用命令行：双击 一键批改.cmd，或在 DSH 对话里说一句「批改待批改作文」
echo      （后者需要先把网页提交同步成 app\data\pending_submissions.json，见 README 第 5 节）
echo   3. 如果 DSH 装在别的盘，请确认该盘根目录下有 dsh\resources\runtime\primary-runtime
echo.
pause
exit /b 1