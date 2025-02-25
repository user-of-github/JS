import { User, UserWithToken } from '../types';
import { AppApi } from './index';

export type UserData = Omit<User, 'id'>;
type LoginResponseData = Omit<UserWithToken, 'password'>;

export const AuthApi = AppApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation<LoginResponseData, { email: string, password: string }>({
        query: (userData) => ({
          url: '/users/login',
          method: 'POST',
          body: userData
        })
      }),

      register: builder.mutation<LoginResponseData, UserData>({
        query: (userData) => ({
          url: '/users/register',
          method: 'POST',
          body: userData
        })
      }),

      currentUser: builder.query<LoginResponseData, void>({
        query: () => ({
          url: '/users/current',
          method: 'GET'
        })
      })
    };
  }
});

export const { useLoginMutation, useRegisterMutation, useCurrentUserQuery } = AuthApi;
//export const { endpoints: { login, Register, currentUser } } = AuthApi;

