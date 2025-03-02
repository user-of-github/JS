import React from 'react';
import { Pressable, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TypeRootStackParamList } from '@/navigation/types';
import { AuthForm } from '@/screens/auth/components/AuthForm';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export const AuthScreen: React.FC = () => {
  const { navigate } = useAppNavigation();

  return (
    <Container>
      <View className="w-full h-full justify-center flex items-center">
        <AuthForm />
      </View>
    </Container>
  );
};
