import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../utils/crypto.service';
import { UserModel } from '../user/user.model';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {}


  public async login(credentials: LoginDto) {
    const user = await this.validateUser(credentials);
    return this.generateToken(user);
  }


  public async register(credentials: RegisterDto) {
    const existingUser = await this.userService.getUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestException('User with such email already exists');
    }

    const hashedPassword = await this.cryptoService.hash(credentials.password);
    const user = await this.userService.createUser({ ...credentials, password: hashedPassword });

    return this.generateToken(user);
  }


  private async generateToken(user: UserModel) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  private async validateUser(credentials: LoginDto) {
    const user = await this.userService.getUserByEmail(credentials.email);
    const Unauthorized = new UnauthorizedException('Email or password is invalid');

    if (!user) {
      throw Unauthorized;
    }

    console.log('credentials.password, user.password');
    console.log(credentials.password, user.email)

    const verifyPasswords = await this.cryptoService.verify(credentials.password, user.password);

    if (!verifyPasswords) {
      throw Unauthorized;
    }

    return user;
  }
}
