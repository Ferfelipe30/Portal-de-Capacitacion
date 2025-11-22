.PHONY: help build up down logs restart clean shell migrate superuser test

# Variables
COMPOSE_FILE = docker-compose.yml
COMPOSE_DEV_FILE = docker-compose.dev.yml

help: ## Mostrar esta ayuda
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Construir las imágenes Docker
	docker-compose -f $(COMPOSE_FILE) build

build-dev: ## Construir las imágenes Docker para desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) build

up: ## Levantar los servicios en producción
	docker-compose -f $(COMPOSE_FILE) up -d

up-dev: ## Levantar los servicios en desarrollo con hot-reload
	docker-compose -f $(COMPOSE_DEV_FILE) up

up-build: ## Construir y levantar los servicios en producción
	docker-compose -f $(COMPOSE_FILE) up -d --build

up-dev-build: ## Construir y levantar los servicios en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) up --build

down: ## Detener los servicios de producción
	docker-compose -f $(COMPOSE_FILE) down

down-dev: ## Detener los servicios de desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) down

down-volumes: ## Detener y eliminar volúmenes (¡CUIDADO!)
	docker-compose -f $(COMPOSE_FILE) down -v

logs: ## Ver logs de todos los servicios
	docker-compose -f $(COMPOSE_FILE) logs -f

logs-dev: ## Ver logs de desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) logs -f

logs-backend: ## Ver logs del backend
	docker-compose -f $(COMPOSE_FILE) logs -f backend

logs-frontend: ## Ver logs del frontend
	docker-compose -f $(COMPOSE_FILE) logs -f frontend

restart: ## Reiniciar todos los servicios
	docker-compose -f $(COMPOSE_FILE) restart

restart-backend: ## Reiniciar solo el backend
	docker-compose -f $(COMPOSE_FILE) restart backend

restart-frontend: ## Reiniciar solo el frontend
	docker-compose -f $(COMPOSE_FILE) restart frontend

shell: ## Acceder al shell del backend
	docker-compose -f $(COMPOSE_FILE) exec backend sh

shell-dev: ## Acceder al shell del backend en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) exec backend sh

migrate: ## Ejecutar migraciones de Django
	docker-compose -f $(COMPOSE_FILE) exec backend python manage.py migrate

migrate-dev: ## Ejecutar migraciones en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) exec backend python manage.py migrate

makemigrations: ## Crear nuevas migraciones
	docker-compose -f $(COMPOSE_FILE) exec backend python manage.py makemigrations

makemigrations-dev: ## Crear nuevas migraciones en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) exec backend python manage.py makemigrations

superuser: ## Crear un superusuario de Django
	docker-compose -f $(COMPOSE_FILE) exec backend python manage.py createsuperuser

superuser-dev: ## Crear un superusuario en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) exec backend python manage.py createsuperuser

db-shell: ## Acceder a la base de datos PostgreSQL
	docker-compose -f $(COMPOSE_FILE) exec db psql -U postgres -d portal_capacitacion

db-shell-dev: ## Acceder a la base de datos en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) exec db psql -U postgres -d portal_capacitacion

test: ## Ejecutar tests del backend
	docker-compose -f $(COMPOSE_FILE) exec backend python manage.py test

test-dev: ## Ejecutar tests en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) exec backend python manage.py test

clean: ## Limpiar contenedores, imágenes y volúmenes huérfanos
	docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -f

clean-all: ## Limpiar TODO (¡CUIDADO! Elimina imágenes)
	docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -af

ps: ## Ver el estado de los contenedores
	docker-compose -f $(COMPOSE_FILE) ps

ps-dev: ## Ver el estado de los contenedores en desarrollo
	docker-compose -f $(COMPOSE_DEV_FILE) ps

install-backend: ## Instalar dependencias del backend
	docker-compose -f $(COMPOSE_FILE) exec backend pip install -r requirements.txt

install-frontend: ## Instalar dependencias del frontend
	docker-compose -f $(COMPOSE_FILE) exec frontend npm install

collectstatic: ## Recolectar archivos estáticos de Django
	docker-compose -f $(COMPOSE_FILE) exec backend python manage.py collectstatic --noinput
