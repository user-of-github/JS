import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Auth } from './auth.decorator';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login/access-token')
  @Auth()
  public async refreshTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('register')
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
