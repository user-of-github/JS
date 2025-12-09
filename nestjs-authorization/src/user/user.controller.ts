import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizedUser } from 'src/auth/decorators/authorized-user.decorator';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { type User } from '../prisma/types';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get('/profile')
  public async findProfile(@AuthorizedUser() user:  User) {
    return user;
  }
}
