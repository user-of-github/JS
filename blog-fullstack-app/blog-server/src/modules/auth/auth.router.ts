import { Router } from 'express';
import { authController } from './auth.controller';
import { validateDto } from '../../middleware/validate';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const authRouter = Router();

authRouter.post('/register', validateDto(RegisterDto), authController.register);
authRouter.post('/login', validateDto(LoginDto), authController.login);

export { authRouter };