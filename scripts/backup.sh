#!/bin/bash

# Database Backup Script
# Creates a timestamped backup of the PostgreSQL database

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"
CONTAINER_NAME="life-mgmt-db"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    print_error "Database container '$CONTAINER_NAME' is not running!"
    exit 1
fi

print_info "Starting database backup..."
print_info "Backup file: $BACKUP_FILE"

# Create backup
docker exec -t "$CONTAINER_NAME" pg_dump \
    -U "${DB_USER:-lifeapp}" \
    -d "${DB_NAME:-life_management}" \
    --clean \
    --if-exists \
    --create \
    > "$BACKUP_FILE"

# Compress backup
print_info "Compressing backup..."
gzip "$BACKUP_FILE"
BACKUP_FILE="$BACKUP_FILE.gz"

# Get file size
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)

print_success "Backup completed successfully!"
print_info "File: $BACKUP_FILE"
print_info "Size: $BACKUP_SIZE"

# Keep only last 10 backups
print_info "Cleaning old backups (keeping last 10)..."
cd "$BACKUP_DIR"
ls -t backup_*.sql.gz | tail -n +11 | xargs -r rm --
cd - > /dev/null

print_success "Backup process finished!"
