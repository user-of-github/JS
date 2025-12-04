import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext) {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);

      if (!requiredRoles) {
        return true;
      }


      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
      const splitted = authHeader.split(' ');

      const [type, token] = splitted;

      if (type !== JwtAuthGuard.AuthHeaderType || !token) {
        throw new UnauthorizedException();
      }

      const user = await this.jwtService.verifyAsync(token);
      req.user = user;

      return user.roles?.some(role => requiredRoles.include(role));
    } catch {
        throw new ForbiddenException('Access forbidden')
    }
  }

}
