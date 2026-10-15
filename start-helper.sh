#!/usr/bin/env bash
# 启动辅助服务（macOS / Linux）：./start-helper.sh
# 常驻一个小服务，之后在网页「一键批改」「一键更新题库」都可以直接点按钮。
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "❌ 找不到 node。请先安装 Node.js（18 以上）：https://nodejs.org/"
  exit 1
fi

echo "辅助服务启动中……保持本终端窗口开着。"
echo "停止：在本窗口按 Ctrl+C"
echo
exec node app/tools/grade-helper.js "$@"