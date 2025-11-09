# Multi-stage Dockerfile for Node.js Backend

# Base stage with common dependencies
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl

# Development stage
FROM base AS development
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build 2>/dev/null || echo "No build script found, using source files"

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache curl

# Copy dependencies and built application
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Copy source files (or built files if available)
COPY --from=build /app/dist ./dist 2>/dev/null || true
COPY --from=build /app/src ./src 2>/dev/null || true
COPY --from=build /app/*.js ./ 2>/dev/null || true

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    mkdir -p logs && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
