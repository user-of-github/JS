import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthMethod, User } from '../prisma/types';
import { type Request } from 'express';


@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {

  }


  public async register(request: Request, dto: RegisterDto) {
    const doesExist = await this.userService.findByEmail(dto.email);
    
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

  public async login() {}

  public async logout() {}

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
