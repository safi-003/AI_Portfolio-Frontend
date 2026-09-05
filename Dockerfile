FROM node:24-trixie-slim

WORKDIR /portfolio-frontend

COPY package*.json .

RUN npm ci

COPY . . 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]