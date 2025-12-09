import { Injectable, UnauthorizedException, type CanActivate, type ExecutionContext } from "@nestjs/common";
import { UserService } from "../../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.session?.userId) {
      throw new UnauthorizedException('Not authorized. No access to resource');
    }

    const user = await this.userService.findById(request.session.userId);

    if (!user) {
      throw new UnauthorizedException('Not authorized. No access to resource'); 
    }

    request.user = user;

    return true;
  }
}