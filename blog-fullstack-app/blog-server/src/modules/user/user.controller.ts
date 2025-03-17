import type { Response } from 'express';
import { type CustomRequest } from '../../types/server/responses/RequestWithUser';
import { prismaService } from '../prisma/prisma.service';
import { badRequest, forbidden, notFound, serverError } from '../../utils/response';
import { type UserDetailsResponseDto } from './dto/user-details.dto';
import { toUserFullDtoObject } from '../../mappers/toUserDto';
import { type UpdateUserDto } from './dto/update-user.dto';
import { type IdParam } from '../../types/server/idParam';
import { prismaUserSelect } from '../../mappers/prismaUserSelect';


class UserController {
  public async getById(req: CustomRequest<IdParam>, res: Response) {
    const {id} = req.params;
    const currentUserId = req.user?.id;

    try {
      const user = await prismaService.user.findUnique({
        where: {id},
        include: {followers: true, following: true}
      });

      if (!user) {
        return notFound(res, {error: `User with id ${id} not found`});
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

      res.json({user: response});
    } catch (error) {
      serverError(res, error);
    }
  }

  public async updateUser(req: CustomRequest<IdParam, {}, UpdateUserDto>, res: Response) {
    const {id} = req.params;
    const {email, birthDate, bio, name, location} = req.body;

    const filePath = (req.file && req.file.path) ? req.file.path : null;

    if (id !== req.user?.id) {
      return forbidden(res, {error: 'Access denied. Unable to edit another user'});
    }

    try {
      if (email) {
        const existingUser = await prismaService.user.findFirst({where: {email}});

        if (existingUser && existingUser.id !== id) {
          return badRequest(res, {error: 'Email already exists'});
        }
      }

      const updatedUser = await prismaService.user.update({
        where: {id},
        data: {
          email: email || undefined,
          bio: bio || undefined,
          name: name || undefined,
          location: location || undefined,
          avatarUrl: filePath ? `/${filePath}` : undefined,
          birthDate: birthDate || undefined
        },
        select: prismaUserSelect
      });

      res.json({user: updatedUser});
    } catch (error) {
      serverError(res, error);
    }
  }


  public async current(req: CustomRequest, res: Response) {
    try {
      const user = await prismaService.user.findUnique({
        where: {id: req.user?.id},
        include: {
          followers: {include: {follower: true}},
          following: {include: {following: true}}
        }
      });

      if (!user) {
        return notFound(res, {error: 'User not found'});
      }

      const userResponse = toUserFullDtoObject(user);

      res.json({user: userResponse});
    } catch (error) {
      serverError(res, error);
    }
  }
}

export const userController = new UserController();