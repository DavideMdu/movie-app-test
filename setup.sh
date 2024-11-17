#!/bin/bash

set -e

DOCKER_COMPOSE_FILE="docker-compose.yml" 
POSTGRES_CONTAINER="postgres_container" 
SQL_FILE="./init.sql" 
APP_DIR="./app" 
MIGRATION_COMMAND="npx prisma migrate dev" 

echo "Starting Docker Compose..."
docker compose up -d

echo "Waiting for PostgreSQL to be ready..."

until docker exec $POSTGRES_CONTAINER pg_isready -U postgres > /dev/null 2>&1; do
  sleep 2
  echo "PostgreSQL is not ready yet. Retrying..."
done

echo "PostgreSQL is ready!"

cd $APP_DIR

echo "Running migrations..."

docker exec -it $POSTGRES_CONTAINER bash -c "$MIGRATION_COMMAND"

echo "Populating the database with data from $SQL_FILE..."

docker exec -i $POSTGRES_CONTAINER psql -U postgres -d testDB < $SQL_FILE

npm install

npm run dev

echo "Starting the Next.js application in $APP_DIR..."

echo "Setup completed successfully!"
