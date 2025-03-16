import { User } from '@prisma/client';
import { ResponseUser } from '../types/ResponseUser';

export const toUserDtoObject = (user: User): ResponseUser => {
  const { createdAt, updatedAt, password, ...data } = user;
  return data;
};