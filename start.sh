#!/bin/sh

docker-compose up --force-recreate --build -d

sleep 4

docker exec development-backend-1 npx prisma migrate dev --name prod

