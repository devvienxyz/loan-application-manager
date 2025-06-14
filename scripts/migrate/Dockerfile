FROM node:22.1.0-alpine

WORKDIR /app

COPY . .

RUN corepack enable && \
    npm install --ignore-scripts --workspace=backend

RUN apk add --no-cache postgresql-client

ENTRYPOINT ["sh", "./scripts/migrate/migrate.sh"]
