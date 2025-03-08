import React from 'react';
import type { NavigationContainerRefWithCurrent } from '@react-navigation/core/src/types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/features/auth/AuthProvider';
import { AppRoutes } from '@/navigation/routes';
import { NavigationScreensListType } from '@/navigation/types';

const Stack = createNativeStackNavigator<NavigationScreensListType>();

interface AppNavigationProps {
  navigationContainerRef?: NavigationContainerRefWithCurrent<any>;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({ navigationContainerRef }) => {
  const { user } = useAuth();

  return (
    <NavigationContainer ref={navigationContainerRef as any}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none'
        }}
      >
        {user ? (
          <>
            <Stack.Screen {...AppRoutes.Home} key="Home" />
            <Stack.Screen {...AppRoutes.Search} key="Search" />
            <Stack.Screen {...AppRoutes.Explorer} key="Explorer" />
            <Stack.Screen {...AppRoutes.Profile} key="Profile" />
            <Stack.Screen {...AppRoutes.Favourites} key="Favourites" />
            <Stack.Screen {...AppRoutes.Cart} key="Cart" />
          </>
        ) : (
          <Stack.Screen {...AppRoutes.Auth} key="Auth" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
