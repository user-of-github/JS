import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { UserModel } from '../user/user.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({status: 200 })
  @Post('/login')
  public login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({status: 201 })
  @Post('/register')
  public register(@Body() credentials: RegisterDto) {
    return this.authService.register(credentials);
  }
}
