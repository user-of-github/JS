import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthMethod } from '../prisma/types';
import { CryptoService } from '../crypto/crypto.service';


@Injectable()
export class UserService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService
  ) {}

  public async findById(id: string, notThrow = false) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { 
        accounts: true
      }
    });

    if (!user && !notThrow) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async findByEmail(email: string, notThrow = false) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { 
        accounts: true
      }
    });

    if (!user && !notThrow) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async create(
    email: string, 
    password: string,
    displayName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await this.cryptoService.hashPassword(password) : '',
        picture,
        displayName,
        isVerified,
        method
      }, 
      include: {
        accounts: true
      }
    });

    return user;
  }
}
