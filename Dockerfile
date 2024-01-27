FROM node:20.9.0-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .next ./.next

EXPOSE 3000

CMD [ "npm" , "run" , "dev" ]
