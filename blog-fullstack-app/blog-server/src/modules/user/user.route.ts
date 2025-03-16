import { Router } from 'express';
import { userController } from './user.controller';
import { AuthGuard } from '../../middleware/auth.guard';

const userRouter = Router();

// @ATTENTION: /current must be set earlier than /:id
userRouter.get('/current', AuthGuard, userController.current);
userRouter.get('/:id', AuthGuard, userController.getById);
userRouter.put('/:id', AuthGuard, userController.updateUser);


export { userRouter };