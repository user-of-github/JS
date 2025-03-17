import { type Response } from 'express';
import { type CustomRequest } from '../../types/server/responses/RequestWithUser';

class CommentController {
  public async create(req: CustomRequest, res: Response) {

  }
}

export const commentController = new CommentController();