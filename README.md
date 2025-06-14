# loan-application-manager

Monorepo for a full-stack loan application management system.

📌 Github repository for this project: [devvienxyz/loan-application-manager](https://github.com/devvienxyz/loan-application-manager)

## 🧱 Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Monorepo Tooling**: npm Workspaces
- **Containerization**: Docker & Docker Compose

---

## 📁 Monorepo Structure

```text
loan-application-manager/
├── backend/ # Express API server (TypeScript)
├── frontend/ # Vite React app (TypeScript)
├── shared/ # Shared types & utilities
├── scripts/ # Formatting and automation scripts
├── docker-compose.yml
├── .nvmrc
├── .env
└── package.json # Root workspace config
```

---

## 🚀 Quick Start

### 1. Requirements

- [Node.js v22.15.0](https://nodejs.org) (use `.nvmrc`)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Clone & Set Up

```bash
git clone https://github.com/devvienxyz/loan-application-manager.git
cd loan-application-manager
nvm use      # Ensures correct Node version
npm install  # Installs all workspace dependencies
```

### 3. Run Everything

```bash
docker compose up --build
```

API: <http://localhost:3000>

Frontend: <http://localhost:5173>

PostgreSQL: port 5432

Prisma Studio (optional): npx prisma studio --schema=backend/prisma/schema.prisma

## 🛠 Development

Migrations

```bash
npm run --workspace=backend prisma:migrate
```

Seed Database

```bash
npm run --workspace=backend prisma db seed --schema=../backend/prisma/schema.prisma
```

Format/Lint Staged

```bash
npm run format-check-staged
npm run format-fix-staged
```

## 🔒 Environments

Configure secrets via .env files:

backend/.env

frontend/.env

database/.env (optional for Prisma)

Root .env for global secrets

## ✅ Production Checklist

- Set up CI/CD pipeline

- Secure .env via secrets manager

- Use --omit=dev for production Docker image

- Enable HTTPS via reverse proxy (e.g., NGINX + Certbot)

- Harden PostgreSQL with user & network permissions

## 🤝 License

All rights reserved.

This project is intended for personal or private use only.
Reproduction, modification, or distribution without explicit permission from the author is prohibited.
