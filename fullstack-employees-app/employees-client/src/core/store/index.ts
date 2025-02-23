import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import { AppApi } from '../api';

export const AppStore = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
    authReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppApi.middleware)
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;