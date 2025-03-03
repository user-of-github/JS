import { User } from '@/types/user.i';

export type AuthDto = Pick<User, 'email' | 'password'>;

export type RegisterDto = Pick<User, 'email' | 'password' | 'name' | 'phone'>;

export enum EnumSecureStore {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken'
}

export enum EnumAsyncStorage {
  User = 'user'
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}
