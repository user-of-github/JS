FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
