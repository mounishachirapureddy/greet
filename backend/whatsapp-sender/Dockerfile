FROM node:latest

ENV NODE_ENV=production

WORKDIR /whatsapp-sender

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3010

CMD ["sh", "-c", "node index.js && npm start"]
