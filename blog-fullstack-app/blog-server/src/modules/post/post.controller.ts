import { type CustomRequest } from '../../types/server/responses/RequestWithUser';
import { type Response} from 'express';
import { type CreatePostDto } from './dto/create-post.dto';
import { serverError } from '../../utils/response';
import { prismaService } from '../prisma/prisma.service';

class PostController {
  public async create(req: CustomRequest<{}, {}, CreatePostDto>, res: Response) {
    const { content } = req.body;
    const authorId = req.user!.id;

    try {
      const post = await prismaService.post.create({
        data: { content, authorId}
      });

      res.json({ post });
    } catch (error) {
      serverError(res, error);
    }
  }

  public async getAll(req: CustomRequest, res: Response) {
    const currentUserId = req.user?.id;

    try {
      const posts = await prismaService.post.findMany({
        include: {
          likes: true,
          author: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      const postsWithLikeInfo = posts.map(post => ({
        ...post,
        liked: post.likes.some(like => like.userId === currentUserId)
      }));

      res.json({ posts: postsWithLikeInfo });
    } catch (error) {
      serverError(res, error);
    }

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