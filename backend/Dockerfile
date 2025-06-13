# Build Express app using root workspace
FROM node:22.15.0-alpine AS builder

WORKDIR /repo
COPY . .

RUN npm install
RUN npm run --workspace=backend build

# Run the built app
FROM node:22.15.0-alpine

WORKDIR /app
COPY --from=builder /repo/backend/dist ./dist
COPY --from=builder /repo/package*.json ./
RUN npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/server.js"]
