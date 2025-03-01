import React from 'react';

export type TypeRootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

export interface Route {
  name: keyof TypeRootStackParamList;
  component: React.ComponentType;
}
