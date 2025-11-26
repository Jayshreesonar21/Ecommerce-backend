import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorMiddleware: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('ERROR:', err);

  // If error has status + message (custom errors)
  const status = (err.status as number) || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
  });
};
