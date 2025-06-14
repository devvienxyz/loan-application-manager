#!/bin/bash
set -e

if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
  echo "Missing required environment variables."
  exit 1
fi

# Render the SQL template with env values
envsubst < /docker-entrypoint-initdb.d/init.template.sql > /docker-entrypoint-initdb.d/init.sql

# Run the init SQL
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -f /docker-entrypoint-initdb.d/init.sql

# Set password separately
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  ALTER USER "$DB_USER" WITH PASSWORD '$DB_PASSWORD';
EOSQL
