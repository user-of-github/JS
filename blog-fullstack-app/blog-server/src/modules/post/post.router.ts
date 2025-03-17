import { Router } from 'express';
import { dtoValidator } from '../../middleware/dto.validator';
import { postController } from './post.controller';
import { AuthGuard } from '../../middleware/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { paramIdValidator } from '../../middleware/idParam.validator';

const postRouter = Router();

postRouter.post('/', AuthGuard, dtoValidator(CreatePostDto), postController.create);
postRouter.get('/', AuthGuard, postController.getAll);
postRouter.get('/:id', AuthGuard, paramIdValidator, postController.getById);
postRouter.delete('/:id', AuthGuard, paramIdValidator, postController.delete);


export { postRouter };