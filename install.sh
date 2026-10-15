#!/usr/bin/env bash
# 一键安装（macOS / Linux）：./install.sh
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  cat <<'EOF'
❌ 找不到 node。

macOS 安装 Node.js 最简单的方式：
  1. 到 https://nodejs.org/ 下载 LTS 版 .pkg 并安装；或
  2. 已装 Homebrew 的话执行：brew install node

装好后重新运行：./install.sh
EOF
  exit 1
fi

# 顺手补上执行权限（从 zip 下载来的脚本默认没有）
chmod +x *.sh 2>/dev/null || true
chmod +x tools/*.js app/tools/*.js 2>/dev/null || true

node install.js