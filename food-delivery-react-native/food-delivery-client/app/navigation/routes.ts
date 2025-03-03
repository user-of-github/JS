import { AuthScreen } from '@/screens/auth';
import { HomeScreen } from '@/screens/home';
import { Route, NavigationScreensListType } from './types';
import { ProfileScreen } from '@/screens/profile';
import { ExplorerScreen } from '@/screens/explorer';
import { SearchScreen } from '@/screens/search';
import { FavouritesScreen } from '@/screens/favourites';

export const AppRoutes: Record<keyof NavigationScreensListType, Route> = {
  Home: {
    name: 'Home',
    component: HomeScreen
  },

  Auth: {
    name: 'Auth',
    component: AuthScreen
  },

  Profile: {
    name: 'Profile',
    component: ProfileScreen
  },

  Explorer: {
    name: 'Explorer',
    component: ExplorerScreen
  },

  Search: {
    name: 'Search',
    component: SearchScreen
  },

  Favourites: {
    name: 'Favourites',
    component: FavouritesScreen
  }
} as const;
