import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../auth/user.decorator';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  public async getProfile(@CurrentUser('id') id: string) {
    return await this.userService.getById(id);
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favourites/:productId')
  public async toggleFavourite(@CurrentUser('id') id: string, @Param('productId') productId: string) {
    return await this.userService.toggleFavourite(id, productId);
  }
}
