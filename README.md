# Life Management API

A personal life management backend API built with Node.js, Express, TypeScript, and PostgreSQL. This API provides modules for managing Finances, Health, Home, and Social aspects of your life.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS
- **Logging**: Winston
- **Validation**: express-validator

## Project Structure

```
├── src/
│   ├── config/           # Configuration files (database, logger, env)
│   ├── controllers/      # Route controllers
│   ├── entities/         # TypeORM entities (database models)
│   ├── middleware/       # Express middleware (auth, error handling, logging)
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Server entry point
├── logs/                 # Application logs
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables (not in git)
├── .env.example          # Example environment variables
└── tsconfig.json         # TypeScript configuration
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd home
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```env
# Server Configuration
NODE_ENV=development
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=life_management

# JWT Configuration
JWT_SECRET=your-secure-secret-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

5. Create PostgreSQL database:
```bash
createdb life_management
```

Or using psql:
```sql
CREATE DATABASE life_management;
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:3001` with auto-reload on file changes.

### Production Mode
```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run typeorm` - Run TypeORM CLI commands
- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration

## API Endpoints

### Health Check
- **GET** `/api/health` - Check API and database status

**Response Example:**
```json
{
  "success": true,
  "message": "Life Management API is running",
  "timestamp": "2025-11-09T22:14:26.279Z",
  "uptime": 21.599,
  "environment": "development",
  "database": "connected"
}
```

## Testing with cURL

Test the health check endpoint:
```bash
curl http://localhost:3001/api/health
```

## Database Migrations

TypeORM will automatically synchronize your database schema in development mode. For production, use migrations:

```bash
# Generate a new migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Security Features

- **Helmet**: Secure HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **Input Validation**: express-validator for request validation

## Logging

Logs are stored in the `logs/` directory:
- `all.log` - All application logs
- `error.log` - Error logs only

Console output includes colorized, timestamped logs.

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Next Steps

1. **Authentication Module**: Implement user registration and login
2. **Finances Module**: Create endpoints for financial tracking
3. **Health Module**: Create endpoints for health metrics
4. **Home Module**: Create endpoints for home management
5. **Social Module**: Create endpoints for social activities

## Development Guidelines

- Use async/await for all asynchronous operations
- Add input validation for all endpoints
- Return consistent JSON responses
- Use environment variables for configuration
- Add error messages in responses
- Comment complex logic only
- Use TypeScript types for all functions and parameters

## Troubleshooting

### Database Connection Issues
If the server starts but shows "database: disconnected":
1. Ensure PostgreSQL is running
2. Verify database credentials in `.env`
3. Check if database exists: `psql -l`
4. Create database if needed: `createdb life_management`

### Port Already in Use
If port 3001 is already in use:
1. Change `PORT` in `.env` file
2. Or kill the process using the port: `lsof -ti:3001 | xargs kill`

## License

ISC

## Author

Your Name
