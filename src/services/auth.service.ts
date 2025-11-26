import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRepo, RoleRepo } from '../repositories';
import { ERROR_MESSAGES } from '../constants';

export class AuthService {
  static async register(data: { name: string; email: string; password: string; roleName: string }) {
    const userRepo = UserRepo();
    const roleRepo = RoleRepo();
    const existing = await userRepo.findOne({ where: { email: data.email } });
    if (existing) throw new Error(ERROR_MESSAGES.EMAIL_EXISTS);

    const role = await roleRepo.findOne({ where: { name: data.roleName } });
    if (!role) throw new Error(ERROR_MESSAGES.ROLE_NOT_FOUND);

    const hashed = await bcrypt.hash(data.password, 10);
    const user = userRepo.create({ email: data.email, name: data.name, password: hashed, role });
    await userRepo.save(user);
    return user;
  }

  static async login(email: string, password: string) {
    const userRepo = UserRepo();
    const user = await userRepo.findOne({ where: { email } });
    if (!user) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);

    const token = jwt.sign({ sub: user.id, role: user.role.name }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
    const refresh = jwt.sign({ sub: user.id }, config.refreshSecret, { expiresIn: '7d' });
    return { user, token, refresh };
  }
}
