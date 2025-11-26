import Joi from 'joi';
import { ROLE } from '../constants';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  roleName: Joi.string()
    .valid(...Object.values(ROLE))
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
