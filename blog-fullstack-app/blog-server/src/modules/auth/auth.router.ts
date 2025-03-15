import { Router } from 'express';
import { authController } from './auth.controller';
import { validateDto } from '../../middleware/validate';
import { LoginDto } from './dto/login.dto';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', validateDto(LoginDto), authController.login);

export { authRouter };