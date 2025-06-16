# Base image
FROM node:22.15.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install

# Production build
FROM base AS build
RUN npm run --workspace=backend build

# Dev container
FROM base AS dev
WORKDIR /app/backend
RUN npx prisma generate
CMD ["npm", "--workspace", "backend", "run", "dev"]

# Production runtime
FROM base AS prod
WORKDIR /app
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
