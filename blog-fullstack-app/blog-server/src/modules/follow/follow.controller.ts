import type { Response } from 'express';
import { CustomRequest } from '../../types/server/responses/RequestWithUser';

class FollowController {
  public async follow(req: CustomRequest, res: Response) {

  }

  public async unfollow(req: CustomRequest, res: Response) {

  }
}

export const followController = new FollowController();