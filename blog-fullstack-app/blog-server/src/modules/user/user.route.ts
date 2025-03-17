import { Router } from 'express';
import { userController } from './user.controller';
import { AuthGuard } from '../../middleware/auth.guard';
import { dtoValidator } from '../../middleware/dto.validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { paramIdValidator } from '../../middleware/idParam.validator';

const userRouter = Router();

userRouter.get('/current', AuthGuard, userController.current); // @ATTENTION: /current must be set earlier than /:id
userRouter.get('/:id', AuthGuard, paramIdValidator, userController.getById);
userRouter.put('/:id', AuthGuard, paramIdValidator, dtoValidator(UpdateUserDto), userController.updateUser);


export { userRouter };