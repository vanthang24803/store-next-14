FROM node:20.9.0-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

COPY .next ./.next

EXPOSE 3000

CMD [ "pnpm" , "run" , "dev" ]
