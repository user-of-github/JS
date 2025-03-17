import { Router } from 'express';
import { AuthGuard } from '../../middleware/auth.guard';
import { dtoValidator } from '../../middleware/dto.validator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { commentController } from './comment.controller';
import { paramIdValidator } from '../../middleware/idParam.validator';

const commentRouter = Router();

commentRouter.post('/', AuthGuard, dtoValidator(CreateCommentDto), commentController.create);
commentRouter.delete('/:id', AuthGuard, paramIdValidator, commentController.delete);

export { commentRouter };