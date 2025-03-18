import { Router } from 'express';
import { followController } from './follow.controller'
import { AuthGuard } from '../../middleware/auth.guard';
import { dtoValidator } from '../../middleware/dto.validator';
import { FollowDto } from './dto/follow.dto';


const followRouter = Router();

followRouter.post('/follow', AuthGuard, dtoValidator(FollowDto), followController.follow);
followRouter.delete('/unfollow/:id', AuthGuard, dtoValidator(FollowDto), followController.unfollow);

export { followRouter };