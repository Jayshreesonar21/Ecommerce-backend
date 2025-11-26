import { createApp } from './app';
import config from './config';
import { logger } from './common/logger';

createApp()
  .then((app) => {
    app.listen(config.port, () => logger.info(`Server running on port ${config.port}`));
  })
  .catch((err) => {
    console.error('Failed to start server', err);
  });
