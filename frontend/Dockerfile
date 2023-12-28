# Stage 1: Development stage
FROM node:latest AS development
ENV NODE_ENV=development
WORKDIR /messaging/frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

# Stage 2: Production stage
FROM node:latest AS production
ENV NODE_ENV=production
WORKDIR /messaging/frontend
COPY --from=development /messaging/frontend/node_modules ./node_modules
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
