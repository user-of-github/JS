import { Router } from 'express';
import { AuthGuard } from '../../middleware/auth.guard';
import { likeController } from './like.controller';
import { paramIdValidator } from '../../middleware/idParam.validator';

const likeRouter = Router();

likeRouter.post('/', AuthGuard, likeController.like);
likeRouter.delete('/:id', AuthGuard, paramIdValidator, likeController.unlike);

export { likeRouter };