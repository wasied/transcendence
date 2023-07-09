FROM node:18.14

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
CMD [ "npm", "run", "start" ]
