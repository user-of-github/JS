import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './user.model';
import { Auth } from '../../common/decorators/auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({status: 201, type: UserModel })
  @Post()
  public create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({status: 200, type: [UserModel] })
  @Auth()
  @Get()
  public getAll() {
    return this.userService.getAll();
  }
}
