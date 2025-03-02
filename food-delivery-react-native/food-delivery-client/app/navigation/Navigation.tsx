import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from '@/navigation/routes';
import { TypeRootStackParamList } from '@/navigation/types';
import { useAuth } from '@/features/auth/AuthProvider';

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

export const AppNavigation: React.FC = () => {
  const { user } = useAuth();


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}
      >
        {
          user ? (
              <>
                <Stack.Screen {...AppRoutes.Home} key="Home" />
              </>
          ) : (
            <Stack.Screen {...AppRoutes.Auth} key="Auth" />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
