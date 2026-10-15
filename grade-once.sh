#!/usr/bin/env bash
# 一次性批改（macOS / Linux）：./grade-once.sh
# 也可以带参数：./grade-once.sh --update 2027    或    ./grade-once.sh --task "只批改 sub_0003"
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "❌ 找不到 node。请先安装 Node.js（18 以上）：https://nodejs.org/"
  exit 1
fi

echo "提示：若提示 Permission denied，先执行 chmod +x *.sh"
node tools/grade-once.js "$@"