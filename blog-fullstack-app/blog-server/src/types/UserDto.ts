import { User } from '@prisma/client';

export type UserDto = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;