FROM node:lts-slim

RUN apt-get update -y && apt-get install openssl -y


RUN npm install -g bun

WORKDIR /opt/app


COPY . .

RUN bun install
RUN bun run build

EXPOSE 4173
ENTRYPOINT [ "bun", "run", "preview", "--host" ]