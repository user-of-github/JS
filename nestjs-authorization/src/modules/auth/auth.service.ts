import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthMethod, User } from '../prisma/types';
import type { Request, Response } from 'express';
import type { LoginDto } from './dto/login.dto';
import { CryptoService } from '../crypto/crypto.service';


@Injectable()
export class AuthService {
  private readonly sessionNameKey: string;


  public constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService
  ) {
   this.sessionNameKey = this.configService.getOrThrow<string>('SESSION_NAME');
  }


  public async register(request: Request, dto: RegisterDto) {
    const doesExist = await this.userService.findByEmail(dto.email, true);

    if (doesExist) {
      throw new ConflictException('User with such email already exists');
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.Credentials,
      false
    );

    return this.saveSession(request, newUser);
  }

  public async login(request: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email, true);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.cryptoService.verifyPassword(dto.password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('User not found')
    }

    return this.saveSession(request, user);
  }

  public async logout(request: Request, response: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      request.session.destroy(error => {
        if (error) {
          reject(new InternalServerErrorException('Unable to destroy session'));
        }

        response.clearCookie(this.sessionNameKey);
        resolve();
      })
    });
  }

  public async saveSession(request: Request, user: User) {
    return new Promise((resolve, reject) => {
      request.session.userId = user.id;
      request.session.save(err => {
        if (err) {
          console.error(err)
          reject(new InternalServerErrorException('Unable to save session'))
        }

        resolve(user);
      })
    });
  }
}
