import type { MenuItemType } from './types';

export const menuItems: readonly MenuItemType[] = [
  {
    path: 'Home',
    icon: 'home'
  },
  {
    path: 'Explorer',
    icon: 'shopping-bag'
  },
  {
    path: 'Search',
    icon: 'search'
  },
  {
    path: 'Favourites',
    icon: 'heart'
  },
  {
    path: 'Profile',
    icon: 'user'
  }
] as const;
