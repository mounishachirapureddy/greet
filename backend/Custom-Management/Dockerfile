FROM node:latest

ENV NODE_ENV=production

WORKDIR /custom-management

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3009

CMD ["sh", "-c", "node index.js && npm start"]

