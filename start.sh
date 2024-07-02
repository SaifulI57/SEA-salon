#!/bin/sh

docker-compose up --force-recreate --build -d

sleep 4

docker exec sea-salon_backend_1 npx prisma migrate dev --name prod

