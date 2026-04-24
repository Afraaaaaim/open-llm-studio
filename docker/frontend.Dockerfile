FROM node:20-alpine

WORKDIR /app

# Cache node_modules layer separately
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]