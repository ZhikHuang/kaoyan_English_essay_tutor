@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 考研英语（一）（二）· 辅助服务（这个窗口要一直开着）
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [错误] 找不到 node，无法启动服务。
  echo 你仍然可以双击 一键批改.cmd 或直接在 DSH 会话里批改。
  echo.
  pause
  exit /b 1
)
echo.
echo 启动中……然后回到网页：题库页有「一键更新题库」，提交页有「一键批改」。
echo 结束：关掉本窗口，或双击 stop-helper.cmd
echo.
node app\tools\grade-helper.js
echo.
echo 服务已退出。
pause