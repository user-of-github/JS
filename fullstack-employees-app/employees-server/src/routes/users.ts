import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserValidator } from '../validators/UserValidator';
import validationErrors from '../validators/handleValidationErrors';

const UserRouter = Router();

UserRouter.post('/login', UserValidator.loginDto, validationErrors, UserController.login);

UserRouter.post('/register', UserController.register);

UserRouter.get('/current', UserController.current);

export { UserRouter };