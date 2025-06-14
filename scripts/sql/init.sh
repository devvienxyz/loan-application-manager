#!/bin/bash
set -e

INIT_FLAG="/var/lib/postgresql/data/.db_initialized"

# Only run if database isn't initialized
if [ -f "$INIT_FLAG" ]; then
  echo "⏩ Database already initialized. Skipping setup."
  exit 0
fi

if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
  echo "❌ Missing required environment variables."
  exit 1
fi

echo "🚀 Initializing database..."

# Render template to a writable location
envsubst < /docker-entrypoint-initdb.d/init.template.sql > /tmp/init.sql

# Execute schema init
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -f /tmp/init.sql

# Set password
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  ALTER USER "$DB_USER" WITH PASSWORD '$DB_PASSWORD';
EOSQL

# Write sentinel flag
touch "$INIT_FLAG"
echo "✅ Initialization complete."
