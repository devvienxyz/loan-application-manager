# base stage
FROM node:22-alpine AS base
WORKDIR /app/shared
COPY shared/package*.json ./
RUN npm install --frozen-lockfile

# Development stage - watch mode
FROM base AS dev
COPY shared ./
CMD ["npm", "run", "dev"]

#  Prod build
FROM base AS build
COPY shared ./
RUN npm run build

# Prod stage (slim output)
FROM node:22-alpine AS prod
WORKDIR /app/shared
COPY --from=build /app/shared/dist ./dist
COPY shared/package*.json ./
# can optionally prune devDependencies if needed:
RUN npm install --omit=dev --frozen-lockfile
CMD ["node", "dist/index.js"]
