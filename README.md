# Life Management Application - DevOps Infrastructure

Complete DevOps infrastructure setup for a modern life management application with one-click deployment capabilities.

## Overview

This repository contains a complete, production-ready infrastructure setup featuring:

- **Containerized Services**: PostgreSQL, Redis, Node.js Backend, React Frontend
- **Docker Compose**: Development and production configurations
- **CI/CD Pipeline**: Automated testing and deployment via GitHub Actions
- **Development Scripts**: Backup, restore, seed data, and environment setup
- **Production Ready**: Nginx reverse proxy with SSL support

## Quick Start

### Prerequisites

- Docker (20.10+)
- Docker Compose (2.0+)
- Git

### One-Click Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-name>

# Run the setup script
./scripts/setup.sh
```

That's it! The setup script will:
- Create environment configuration
- Generate secure secrets
- Build Docker images
- Start all services
- Run database migrations

### Access Your Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/health

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Nginx Reverse Proxy                  │
│                    (Production Only)                     │
└────────────────┬────────────────────┬───────────────────┘
                 │                    │
         ┌───────▼────────┐   ┌──────▼──────┐
         │   Frontend     │   │   Backend   │
         │   React App    │   │  Node.js API│
         │   Port: 3001   │   │  Port: 3000 │
         └────────────────┘   └──────┬──────┘
                                     │
                          ┌──────────┴──────────┐
                          │                     │
                    ┌─────▼──────┐      ┌──────▼──────┐
                    │ PostgreSQL │      │    Redis    │
                    │ Port: 5432 │      │ Port: 6379  │
                    └────────────┘      └─────────────┘
```

## Project Structure

```
.
├── docker-compose.yml           # Development configuration
├── docker-compose.prod.yml      # Production configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
│
├── backend/                     # Node.js Backend
│   ├── Dockerfile              # Multi-stage Docker build
│   ├── .dockerignore
│   ├── package.json
│   └── src/
│
├── frontend/                    # React Frontend
│   ├── Dockerfile              # Multi-stage Docker build
│   ├── .dockerignore
│   ├── nginx.conf              # Frontend nginx config
│   ├── package.json
│   └── src/
│
├── nginx/                       # Production Reverse Proxy
│   ├── Dockerfile
│   ├── nginx.conf              # Main nginx configuration
│   └── ssl/                    # SSL certificates (gitignored)
│
├── scripts/                     # Utility Scripts
│   ├── setup.sh               # One-click environment setup
│   ├── backup.sh              # Database backup
│   ├── restore.sh             # Database restore
│   ├── seed.sh                # Seed sample data
│   └── init.sql               # Database schema
│
└── .github/
    └── workflows/
        ├── ci.yml             # CI pipeline (tests)
        └── deploy.yml         # CD pipeline (deployment)
```

## Environment Configuration

### Initial Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env`:
   ```bash
   # Critical: Change these in production!
   DB_PASSWORD=your_secure_password
   REDIS_PASSWORD=your_redis_password
   JWT_SECRET=your_jwt_secret_min_32_characters
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `DB_HOST` | Database host | `postgres` |
| `DB_PORT` | Database port | `5432` |
| `DB_USER` | Database user | `lifeapp` |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `life_management` |
| `REDIS_HOST` | Redis host | `redis` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | - |
| `BACKEND_PORT` | Backend API port | `3000` |
| `FRONTEND_PORT` | Frontend dev port | `3001` |
| `JWT_SECRET` | JWT signing secret | - |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3001` |

## Docker Commands

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# Rebuild specific service
docker-compose up -d --build backend

# Execute command in container
docker-compose exec backend npm run migrate
```

### Production

```bash
# Start production stack
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production stack
docker-compose -f docker-compose.prod.yml down
```

## Development Scripts

### Setup Script
Complete environment setup in one command:
```bash
./scripts/setup.sh
```

### Database Backup
Create a timestamped backup of the database:
```bash
./scripts/backup.sh
```
Backups are stored in `./backups/` and automatically compressed.

### Database Restore
Restore database from a backup:
```bash
# Restore latest backup
./scripts/restore.sh latest

# Restore specific backup
./scripts/restore.sh backup_20240101_120000.sql.gz
```

### Seed Data
Populate database with sample data:
```bash
./scripts/seed.sh
```

## CI/CD Pipeline

### Continuous Integration (ci.yml)

Runs on every pull request and push to `develop`:

1. **Backend Tests**
   - Lint code
   - Type checking
   - Unit tests with coverage
   - Integration tests

2. **Frontend Tests**
   - Lint code
   - Type checking
   - Component tests
   - Build verification

3. **Docker Build Test**
   - Verify Docker images build successfully
   - Multi-stage build optimization

4. **Security Scan**
   - Trivy vulnerability scanning
   - Dependency audits
   - SARIF report upload

5. **Integration Tests**
   - Full stack testing
   - Health checks
   - API endpoint verification

### Continuous Deployment (deploy.yml)

Runs on push to `main` or manual trigger:

1. **Build & Push**
   - Build production Docker images
   - Push to GitHub Container Registry
   - Tag with version/SHA

2. **Deploy to Staging**
   - Automatic deployment on main push
   - Health checks
   - Smoke tests

3. **Deploy to Production**
   - Manual approval required
   - Database backup before deployment
   - Zero-downtime deployment
   - Health checks
   - Automatic rollback on failure

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

**Staging:**
- `STAGING_HOST` - Staging server hostname
- `STAGING_USER` - SSH user for staging
- `STAGING_SSH_KEY` - SSH private key
- `STAGING_ENV` - Complete .env file content

**Production:**
- `PRODUCTION_HOST` - Production server hostname
- `PRODUCTION_USER` - SSH user for production
- `PRODUCTION_SSH_KEY` - SSH private key
- `PRODUCTION_ENV` - Complete .env file content

**Application:**
- `REACT_APP_API_URL` - API URL for frontend

## Production Deployment

### Server Setup

1. **Install Docker and Docker Compose**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

2. **Clone Repository**
   ```bash
   git clone <repo-url> /opt/life-management
   cd /opt/life-management
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   nano .env
   ```

4. **Setup SSL Certificates**
   ```bash
   # Using Let's Encrypt (recommended)
   # Place certificates in nginx/ssl/
   # Or use the nginx.conf HTTPS section
   ```

5. **Deploy**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### SSL/TLS Configuration

Uncomment the HTTPS server block in `nginx/nginx.conf` and add your certificates:

```bash
# Generate self-signed certificate (development only)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem

# For production, use Let's Encrypt:
# certbot certonly --webroot -w /var/www/html \
#   -d yourdomain.com
```

## Monitoring & Debugging

### View Service Status
```bash
docker-compose ps
```

### Check Logs
```bash
# All services
docker-compose logs -f

# Specific service with tail
docker-compose logs -f --tail=100 backend

# Since specific time
docker-compose logs --since 2024-01-01T10:00:00
```

### Access Database
```bash
# PostgreSQL CLI
docker-compose exec postgres psql -U lifeapp -d life_management

# Redis CLI
docker-compose exec redis redis-cli -a your_redis_password
```

### Performance Monitoring
```bash
# Container resource usage
docker stats

# Disk usage
docker system df
```

## Troubleshooting

### Services Won't Start

1. Check Docker is running:
   ```bash
   docker ps
   ```

2. Check logs for errors:
   ```bash
   docker-compose logs
   ```

3. Verify environment variables:
   ```bash
   cat .env
   ```

4. Clean slate restart:
   ```bash
   docker-compose down -v
   docker-compose up -d --build
   ```

### Database Connection Issues

1. Verify database is healthy:
   ```bash
   docker-compose exec postgres pg_isready -U lifeapp
   ```

2. Check credentials in .env match docker-compose.yml

3. Ensure backend waits for database health check

### Frontend Can't Connect to Backend

1. Check backend is running:
   ```bash
   curl http://localhost:3000/health
   ```

2. Verify CORS_ORIGIN in .env matches frontend URL

3. Check REACT_APP_API_URL in frontend environment

## Performance Optimization

### Production Build Optimization

- Multi-stage Docker builds reduce image size
- Nginx serves static frontend assets
- Gzip compression enabled
- Browser caching configured
- Connection pooling in backend

### Database Optimization

- Indexed columns for common queries
- Connection pooling
- Prepared statements
- Regular VACUUM operations

### Caching Strategy

- Redis for session storage
- API response caching
- Static asset caching in Nginx

## Security Best Practices

- ✅ Non-root users in containers
- ✅ Environment variable management
- ✅ SQL injection prevention
- ✅ XSS protection headers
- ✅ Rate limiting configured
- ✅ CORS properly configured
- ✅ Secrets not in version control
- ✅ Regular dependency updates
- ✅ Security scanning in CI/CD

## Scaling Considerations

### Horizontal Scaling

To scale the backend:
```bash
docker-compose up -d --scale backend=3
```

### Load Balancing

Nginx is configured to load balance across multiple backend instances.

### Database Scaling

- Consider read replicas for read-heavy workloads
- Use connection pooling
- Implement caching layer with Redis

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass: `docker-compose up -d && docker-compose logs`
4. Submit a pull request

## License

[Your License Here]

## Support

For issues and questions:
- Create an issue in GitHub
- Check logs: `docker-compose logs -f`
- Review this README

---

**Built with ❤️ for simplified DevOps**
