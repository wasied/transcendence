# Stage 1: Compile angular app
FROM node:18.14

WORKDIR /app
COPY ./app/package*.json ./
RUN npm ci
COPY ./app ./
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:alpine
COPY --from=0 /app/dist/front /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]