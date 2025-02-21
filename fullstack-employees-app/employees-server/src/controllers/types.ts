import { ErrorResponse } from '../types/AppResponse';
import { User } from '@prisma/client';

export type LoginResponse = ErrorResponse | Omit<User, 'password'>;
export type RegisterResponse = ErrorResponse | Omit<User, 'password'>;