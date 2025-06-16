# Base image
FROM node:22.15.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install

# Production build
FROM base AS build
RUN npm run --workspace=frontend build

# Dev container
FROM base AS dev
WORKDIR /app/frontend
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Production static server
FROM base AS prod
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/frontend/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
