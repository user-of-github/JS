import { type Response } from 'express';
import { type CustomRequest } from '../../types/server/responses/RequestWithUser';
import { type CreateCommentDto } from './dto/create-comment.dto';
import { prismaService } from '../prisma/prisma.service';
import { forbidden, notFound, serverError } from '../../utils/response';
import { IdParam } from '../../types/server/idParam';

class CommentController {
  public async create(req: CustomRequest<{}, {}, CreateCommentDto>, res: Response) {
    try {
      const authorId = req.user!.id;
      const { postId, content } = req.body;

      const comment = await prismaService.comment.create({
        data: { postId, content, authorId }
      });

      res.json({ comment });
    } catch (error) {
      serverError(res, error);
    }
  }

  public async delete(req: CustomRequest<IdParam>, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    try {
      const comment = await prismaService.comment.findUnique({ where: { id } });

      if (!comment) {
        return notFound(res, { error: 'Comment not found' });
      }

      if (comment.authorId !== userId) {
        return forbidden(res);
      }

      await prismaService.comment.delete({ where: { id } });

      res.send();
    } catch (error) {
      serverError(res, error);
    }
  }
}

export const commentController = new CommentController();