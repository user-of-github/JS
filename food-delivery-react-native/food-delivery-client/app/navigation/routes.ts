import { AuthScreen } from '@/screens/auth';
import { CartScreen } from '@/screens/cart';
import { CategoryScreen } from '@/screens/category';
import { ExplorerScreen } from '@/screens/explorer';
import { FavouritesScreen } from '@/screens/favourites';
import { HomeScreen } from '@/screens/home';
import { ProfileScreen } from '@/screens/profile';
import { SearchScreen } from '@/screens/search';
import { NavigationScreensListType, Route } from './types';

export const AppRoutes: Record<keyof NavigationScreensListType, Route> = Object.freeze({
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
  },

  Cart: {
    name: 'Cart',
    component: CartScreen
  },

  Category: {
    name: 'Category',
    component: CategoryScreen
  }
} as const);
