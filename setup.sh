#!/bin/bash

set -e

DOCKER_COMPOSE_FILE="docker-compose.yml" 
POSTGRES_CONTAINER="postgres_container" 
SQL_FILE="../init.sql" 
APP_DIR="./app" 

echo "Starting Docker Compose..."
sudo docker compose up -d

echo "Waiting for PostgreSQL to be ready..."

until sudo docker exec $POSTGRES_CONTAINER pg_isready -U postgres > /dev/null 2>&1; do
  sleep 2
  echo "PostgreSQL is not ready yet. Retrying..."
done

echo "PostgreSQL is ready!"

cd $APP_DIR

npm install

echo "Running migrations..."

npx prisma migrate dev --name init

sudo docker exec -i $POSTGRES_CONTAINER psql -U postgres -d testDB < $SQL_FILE

echo "Populating the database with data from $SQL_FILE..."

npm run dev