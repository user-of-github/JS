import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizedUser } from '../auth/decorators/authorized-user.decorator';
import { Authorization } from '../auth/decorators/auth.decorator';
import { type User } from '../prisma/types';


@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get('/profile')
  public async findProfile(@AuthorizedUser() user:  User) {
    return user;
  }

  @Authorization()
  @Get('/:id')
  public findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
