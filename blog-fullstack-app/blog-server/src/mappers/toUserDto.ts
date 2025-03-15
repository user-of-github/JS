import { User } from '@prisma/client';
import { UserDto } from '../types/UserDto';

export const toUserDtoObject = (user: User): UserDto => {
  const { createdAt, updatedAt, password, ...data } = user;
  return data;
};