import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = Router();

// Register
router.post('/register', validate(registerSchema), AuthController.register);

// Login
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
