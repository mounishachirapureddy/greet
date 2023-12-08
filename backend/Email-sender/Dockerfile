FROM node:latest

ENV NODE_ENV=production

WORKDIR /email-adaptor

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3006

CMD ["sh", "-c", "node index.js && npm start"]

