import { Router } from 'express';
import { validateDto } from '../../middleware/validate';
import { postController } from './post.controller';
import { AuthGuard } from '../../middleware/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

const postRouter = Router();

postRouter.post('/', AuthGuard, validateDto(CreatePostDto), postController.create);
postRouter.get('/', AuthGuard, postController.getAll);
postRouter.get('/:id', AuthGuard, postController.getById);
postRouter.delete('/:id', AuthGuard, postController.delete);


export { postRouter };