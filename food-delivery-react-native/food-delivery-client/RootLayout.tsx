import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigation } from '@/navigation/Navigation';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const RootLayout: React.FC = () => {
  return (
    <AppNavigation/>
  )
};