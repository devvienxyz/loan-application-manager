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

## 🛠 Development

Migrations

```bash
./scripts/docker.sh bash
cd backend && npm prisma:migrate
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

Root .env for global secrets

## Testing

```bash
# run on root dir
npm run test
```

## 🤝 License

All rights reserved.

This project is intended for personal or private use only.
Reproduction, modification, or distribution without explicit permission from the author is prohibited.
