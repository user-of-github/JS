import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../modules/auth/roles.guard';

export function AccessWithRoles() {
  return applyDecorators(
    UseGuards(RolesGuard)
  );
}
