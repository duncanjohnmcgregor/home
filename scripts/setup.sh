#!/bin/bash

# Life Management Application - Development Environment Setup Script
# This script sets up the entire development environment in one command

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Header
echo ""
echo "=========================================="
echo "  Life Management App - Setup Script"
echo "=========================================="
echo ""

# Check prerequisites
print_info "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Prerequisites check passed!"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_info "Creating .env file from .env.example..."
    cp .env.example .env

    # Generate secure random secrets
    print_info "Generating secure secrets..."

    if command -v openssl &> /dev/null; then
        JWT_SECRET=$(openssl rand -base64 32)
        DB_PASSWORD=$(openssl rand -base64 16)
        REDIS_PASSWORD=$(openssl rand -base64 16)

        # Update .env with generated secrets
        sed -i.bak "s/changeme_super_secret_jwt_key_min_32_chars/$JWT_SECRET/" .env
        sed -i.bak "s/changeme_devpassword/$DB_PASSWORD/" .env
        sed -i.bak "s/changeme_redispassword/$REDIS_PASSWORD/" .env
        rm -f .env.bak

        print_success "Secure secrets generated!"
    else
        print_warning "OpenSSL not found. Please manually update secrets in .env file!"
    fi
else
    print_warning ".env file already exists, skipping creation"
fi

# Create necessary directories
print_info "Creating necessary directories..."
mkdir -p backups
mkdir -p backend/logs
mkdir -p nginx/ssl

# Create placeholder package.json files if they don't exist
if [ ! -f backend/package.json ]; then
    print_info "Creating backend package.json..."
    cat > backend/package.json << 'EOF'
{
  "name": "life-management-backend",
  "version": "1.0.0",
  "description": "Life Management Application Backend API",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "migrate": "echo 'Run migrations here'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "redis": "^4.6.10"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
EOF
fi

if [ ! -f frontend/package.json ]; then
    print_info "Creating frontend package.json..."
    cat > frontend/package.json << 'EOF'
{
  "name": "life-management-frontend",
  "version": "1.0.0",
  "description": "Life Management Application Frontend",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
EOF
fi

# Create placeholder index.js for backend if it doesn't exist
if [ ! -f backend/index.js ]; then
    print_info "Creating backend index.js..."
    cat > backend/index.js << 'EOF'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Basic API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Welcome to Life Management API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOF
fi

# Create basic React app structure if it doesn't exist
if [ ! -d frontend/src ]; then
    print_info "Creating frontend src directory..."
    mkdir -p frontend/src
    mkdir -p frontend/public
fi

if [ ! -f frontend/src/index.js ]; then
    cat > frontend/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
fi

if [ ! -f frontend/src/App.js ]; then
    cat > frontend/src/App.js << 'EOF'
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Life Management Application</h1>
        <p>Welcome to your life management dashboard</p>
      </header>
    </div>
  );
}

export default App;
EOF
fi

if [ ! -f frontend/src/index.css ]; then
    echo "body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }" > frontend/src/index.css
fi

if [ ! -f frontend/src/App.css ]; then
    cat > frontend/src/App.css << 'EOF'
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
EOF
fi

if [ ! -f frontend/public/index.html ]; then
    cat > frontend/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Life Management Application" />
    <title>Life Management App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF
fi

# Create init.sql for database initialization
if [ ! -f scripts/init.sql ]; then
    print_info "Creating database initialization script..."
    cat > scripts/init.sql << 'EOF'
-- Life Management Database Initialization

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Database initialized successfully';
END $$;
EOF
fi

# Stop any running containers
print_info "Stopping any running containers..."
docker-compose down -v 2>/dev/null || true

# Build and start services
print_info "Building Docker images... (this may take a few minutes)"
docker-compose build

print_info "Starting services..."
docker-compose up -d

# Wait for services to be healthy
print_info "Waiting for services to be healthy..."
sleep 10

# Check service status
print_info "Checking service status..."
docker-compose ps

# Test health endpoints
print_info "Testing health endpoints..."
sleep 5

if curl -f http://localhost:3000/health &> /dev/null; then
    print_success "Backend is healthy!"
else
    print_warning "Backend health check failed. Check logs with: docker-compose logs backend"
fi

if curl -f http://localhost:3001/ &> /dev/null; then
    print_success "Frontend is healthy!"
else
    print_warning "Frontend health check failed. Check logs with: docker-compose logs frontend"
fi

# Success message
echo ""
echo "=========================================="
print_success "Setup completed successfully!"
echo "=========================================="
echo ""
echo "Services running:"
echo "  - Frontend: http://localhost:3001"
echo "  - Backend:  http://localhost:3000"
echo "  - Database: localhost:5432"
echo "  - Redis:    localhost:6379"
echo ""
echo "Useful commands:"
echo "  - View logs:      docker-compose logs -f"
echo "  - Stop services:  docker-compose down"
echo "  - Restart:        docker-compose restart"
echo "  - Backup DB:      ./scripts/backup.sh"
echo "  - Seed data:      ./scripts/seed.sh"
echo ""
