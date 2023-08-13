# Stage 1: Compile angular app
FROM node:18.14

ARG APP_URL
ARG BACKEND_API_PORT

WORKDIR /app
COPY ./app/package*.json ./
RUN npm ci
COPY ./app ./

RUN sed -i "s|appUrl: 'http://localhost',|appUrl: '${APP_URL}',|g" ./src/environments/environment.ts
RUN sed -i "s|appUrl: 'http://localhost',|appUrl: '${APP_URL}',|g" ./src/environments/environment.prod.ts

RUN sed -i "s|backendAPIPort: 8080,|backendAPIPort: ${BACKEND_API_PORT},|g" ./src/environments/environment.ts
RUN sed -i "s|backendAPIPort: 8080,|backendAPIPort: ${BACKEND_API_PORT},|g" ./src/environments/environment.prod.ts

RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:alpine
COPY --from=0 /app/dist/front /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
