import type { MenuItemType } from './types';

export const menuItems: readonly MenuItemType[] = [
  {
    path: 'Home',
    icon: 'home'
  },
  {
    path: 'Favourites',
    icon: 'heart'
  },
  {
    path: 'Search',
    icon: 'search'
  },
  {
    path: 'Explorer',
    icon: 'shopping-bag'
  },
  {
    path: 'Profile',
    icon: 'user'
  }
] as const;
