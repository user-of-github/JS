import { type CustomRequest } from '../../types/server/responses/RequestWithUser';
import { type Response} from 'express';

class PostController {
  public async create(req: CustomRequest, res: Response) {
    res.json({ post: 'Post' });
  }

  public async getAll(req: CustomRequest, res: Response) {
    res.json({ posts: 'Posts' });
  }

  public async getById(req: CustomRequest, res: Response) {
    res.json({ post: 'Post' });
  }

  public async delete(req: CustomRequest, res: Response) {
    res.json({ post: 'Post' });
  }
}

export const postController = new PostController();