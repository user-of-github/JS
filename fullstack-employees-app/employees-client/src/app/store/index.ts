import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import employeeReducer from './slices/employees';
import { AppApi } from '../api';
import { authSaveTokenMiddleware } from './middleware/auth';

export const AppStore = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
    authReducer,
    employeeReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppApi.middleware).prepend(authSaveTokenMiddleware.middleware)
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;