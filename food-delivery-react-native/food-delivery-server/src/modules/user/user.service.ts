import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { returnUserObject } from './returnUser.object';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getById(id: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        ...returnUserObject,
        favourites: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            slug: true,
            category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async toggleFavourite(userId: string, productId: string) {
    const user = await this.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const doesExist = user.favourites.some(
      (product) => product.id === productId
    );

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        favourites: {
          [doesExist ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    });

    return { message: 'success' };
  }
}
