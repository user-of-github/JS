import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type User } from '../../prisma/types';

export const AuthorizedUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      return data ? user[data] : user;
  }
);

// Usage example:
// @AuthorizedUser('displayName') name: string
// @AuthorizedUser() user: User