@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [错误] 找不到 node。请先安装 Node.js（18 以上），或用 DSH 会话直接批改。
  echo.
  pause
  exit /b 1
)
echo.
echo ============================================================
echo  一键批改：把网页里待批改的作文交给 AI 批改
echo  工作目录：%CD%
echo  批改结果会写到 app\data\patches\，网页会自动刷新显示
echo  通常需要 1 到 5 分钟，请不要关闭本窗口。
echo ============================================================
echo.
node tools\grade-once.js
echo.
pause