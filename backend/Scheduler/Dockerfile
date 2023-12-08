FROM node:latest

ENV NODE_ENV=production

WORKDIR /scheduler

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["sh", "-c", "node index.js && npm start"]

