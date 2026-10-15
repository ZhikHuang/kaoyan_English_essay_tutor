@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 找不到 node。
  pause
  exit /b 1
)
set /p YEARS=要补齐的年份（例如 2027，多个用逗号分隔）：
if "%YEARS%"=="" (
  echo 没有输入年份，已取消。
  pause
  exit /b 1
)
echo.
echo 正在让 AI 联网核查 %YEARS% 年的考研英语一真题并补进题库……
node tools\grade-once.js --update %YEARS%
echo.
pause