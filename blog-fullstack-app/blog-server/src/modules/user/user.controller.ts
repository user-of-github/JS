import type { Request, Response } from 'express';
import { CustomRequest } from '../../types/RequestWithUser';
import { prismaService } from '../prisma/prisma.service';
import { notFound, serverError } from '../utils/response';
import { UserDetailsResponseDto } from './dto/user-details.dto';
import { toUserFullDtoObject } from '../../mappers/toUserDto';


class UserController {
  public async getById(req: CustomRequest, res: Response){
    const { id } = req.params;
    const currentUserId = req.user?.id;

    try {
      let user;
      try {
        // because if invalid hex ==> MongoDb just throws error (in Postgres Prisma returns null), so need additional try-catch
        user = await prismaService.user.findUnique({
          where : { id },
          include: { followers: true, following: true }
        });
      } catch {
        return notFound(res, { error: `User with id ${id} not found`});
      }

      if (!user) {
        return notFound(res, { error: `User with id ${id} not found`});
      }

      const doesCurrentUserFollowRequestedUser = await prismaService.follows.findFirst({
        where: {
          AND: [
            {followerId: currentUserId},
            {followingId: id}
          ]
        }
      });

      const response: UserDetailsResponseDto = {
        ...toUserFullDtoObject(user),
        isFollowing: !!doesCurrentUserFollowRequestedUser
      };

      res.json({ user: response });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  }

  public async updateUser(req: CustomRequest, res: Response){
    res.send('Update')
  }


  public async current(req: CustomRequest, res: Response) {
    const { user } = req;

    res.send('current');
  }
}

export const userController = new UserController();