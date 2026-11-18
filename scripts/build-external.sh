#!/usr/bin/env bash
# Vercel 静态站点构建脚本
# 不依赖妙搭平台内部工具，产出纯静态前端站点
set -euo pipefail

ROOT_DIR="$(pwd)"
OUT_DIR="$ROOT_DIR/dist-static"

echo "📦 构建 Vercel 静态站点..."

rm -rf "$OUT_DIR"

VITE_STATIC_MODE=true npx vite build \
  --config vite.config.ts \
  --mode production

# 将 index.html 提升到输出目录顶层，确保 Vercel 的 outputDirectory 能识别首页
if [ -f "$OUT_DIR/client/index.html" ]; then
  mv "$OUT_DIR/client/index.html" "$OUT_DIR/index.html"
  rmdir "$OUT_DIR/client" 2>/dev/null || true
fi

echo "✅ 构建完成，产物在 $OUT_DIR"
ls -la "$OUT_DIR"
