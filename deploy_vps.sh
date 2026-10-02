#!/bin/bash
# EstateFlow Automated Hostinger VPS Deployment Script
# Usage: ./deploy_vps.sh

set -e

echo "🚀 [1/6] Starting EstateFlow Production Deployment on Hostinger VPS..."

# 1. Enable Corepack & pnpm
echo "📦 [2/6] Verifying Node & pnpm environment..."
corepack enable
corepack prepare pnpm@10.33.0 --activate

# 2. Install dependencies
echo "📥 [3/6] Installing production monorepo dependencies..."
pnpm install --frozen-lockfile

# 3. Database Generation & Migration
echo "🗄️ [4/6] Running Prisma Client Generation & Schema Push..."
pnpm db:generate
pnpm db:push

# Optionally seed database if FIRST_TIME_SEED environment variable is true
if [ "$SEED_DB" = "true" ]; then
    echo "🌱 Seeding initial database tables..."
    pnpm db:seed
fi

# 4. Build Monorepo Applications
echo "🏗️ [5/6] Building Next.js Web (port 3000) & Admin (port 3001)..."
pnpm run build

# 5. Reload PM2 Process Manager
echo "🔄 [6/6] Reloading PM2 production daemons..."
if command -v pm2 &> /dev/null; then
    pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
    pm2 save
    echo "✅ PM2 Daemons running cleanly!"
    pm2 status
else
    echo "⚠️ PM2 not found. Install with: npm install -g pm2"
fi

echo "🎉 Deployment successful!"
echo "👉 Web Marketplace: http://localhost:3000"
echo "👉 Admin Portal:    http://localhost:3001"
