import { Router } from 'express';
import { authController } from './auth.controller';
import { dtoValidator } from '../../middleware/dto.validator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const authRouter = Router();

authRouter.post('/register', dtoValidator(RegisterDto), authController.register);
authRouter.post('/login', dtoValidator(LoginDto), authController.login);

export { authRouter };