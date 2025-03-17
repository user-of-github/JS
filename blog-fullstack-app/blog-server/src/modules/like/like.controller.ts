import type { Response } from 'express';
import { CustomRequest } from '../../types/server/responses/RequestWithUser';
import { IdParam } from '../../types/server/idParam';

class LikeController {
  public async like(req: CustomRequest, res: Response) {

  }

  public async unlike(req: CustomRequest<IdParam>, res: Response) {

  }
}


export const likeController = new LikeController();