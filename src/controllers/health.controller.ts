import { Request, Response } from 'express';
import { AppDataSource } from '../config/database.config';

export class HealthController {
  static async checkHealth(req: Request, res: Response) {
    const healthCheck = {
      success: true,
      message: 'Life Management API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: 'disconnected',
    };

    try {
      if (AppDataSource.isInitialized) {
        await AppDataSource.query('SELECT 1');
        healthCheck.database = 'connected';
      }
    } catch (error) {
      healthCheck.database = 'error';
    }

    const statusCode = healthCheck.database === 'connected' ? 200 : 503;
    res.status(statusCode).json(healthCheck);
  }
}
