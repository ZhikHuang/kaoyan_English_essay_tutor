#!/usr/bin/env bash
# 停止辅助服务（macOS / Linux）：./stop-helper.sh
echo "正在停止辅助服务（结束占用 8787 端口的进程）……"
PIDS=$(lsof -ti tcp:8787 2>/dev/null || true)
if [ -z "$PIDS" ]; then
  echo "  没有发现正在运行的服务。"
else
  for p in $PIDS; do
    echo "  结束进程 PID $p"
    kill -9 "$p" 2>/dev/null || true
  done
fi
echo "完成。"