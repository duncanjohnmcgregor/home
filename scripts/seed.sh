#!/bin/bash

# Database Seed Script
# Populates the database with sample/test data

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuration
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

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    print_error "Database container '$CONTAINER_NAME' is not running!"
    exit 1
fi

print_info "Seeding database with sample data..."

# Create seed SQL
SEED_SQL=$(cat <<'EOF'
-- Seed data for Life Management Application

-- Clear existing data (careful in production!)
TRUNCATE TABLE users CASCADE;

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
    ('john.doe@example.com', '$2b$10$rQ5qVqVqVqVqVqVqVqVqVuXYZ', 'John', 'Doe'),
    ('jane.smith@example.com', '$2b$10$rQ5qVqVqVqVqVqVqVqVqVuXYZ', 'Jane', 'Smith'),
    ('bob.johnson@example.com', '$2b$10$rQ5qVqVqVqVqVqVqVqVqVuXYZ', 'Bob', 'Johnson');

-- Add more seed data for other tables here as your schema grows

SELECT 'Seed data inserted successfully!' as message;
EOF
)

# Execute seed SQL
echo "$SEED_SQL" | docker exec -i "$CONTAINER_NAME" psql \
    -U "${DB_USER:-lifeapp}" \
    -d "${DB_NAME:-life_management}"

print_success "Database seeded successfully!"

# Show results
print_info "Verifying seeded data..."
docker exec -t "$CONTAINER_NAME" psql \
    -U "${DB_USER:-lifeapp}" \
    -d "${DB_NAME:-life_management}" \
    -c "SELECT id, email, first_name, last_name, created_at FROM users;"

print_success "Seed process completed!"
