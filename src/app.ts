import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { apiRateLimiter } from './middlewares/rateLimit.middleware';
import router from './router';
import { AppDataSource } from './config/typeorm';
import { errorMiddleware } from './middlewares/error.middleware';

export async function createApp() {
  await AppDataSource.initialize();
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(apiRateLimiter);

  app.use('/api/v1', router);

  // Global error middleware
  app.use(errorMiddleware);

  return app;
}
