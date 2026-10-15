@echo off
chcp 65001 >nul
cd /d "%~dp0"
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
echo ============================================================
echo  一键批改：把网页里待批改的作文交给 AI 批改
echo  工作目录：%CD%
echo  使用的 node：%NODE%
echo  批改结果会写到 app\data\patches\，网页会自动刷新显示
echo  通常需要 1 到 5 分钟，请不要关闭本窗口。
echo ============================================================
echo.
"%NODE%" tools\grade-once.js
echo.
pause
exit /b 0

:nonode
echo.
echo [错误] 找不到 node，也找不到 DSH 自带的运行时。
echo   两种办法任选：
echo   1. 安装 Node.js 18 以上版本：https://nodejs.org/ ，装完重新双击本文件
echo   2. 打开 DSH，在对话里说一句：批改待批改作文
echo.
pause
exit /b 1
