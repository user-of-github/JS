import { User } from '@/types/user.i';

export type AuthDto = Pick<User, 'email' | 'password'>;
