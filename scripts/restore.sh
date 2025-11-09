#!/bin/bash

# Database Restore Script
# Restores the PostgreSQL database from a backup file

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuration
BACKUP_DIR="./backups"
CONTAINER_NAME="life-mgmt-db"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
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

print_question() {
    echo -e "${BLUE}[?]${NC} $1"
}

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    print_error "Database container '$CONTAINER_NAME' is not running!"
    exit 1
fi

# List available backups
print_info "Available backups:"
echo ""
ls -lh "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null || {
    print_error "No backups found in $BACKUP_DIR"
    exit 1
}
echo ""

# Select backup file
if [ -z "$1" ]; then
    print_question "Enter the backup filename to restore (or 'latest' for most recent):"
    read -r BACKUP_INPUT
else
    BACKUP_INPUT="$1"
fi

# Handle 'latest' option
if [ "$BACKUP_INPUT" = "latest" ]; then
    BACKUP_FILE=$(ls -t "$BACKUP_DIR"/backup_*.sql.gz | head -n1)
    print_info "Using latest backup: $BACKUP_FILE"
else
    # If filename doesn't include path, add it
    if [[ "$BACKUP_INPUT" != /* ]]; then
        BACKUP_FILE="$BACKUP_DIR/$BACKUP_INPUT"
    else
        BACKUP_FILE="$BACKUP_INPUT"
    fi
fi

# Verify backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    print_error "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Warning about data loss
echo ""
print_error "WARNING: This will DELETE ALL CURRENT DATA in the database!"
print_question "Are you sure you want to continue? (yes/no):"
read -r CONFIRMATION

if [ "$CONFIRMATION" != "yes" ]; then
    print_info "Restore cancelled."
    exit 0
fi

# Create a safety backup of current state
print_info "Creating safety backup of current database..."
SAFETY_BACKUP="$BACKUP_DIR/pre_restore_$(date +%Y%m%d_%H%M%S).sql"
docker exec -t "$CONTAINER_NAME" pg_dump \
    -U "${DB_USER:-lifeapp}" \
    -d "${DB_NAME:-life_management}" \
    --clean \
    --if-exists \
    --create \
    > "$SAFETY_BACKUP"
gzip "$SAFETY_BACKUP"
print_success "Safety backup created: ${SAFETY_BACKUP}.gz"

# Restore database
print_info "Restoring database from: $BACKUP_FILE"

# Decompress if needed and restore
if [[ "$BACKUP_FILE" == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | docker exec -i "$CONTAINER_NAME" psql \
        -U "${DB_USER:-lifeapp}" \
        -d postgres
else
    cat "$BACKUP_FILE" | docker exec -i "$CONTAINER_NAME" psql \
        -U "${DB_USER:-lifeapp}" \
        -d postgres
fi

print_success "Database restored successfully!"
print_info "Safety backup is available at: ${SAFETY_BACKUP}.gz"
echo ""
print_info "Verifying restore..."

# Verify tables exist
docker exec -t "$CONTAINER_NAME" psql \
    -U "${DB_USER:-lifeapp}" \
    -d "${DB_NAME:-life_management}" \
    -c "\dt"

print_success "Restore completed successfully!"
