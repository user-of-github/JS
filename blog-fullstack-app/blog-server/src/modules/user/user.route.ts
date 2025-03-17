import { Router } from 'express';
import { userController } from './user.controller';
import { AuthGuard } from '../../middleware/auth.guard';
import { validateDto } from '../../middleware/validate';
import { UpdateUserDto } from './dto/update-user.dto';

const userRouter = Router();

userRouter.get('/current', AuthGuard, userController.current); // @ATTENTION: /current must be set earlier than /:id
userRouter.get('/:id', AuthGuard, userController.getById);
userRouter.put('/:id', AuthGuard, validateDto(UpdateUserDto), userController.updateUser);


export { userRouter };