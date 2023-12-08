FROM node:latest

ENV NODE_ENV=production

WORKDIR /usr/src/birthday

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "index.js"]
