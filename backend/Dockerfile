FROM node:18.14

WORKDIR /app

COPY ./app/package*.json ./
RUN npm ci
COPY ./app ./

# Create .env
RUN echo "APP_URL=${APP_URL}" >> .env
RUN echo "BACKEND_API_PORT=${BACKEND_API_PORT}" >> .env
RUN echo "AUTH_42_OAUTH_URL=${AUTH_42_OAUTH_URL}" >> .env
RUN echo "AUTH_42_RETURN_URI=${AUTH_42_RETURN_URI}" >> .env
RUN echo "AUTH_42_CLIENT_KEY=${AUTH_42_CLIENT_KEY}" >> .env
RUN echo "AUTH_42_SECRET_KEY=${AUTH_42_SECRET_KEY}" >> .env
RUN echo "JWT_SECRET=${JWT_SECRET}" >> .env
RUN echo "POSTGRES_DB_HOST=${POSTGRES_DB_HOST}" >> .env
RUN echo "POSTGRES_DB_PORT=${POSTGRES_DB_PORT}" >> .env
RUN echo "POSTGRES_DB_USER=${POSTGRES_DB_USER}" >> .env
RUN echo "POSTGRES_DB_PASS=${POSTGRES_DB_PASS}" >> .env
RUN echo "POSTGRES_DB_NAME=${POSTGRES_DB_NAME}" >> .env

# Run NestJS
RUN npm run build
CMD ["npm", "run", "start:prod"]
