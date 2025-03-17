import { Router } from 'express';
import { AuthGuard } from '../../middleware/auth.guard';
import { likeController } from './like.controller';
import { paramIdValidator } from '../../middleware/idParam.validator';
import { dtoValidator } from '../../middleware/dto.validator';
import { LikeDto } from './dto/like.dto';

const likeRouter = Router();

likeRouter.post('/', AuthGuard, dtoValidator(LikeDto), likeController.like);
likeRouter.delete('/:id', AuthGuard, paramIdValidator, likeController.unlike); // here :id refers to :postId

export { likeRouter };