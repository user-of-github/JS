import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootStackParamList } from '@/navigation/types';
import { AppRoutes } from '@/navigation/routes';

const Stack = createNativeStackNavigator<TypeRootStackParamList>();


export const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          AppRoutes.map(route => (
            <Stack.Screen {...route} key={route.name}/>
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};