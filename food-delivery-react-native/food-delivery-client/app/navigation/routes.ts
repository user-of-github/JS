import { AuthScreen } from '@/screens/auth';
import { ExplorerScreen } from '@/screens/explorer';
import { FavouritesScreen } from '@/screens/favourites';
import { HomeScreen } from '@/screens/home';
import { ProfileScreen } from '@/screens/profile';
import { SearchScreen } from '@/screens/search';
import { NavigationScreensListType, Route } from './types';

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
