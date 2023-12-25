FROM node:latest

ENV NODE_ENV=production

WORKDIR /usr/src/birthday

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3007

CMD ["node", "index.js"]
