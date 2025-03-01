import React from 'react';

export type TypeRootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

export interface Route {
  name: string;
  component: React.ComponentType;
}
