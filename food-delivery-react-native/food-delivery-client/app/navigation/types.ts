import React from 'react';

export type NavigationScreensListType = {
  Auth: undefined;
  Home: undefined;
  Profile: undefined;
  Explorer: undefined;
  Search: undefined;
  Favourites: undefined;
  Cart: undefined;
  Category: { slug: string } | undefined;
  Product: { slug: string } | undefined;
  Orders: undefined;
};

export interface Route {
  name: keyof NavigationScreensListType;
  component: React.ComponentType;
}
