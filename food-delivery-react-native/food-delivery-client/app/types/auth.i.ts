import { User } from '@/types/user.i';

export type AuthDto = Pick<User, 'email' | 'password'>;

export type RegisterDto = Pick<User, 'email' | 'password' | 'name' | 'phone'>;
