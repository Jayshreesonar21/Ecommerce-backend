import dotenv from 'dotenv';
dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET_123dsfs',
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN as '15m' | '1h' | '7d') || '15m',
  refreshSecret: process.env.REFRESH_SECRET || 'REFRESH_SECRET_4543dgd',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '12345678',
    database: process.env.DB_NAME || 'ecom_db',
  },
  rateLimit: {
    windowMs: Number(process.env.RATE_WINDOW || 15 * 60 * 1000),
    max: Number(process.env.RATE_MAX || 100),
  },
};
