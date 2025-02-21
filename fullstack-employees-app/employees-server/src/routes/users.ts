import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = Router();

UserRouter.post('/login', UserController.login);

UserRouter.post('/register', UserController.register);

UserRouter.get('/current', UserController.current);

export { UserRouter };