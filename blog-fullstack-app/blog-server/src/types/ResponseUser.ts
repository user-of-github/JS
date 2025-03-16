import { User } from '@prisma/client';
import { Follow } from './Follow';

export interface UserFull extends User {
  followers: Follow[];
  following: Follow[];
}

export type ResponseUser = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;
export type ResponseUserFull = Omit<UserFull, 'createdAt' | 'updatedAt' | 'password'>;