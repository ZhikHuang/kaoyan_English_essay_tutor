@echo off
chcp 65001 >nul
echo 正在停止辅助服务（结束占用 8787 端口的 node 进程）……
set FOUND=0
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8787" ^| findstr "LISTENING"') do (
  echo   结束进程 PID %%a
  taskkill /f /pid %%a >nul 2>nul
  set FOUND=1
)
if "%FOUND%"=="0" echo   没有发现正在运行的服务。
echo 完成。
timeout /t 2 >nul