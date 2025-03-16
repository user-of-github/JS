import { User } from '@prisma/client';

export type ResponseUser = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;