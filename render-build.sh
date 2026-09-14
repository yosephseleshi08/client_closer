#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "=== [Outreach Engine Pro] Render Build Initiated ==="

# Check package manager (npm or bun)
if command -v bun &> /dev/null; then
  echo "Detected Bun environment. Installing dependencies..."
  bun install --frozen-lockfile || bun install
  echo "Compiling production frontend and server bundle with Bun..."
  bun run build
else
  echo "Detected Node/npm environment. Installing dependencies..."
  npm install
  echo "Compiling production frontend and server bundle with npm..."
  npm run build
fi

# Verify build output
if [ -f "dist/server.cjs" ] && [ -f "dist/index.html" ]; then
  echo "✅ Build complete! dist/server.cjs and dist/index.html successfully created."
else
  echo "⚠️ dist artifacts missing, compiling via direct vite and esbuild..."
  npx vite build
  npx esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
  echo "✅ Fallback build succeeded."
fi
