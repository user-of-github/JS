import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { type UserRole } from "../../prisma/types";

export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!roles.includes(request.user.role)) {
      throw new ForbiddenException('Not enough rights access for this resource');
    }

    return true;
  }
}