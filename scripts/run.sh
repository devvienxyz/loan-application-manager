#!/bin/bash
set -e

ROOT_DIR=$(dirname "$(dirname "$0")")
cd "$ROOT_DIR"

echo "🔐 Loading environment..."
if [ ! -f .env ]; then
  echo "❌ .env file not found. Please create it first."
  exit 1
fi

echo "🐘 Starting Postgres via Docker..."
docker compose up -d

echo "🔄 Running Prisma migration..."
cd backend
npx prisma migrate dev --schema=../database/prisma/schema.prisma

echo "✅ Done. Database is ready."
