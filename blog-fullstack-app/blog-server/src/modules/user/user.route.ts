import { Router } from 'express';
import { userController } from './user.controller';
import { AuthGuard } from '../../middleware/auth.guard';

const userRouter = Router();

userRouter.get('/:id', userController.getById);
userRouter.get('/current', AuthGuard, userController.current);


export { userRouter };