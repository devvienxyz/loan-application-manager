# loan-application-manager

Monorepo for managing loan applications.
GitHub: devvienxyz/loan-application-manager

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

1. Configure secrets via root .env for global secrets. There is a .env.template you can copy its contents.

2. Build docker project

Please run commands based on your OS. I am using Ubuntu 22.

```bash
### Ubuntu ###
./scripts/docker.sh up-build

### Windows ###
docker compose up --build
```

API: <http://localhost:3000>

Frontend: <http://localhost:5173>

PostgreSQL: port 5432 through Docker compose project service `database`

## 🛠 Development

1. Create Admin User

Please run commands based on your OS. I am using Ubuntu 22.

```bash
### Ubuntu ###
./scripts/docker.sh bash-be
cd backend && npm run dev-admin
# follow prompts (email, fullName)

### Windows ###
docker compose exec -it frontend sh
cd backend && npm run dev-admin
# follow prompts (email, fullName)
```

If you need to destroy everything including the db, run `./scripts/docker.sh nuke`.

If you rebuild but want to keep the db, run `./scripts/docker.sh down`.

## Testing

```bash
# run on root dir
npm run test
```

## 👤 User Flow

1. Open <http://localhost:5173>

2. Register and log in

3. Apply for a loan

4. Use dev-admin script to assign admin role if needed

## 🤝 License

All rights reserved.

This project is intended for personal or private use only.
Reproduction, modification, or distribution without explicit permission from the author is prohibited.
