import { Prisma } from '@prisma/client';

export const prismaUserSelect: Prisma.UserSelect = {
  email: true,
  name: true,
  id: true,
  bio: true,
  avatarUrl: true,
  birthDate: true,
  location: true
} as const;