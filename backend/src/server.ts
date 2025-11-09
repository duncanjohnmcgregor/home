import { createApp } from './app';
import { initializeDatabase } from './config/database.config';
import { config } from './config/env.config';
import { logger } from './config/logger.config';

const startServer = async () => {
  try {
    // Initialize database connection (non-blocking)
    logger.info('Initializing database connection...');
    try {
      await initializeDatabase();
    } catch (dbError) {
      logger.warn('Database connection failed. Server will start without database.');
      logger.warn('Please ensure PostgreSQL is running and configured correctly.');
    }

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(config.port, () => {
      logger.info(`🚀 Server is running on port ${config.port}`);
      logger.info(`📝 Environment: ${config.nodeEnv}`);
      logger.info(`🔗 Health check: http://localhost:${config.port}/api/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      logger.info('Received shutdown signal, closing server gracefully...');

      server.close(async () => {
        logger.info('HTTP server closed');

        try {
          // Close database connection
          const { AppDataSource } = await import('./config/database.config');
          if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            logger.info('Database connection closed');
          }
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forcing shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
