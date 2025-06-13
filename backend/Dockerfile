# Stage 1: Build
FROM node:22.15.0-alpine AS builder

WORKDIR /repo

# Copy entire monorepo for workspace context
COPY . .

# Install all dependencies from the monorepo root
RUN npm install

# Build only the backend package
RUN npm run --workspace=backend build

# Stage 2: Runtime
FROM node:22.15.0-alpine

WORKDIR /app

# Copy built backend app only
COPY --from=builder /repo/backend/dist ./dist
COPY --from=builder /repo/backend/package*.json ./
COPY --from=builder /repo/node_modules ./node_modules

CMD ["node", "dist/server.js"]
