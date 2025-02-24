import { UserWithToken } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { AuthApi } from '../../api/auth';
import { RootState } from '../index';
import { jwtTokenLSKey } from '../../constants';

interface AuthSliceState {
  user: UserWithToken | null;
  isAuthenticated: boolean;
}

const initialState: AuthSliceState = {
  user: null,
  isAuthenticated: false
} as const;


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(jwtTokenLSKey);
      return initialState;
    }
  },

  extraReducers: builder => {
    builder
      .addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(AuthApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(AuthApi.endpoints.currentUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  }
});


export default authSlice.reducer;
export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.authReducer.isAuthenticated;
export const selectUser = (state: RootState) => state.authReducer.user;