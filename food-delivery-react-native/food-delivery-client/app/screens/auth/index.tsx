import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text } from 'react-native';
import { TypeRootStackParamList } from '@/navigation/types';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export const AuthScreen: React.FC = () => {
  const { navigate } = useAppNavigation();


  return (
    <View>
      <Pressable onPress={() => navigate('Home')}>
        <Text>Auth</Text>
      </Pressable>
    </View>
  );
};