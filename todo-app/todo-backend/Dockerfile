FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV DEBUG=todo-backend:*

USER node

CMD npm start