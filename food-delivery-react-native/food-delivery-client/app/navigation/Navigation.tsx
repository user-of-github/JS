import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootStackParamList } from '@/navigation/types';
import { AppRoutes } from '@/navigation/routes';

const Stack = createNativeStackNavigator<TypeRootStackParamList>();


export const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade'
      }}>
        <Stack.Screen {...AppRoutes.Home} key="Home"/>
        <Stack.Screen {...AppRoutes.Auth} key="Auth"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};