FROM node:lts-slim

RUN apt-get update -y && apt-get install openssl -y


RUN npm install -g bun

WORKDIR /opt/app

COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .
COPY prisma prisma


RUN bun install


COPY src src

RUN npx prisma generate

EXPOSE 3000
ENTRYPOINT [ "bun","run","dev"]
