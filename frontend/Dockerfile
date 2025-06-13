# Build Vite app using root workspace
FROM node:22.15.0-alpine AS builder

WORKDIR /repo
COPY . .

RUN npm install
RUN npm run --workspace=frontend build

# Serve build using nginx
FROM nginx:alpine

COPY --from=builder /repo/frontend/dist /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
