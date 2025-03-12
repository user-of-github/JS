import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  public async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  public async refreshTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: result.id
      }
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid refresh token or user does not exist'
      );
    }

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  public async register(dto: RegisterDto) {
    const oldUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (oldUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: faker.image.avatar(),
        phone: dto.phone,
        password: await hash(dto.password)
      }
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1d'
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d'
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User): { id: string; email: string } {
    return {
      id: user.id,
      email: user.email
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await verify(user.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
