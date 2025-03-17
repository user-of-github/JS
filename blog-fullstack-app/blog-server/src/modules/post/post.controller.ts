import { type CustomRequest } from '../../types/server/responses/RequestWithUser';
import { type Response} from 'express';
import { type CreatePostDto } from './dto/create-post.dto';
import { forbidden, notFound, serverError } from '../../utils/response';
import { prismaService } from '../prisma/prisma.service';
import { IdParam } from '../../types/server/idParam';
import { prismaUserSelect } from '../../mappers/prismaUserSelect';

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
          author: {
            select: prismaUserSelect
          },
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
  }

  public async getById(req: CustomRequest<IdParam>, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    try {
      const post = await prismaService.post.findUnique({
        where: { id },
        include: {
          comments: { include: { author: true } },
          likes: true,
          author: true
        }
      });

      if (!post) {
        return notFound(res, { error: 'Post not found' });
      }

      const postWithLikeInfo = {
        ...post,
        liked: post.likes.some(like => like.userId === userId)
      };

      res.json({ post: postWithLikeInfo });
    } catch (error) {
      serverError(res, error);
    }
  }

  public async delete(req: CustomRequest<IdParam>, res: Response) {
    const { id } = req.params;

    try {
      const post = await prismaService.post.findUnique({ where: { id } });
      if (!post) {
        return notFound(res, { error: 'Post not found' });
      }

      if (post.authorId !== req.user?.id) {
        return forbidden(res, { error: 'Access denied'});
      }

      await prismaService.$transaction([
        prismaService.comment.deleteMany({ where: { postId: id } }),
        prismaService.like.deleteMany({ where: { postId: id } }),
        prismaService.post.delete({ where: { id }})
      ]);

      res.send();
    } catch (error) {
      serverError(res, error);
    }
  }
}

export const postController = new PostController();