import { ExecutionContext, type CanActivate, UnauthorizedException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public static readonly AuthHeaderType = 'Bearer';

  public constructor(private readonly jwtService: JwtService) {
  }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const splitted = authHeader.split(' ');

      const [type, token] = splitted;

      if (type !== JwtAuthGuard.AuthHeaderType || !token) {
        throw new UnauthorizedException();
      }

      const user = await this.jwtService.verifyAsync(token);
      request.user = user;
      return true;
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException('Not authorized');
    }
  }

}
