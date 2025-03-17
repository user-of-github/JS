import type { Response } from 'express';
import { CustomRequest } from '../../types/server/responses/RequestWithUser';
import { IdParam } from '../../types/server/idParam';
import type { LikeDto } from './dto/like.dto';
import { badRequest, serverError } from '../../utils/response';
import { prismaService } from '../prisma/prisma.service';

class LikeController {
  public async like(req: CustomRequest<{}, {}, LikeDto>, res: Response) {
    const { postId } = req.body;
    const userId = req.user!.id;

    try {
      const existingLike = await prismaService.like.findFirst({
        where: { postId, userId }
      });

      if (existingLike) {
        return badRequest(res, { error: 'You have already liked this post' });
      }

      await prismaService.like.create({
        data: { postId, userId}
      });

      res.send();
    } catch (error) {
      serverError(res, error);
    }
  }

  public async unlike(req: CustomRequest<IdParam>, res: Response) {
    const { id: postId } = req.params;
    const userId = req.user!.id;

    try {
      const existingLike = await prismaService.like.findFirst({
        where: { postId, userId }
      });

      if (!existingLike) {
        return badRequest(res, { error: 'You have not liked this post yet. Unable to unlike' });
      }

      await prismaService.like.deleteMany({
        where: { postId, userId }
      });

      res.send();
    } catch (error) {
      serverError(res, error);
    }
  }
}


export const likeController = new LikeController();