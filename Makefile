# Life Management Application - Makefile
# Convenient commands for development and deployment

.PHONY: help setup up down restart logs build clean test backup restore seed

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "Life Management Application - Available Commands"
	@echo "================================================"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Initial setup - creates env, builds, and starts all services
	@echo "Running initial setup..."
	./scripts/setup.sh

up: ## Start all services in development mode
	@echo "Starting services..."
	docker-compose up -d
	@echo "Services started! Frontend: http://localhost:3001, Backend: http://localhost:3000"

down: ## Stop all services
	@echo "Stopping services..."
	docker-compose down

restart: ## Restart all services
	@echo "Restarting services..."
	docker-compose restart

logs: ## View logs from all services
	docker-compose logs -f

logs-backend: ## View backend logs only
	docker-compose logs -f backend

logs-frontend: ## View frontend logs only
	docker-compose logs -f frontend

logs-db: ## View database logs only
	docker-compose logs -f postgres

build: ## Rebuild all Docker images
	@echo "Building Docker images..."
	docker-compose build

rebuild: ## Rebuild and restart all services
	@echo "Rebuilding and restarting..."
	docker-compose up -d --build

clean: ## Stop services and remove volumes (clean slate)
	@echo "Cleaning up..."
	docker-compose down -v
	@echo "Cleanup complete!"

ps: ## Show status of all services
	docker-compose ps

shell-backend: ## Open shell in backend container
	docker-compose exec backend sh

shell-frontend: ## Open shell in frontend container
	docker-compose exec frontend sh

shell-db: ## Open PostgreSQL CLI
	docker-compose exec postgres psql -U lifeapp -d life_management

shell-redis: ## Open Redis CLI
	docker-compose exec redis redis-cli -a $$(grep REDIS_PASSWORD .env | cut -d '=' -f2)

test: ## Run tests
	@echo "Running backend tests..."
	docker-compose exec backend npm test
	@echo "Running frontend tests..."
	docker-compose exec frontend npm test

lint: ## Run linters
	@echo "Linting backend..."
	docker-compose exec backend npm run lint
	@echo "Linting frontend..."
	docker-compose exec frontend npm run lint

backup: ## Create database backup
	@echo "Creating database backup..."
	./scripts/backup.sh

restore: ## Restore database from backup
	@echo "Restoring database..."
	./scripts/restore.sh

seed: ## Seed database with sample data
	@echo "Seeding database..."
	./scripts/seed.sh

health: ## Check health of all services
	@echo "Checking service health..."
	@echo -n "Backend: "
	@curl -f http://localhost:3000/health && echo "✓ Healthy" || echo "✗ Unhealthy"
	@echo -n "Frontend: "
	@curl -f http://localhost:3001/ && echo "✓ Healthy" || echo "✗ Unhealthy"
	@echo -n "Database: "
	@docker-compose exec postgres pg_isready -U lifeapp && echo "✓ Healthy" || echo "✗ Unhealthy"
	@echo -n "Redis: "
	@docker-compose exec redis redis-cli ping && echo "✓ Healthy" || echo "✗ Unhealthy"

prod-up: ## Start production stack
	@echo "Starting production services..."
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Production services started!"

prod-down: ## Stop production stack
	@echo "Stopping production services..."
	docker-compose -f docker-compose.prod.yml down

prod-logs: ## View production logs
	docker-compose -f docker-compose.prod.yml logs -f

prod-build: ## Build production images
	@echo "Building production images..."
	docker-compose -f docker-compose.prod.yml build

stats: ## Show container resource usage
	docker stats

prune: ## Remove unused Docker resources
	@echo "Removing unused Docker resources..."
	docker system prune -af
	@echo "Prune complete!"

install-backend: ## Install backend dependencies
	docker-compose exec backend npm install

install-frontend: ## Install frontend dependencies
	docker-compose exec frontend npm install

migrate: ## Run database migrations
	docker-compose exec backend npm run migrate

env: ## Create .env file from .env.example
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo ".env file created! Please update with your values."; \
	else \
		echo ".env file already exists!"; \
	fi
