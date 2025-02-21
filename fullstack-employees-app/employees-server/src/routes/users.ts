import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserValidator } from '../validators/UserValidator';
import validationErrors from '../middleware/handleValidationErrors';
import { AuthGuard } from '../middleware/auth';


const UserRouter = Router();

UserRouter.post('/login', UserValidator.loginDto, validationErrors, UserController.login);
UserRouter.post('/register', UserValidator.registerDto, validationErrors, UserController.register);
UserRouter.get('/current', AuthGuard, UserController.current);

export { UserRouter };