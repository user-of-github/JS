import { Router } from 'express';
import { followController } from './follow.controller'
import { AuthGuard } from '../../middleware/auth.guard';


const followRouter = Router();

followRouter.post('/follow', AuthGuard, followController.follow);
followRouter.delete('/unfollow/:id', AuthGuard, followController.unfollow);

export { followRouter };