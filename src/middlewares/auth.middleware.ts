import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRepo } from '../repositories';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Unauthorized' });
    const token = header.replace('Bearer ', '');
    const payload: any = jwt.verify(token, config.jwtSecret);
    const userRepo = UserRepo();
    const user = await userRepo.findOne({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
