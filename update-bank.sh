#!/usr/bin/env bash
# 联网更新题库（macOS / Linux）：./update-bank.sh 2027,2028
set -e
cd "$(dirname "$0")"

if [ -z "$1" ]; then
  echo "用法：./update-bank.sh 2027            # 补齐 2027 年"
  echo "      ./update-bank.sh 2027,2028      # 补齐多年"
  echo "也可以直接在网页「题库 → 一键更新题库」里点按钮。"
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "❌ 找不到 node。"
  exit 1
fi

echo "正在让 AI 联网核查 $1 年的考研英语一真题并补进题库……"
node tools/grade-once.js --update "$1"