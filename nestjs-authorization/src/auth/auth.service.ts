import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthMethod, User } from '../prisma/types';


@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {

  }


  public async register(dto: RegisterDto) {
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

    return this.saveSession(newUser);
  }

  public async login() {}

  public async logout() {}

  public async saveSession(user: User) {
    return user;
  }
}
