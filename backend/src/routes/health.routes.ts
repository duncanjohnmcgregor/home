import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/health', asyncHandler(HealthController.checkHealth));

export default router;
