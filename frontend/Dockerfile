# Stage 1: Build
FROM node:22.15.0-alpine AS builder

WORKDIR /repo

# Copy entire monorepo for workspace context
COPY . .

# Install all dependencies from the monorepo root
RUN npm install

# Build only the frontend app
RUN npm run --workspace=frontend build

# Stage 2: Serve built frontend
FROM node:22.15.0-alpine

WORKDIR /app

# Copy static build
COPY --from=builder /repo/frontend/dist ./dist
COPY --from=builder /repo/frontend/package*.json ./
COPY --from=builder /repo/node_modules ./node_modules

# Optional: You could serve with serve or any static server
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "5173"]
