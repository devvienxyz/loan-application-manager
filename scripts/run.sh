#!/bin/bash
set -e

# Move to project root
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔐 Loading environment..."
if [ ! -f .env ]; then
  echo "❌ .env file not found. Please create it first."
  exit 1
fi

# Export .env variables so the script can use them
export $(grep -v '^#' .env | xargs)

echo "🐘 Starting Postgres via Docker..."
docker compose up -d --wait

echo "⏳ Waiting for Postgres to be ready..."
until docker exec loan-application-manager-database pg_isready -U "$DB_USER" > /dev/null 2>&1; do
  echo "⏱️ Waiting..."
  sleep 1
done

echo "🔄 Running Prisma migration..."
cd backend
npx prisma generate --schema=../backend/prisma/schema.prisma
npx prisma migrate dev --schema=../backend/prisma/schema.prisma

echo "✅ Done. Database is ready and up."
