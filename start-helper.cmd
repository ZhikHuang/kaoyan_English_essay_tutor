@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 考研英语（一）（二）· 辅助服务（这个窗口要一直开着）
rem 找 node：先看 PATH（自己装过 Node.js 的情况），再找 DSH 自带运行时（在 DSH 里使用本工具集的情况）
set "NODE="
where node >nul 2>nul
if not errorlevel 1 set "NODE=node"
if not defined NODE if exist "%DSH_HOME%\..\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%DSH_HOME%\..\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "D:\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=D:\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "C:\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=C:\dsh\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "%LOCALAPPDATA%\Programs\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%LOCALAPPDATA%\Programs\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "%ProgramFiles%\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe" set "NODE=%ProgramFiles%\DSH\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
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
echo   两种办法任选：
echo   1. 安装 Node.js 18 以上版本：https://nodejs.org/ ，装完重新双击本文件
echo   2. 不用常驻服务：双击 一键批改.cmd，或直接在 DSH 对话里说「批改待批改作文」
echo.
pause
exit /b 1
