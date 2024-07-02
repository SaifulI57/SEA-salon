**Sorry sir still skill issue, masih seadanya😞**

**Maaf kalau banyak gaya pake docker**

# Deployment

backend:

```bash
http://175.41.168.31:3000/
```

frontend:

```bash

http://175.41.168.31:4173/
```

or

```bash
https://sea-salon.unbound.my.id/
```



# How to Deploy

```bash
bash start.sh
```

if docker reproduce this error:

```bash
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:6576"

Error: P1001: Can't reach database server at `localhost:6576`

Please make sure your database server is running at `localhost:6576`.
```

use this command:

```bash
docker exec development-backend-1 npx prisma migrate dev --name prod
```

#### or

install bun:

```bash
npm i -g bun
```

install package:

```bash
bun install
```

create database postgresql:

```bash
docker run --rm --name dev-postgres -p 5432:5432 -e POSTGRES_PASSWORD=12345678 -d postgres
```

uncomment line 2 and comment line 1 .env:

```dotfile
# DATABASE_URL="postgresql://salon:compfest@postgres:6576/prod?schema=public"
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/mydb?schema=public"
```

generate prisma:

```bash
bunx prisma generate
```

migrate prisma:

```bash
bunx prisma migrate --name ok
```

start:

```bash
bun run dev
```

start frontend:

```bash
cd frontend
npm run dev
```

or

```bash
cd frontend
bun run dev
```
