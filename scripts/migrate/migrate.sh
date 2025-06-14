#!/bin/sh
set -e

echo "⏳ Waiting for DB..."
until pg_isready -h database -U "$DB_USER"; do
  sleep 1
done

echo "📦 Installing dependencies..."
npm install --ignore-scripts --workspace=backend

echo "🔄 Running Prisma generate and migrate..."
cd backend
npx prisma generate --schema=../backend/prisma/schema.prisma
npx prisma migrate dev --schema=../backend/prisma/schema.prisma
