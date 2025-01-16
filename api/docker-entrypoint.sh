#!/bin/bash

# Start PostgreSQL service
echo "Starting PostgreSQL..."
service postgresql start

# Check if PostgreSQL data directory is empty
if [ ! -d "/var/lib/postgresql/data/base" ]; then
  echo "Initializing PostgreSQL database..."
  su postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DB;\""
  su postgres -c "psql -c \"CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';\""
  su postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;\""

  # Grant permissions on the public schema
  su postgres -c "psql -d $POSTGRES_DB -c \"GRANT ALL ON SCHEMA public TO $POSTGRES_USER;\""
  su postgres -c "psql -d $POSTGRES_DB -c \"ALTER USER $POSTGRES_USER SET search_path TO public;\""

  # Load initial data if the SQL script exists
  if [ -f /usr/src/app/init.sql ]; then
    echo "Loading initial data..."
    su postgres -c "psql -d $POSTGRES_DB -f /usr/src/app/init.sql"
  fi
else
  echo "PostgreSQL database already initialized. Skipping setup."
fi


# Start NGINX service
echo "Starting NGINX..."
service nginx start

# Start the NestJS application
echo "Starting NestJS application..."
node dist/main
