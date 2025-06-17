#!/bin/bash

set -e

COMPOSE_FILE="docker-compose.yml"

[ -f "$COMPOSE_FILE" ] || { echo "Error: $COMPOSE_FILE not found!"; exit 1; }

rebuild_container() {
  SERVICE=$1
  echo "Rebuilding '$SERVICE' container..."
  docker compose -f "$COMPOSE_FILE" build --no-cache "$SERVICE"
}

logs_service() {
  SERVICE=$1
  echo "Viewing logs for '$SERVICE'..."
  docker compose -f "$COMPOSE_FILE" logs -f "$SERVICE"
}

case "$1" in
  up)
    docker compose -f "$COMPOSE_FILE" up -d
    ;;
  up-build)
    docker compose -f "$COMPOSE_FILE" up --build -d
    ;;
  down) # preserves databse in pgdata volume, so it is kept intact across rebuilds
    docker compose -f "$COMPOSE_FILE" down --remove-orphans
    ;;
  nuke) # nuke everything, destroy all
    docker compose -f "$COMPOSE_FILE" down -v --remove-orphans
    ;;
  stop)
    docker compose -f "$COMPOSE_FILE" stop
    ;;
  ps)
    docker compose -f "$COMPOSE_FILE" ps
    ;;
  logs-all)
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  logs-be)
    docker compose -f "$COMPOSE_FILE" logs -f backend
    ;;
  logs-fe)
    docker compose -f "$COMPOSE_FILE" logs -f frontend
    ;;
  logs-db)
    docker compose -f "$COMPOSE_FILE" logs -f database
    ;;
  bash)
    docker compose -f "$COMPOSE_FILE" exec backend sh
    ;;
  rebuild)
    [ -z "$2" ] && { echo "Usage: $0 rebuild <service>"; exit 1; }
    rebuild_container "$2"
    ;;
  logs)
    [ -z "$2" ] && { echo "Usage: $0 logs <service>"; exit 1; }
    logs_service "$2"
    ;;
  *)
    echo "Usage: $0 {up|up-build|down|nuke|stop|ps|logs-all|logs-be|logs-fe|logs-db|bash|rebuild <service>|logs <service>}"
    exit 1
    ;;
esac
