import type { Response } from 'express';
import { type CustomRequest } from '../../types/server/responses/RequestWithUser';
import { FollowDto } from './dto/follow.dto';
import { badRequest, serverError } from '../../utils/response';
import { prismaService } from '../prisma/prisma.service';
import { StatusCode } from '../../config/server';

class FollowController {
  public async follow(req: CustomRequest<{}, {}, FollowDto>, res: Response) {
    const { followingId } = req.body;
    const userId = req.user!.id;

    if (followingId === userId) {
      return badRequest(res, { error: 'You can not follow yourself' });
    }

    try {
      const existingSubscription = await prismaService.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId}
          ]
        }
      });

      await prismaService.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId },}
        }
      });

      res.status(StatusCode.Created).send();

      if (!existingSubscription) {
        return badRequest(res, { error: 'You are already following it' });
      }
    } catch (error) {
      serverError(res, error);
    }
  }

  public async unfollow(req: CustomRequest, res: Response) {
    const { followingId } = req.body;
    const userId = req.user!.id;

    try {
      const follows = await prismaService.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId }
          ]
        }
      });

      if (!follows) {
        return badRequest(res, { error: 'You are not following it yet' });
      }

      await prismaService.follows.delete({
        where: { id: follows.id }
      });

      res.send();
    } catch (error) {
      serverError(res, error);
    }
  }
}

export const followController = new FollowController();