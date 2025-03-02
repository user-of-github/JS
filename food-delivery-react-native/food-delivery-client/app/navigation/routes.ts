import { AuthScreen } from '@/screens/auth';
import { HomeScreen } from '@/screens/home';
import { Route, TypeRootStackParamList } from './types';

export const AppRoutes: Record<keyof TypeRootStackParamList, Route> = {
  Home: {
    name: 'Home',
    component: HomeScreen
  },

  Auth: {
    name: 'Auth',
    component: AuthScreen
  }
} as const;
