FROM node:latest

ENV NODE_ENV=production

WORKDIR /scheduler

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3008

CMD ["sh", "-c", "node index.js && npm start"]

