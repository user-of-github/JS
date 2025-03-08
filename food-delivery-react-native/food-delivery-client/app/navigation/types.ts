import React from 'react';

export type NavigationScreensListType = Readonly<{
  Auth: undefined;
  Home: undefined;
  Profile: undefined;
  Explorer: undefined;
  Search: undefined;
  Favourites: undefined;
  Cart: undefined;
  Category: {
    slug: string;
  };
}>;

export interface Route {
  name: keyof NavigationScreensListType;
  component: React.ComponentType;
}
