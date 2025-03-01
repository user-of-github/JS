import { Route } from './types';
import { HomeScreen } from '@/screens/home';
import { AuthScreen } from '@/screens/auth';

export const AppRoutes: readonly Route[] = [{
    name: 'Home',
    component: HomeScreen
}, {
    name: 'Auth',
    component: AuthScreen
}] as const;