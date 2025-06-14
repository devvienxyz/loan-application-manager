-- Create user without password
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname = '{{DB_USER}}'
  ) THEN
    CREATE USER {{DB_USER}};
  END IF;
END
$$;

-- Create DB if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_database WHERE datname = '{{DB_NAME}}'
  ) THEN
    CREATE DATABASE {{DB_NAME}} OWNER {{DB_USER}};
  END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE {{DB_NAME}} TO {{DB_USER}};
