import { Route, TypeRootStackParamList } from './types';
import { HomeScreen } from '@/screens/home';
import { AuthScreen } from '@/screens/auth';

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