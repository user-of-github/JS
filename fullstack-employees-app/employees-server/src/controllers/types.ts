import { ErrorResponse } from '../types/AppResponse';
import { User } from '@prisma/client';

export type LoginResponse = ErrorResponse | Omit<User, 'password'>;

export type RegisteredUser = Omit<User, 'password'> & {
  token: string;
};

export type RegisterResponse = ErrorResponse | RegisteredUser;