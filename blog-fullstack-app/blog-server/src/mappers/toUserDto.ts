import { User } from '@prisma/client';
import { ResponseUser, ResponseUserFull, UserFull } from '../types/ResponseUser';

export const toUserDtoObject = (user: User): ResponseUser => {
  const { createdAt, updatedAt, password, ...data } = user;
  return data;
};


export const toUserFullDtoObject = (user: UserFull): ResponseUserFull => {
  const { createdAt, updatedAt, password, ...data } = user;
  return data;
};