import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text, TouchableHighlight } from 'react-native';
import { TypeRootStackParamList } from '@/navigation/types';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { Container } from '@/components/layout/Container';
import { AuthForm } from '@/screens/auth/components/AuthForm';
import { Button } from '@/components/ui/Button';

export const AuthScreen: React.FC = () => {
  const { navigate } = useAppNavigation();


  return (
    <Container>
      <Button onPress={() => navigate('Home')}>Go home</Button>
      <View className="w-full h-full justify-center flex items-center">
        <AuthForm/>
      </View>
    </Container>
  );
};