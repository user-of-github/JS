import React from 'react';
import { Pressable, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TypeRootStackParamList } from '@/navigation/types';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Form } from '@/screens/auth/components/Form';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export const AuthScreen: React.FC = () => {
  const { navigate } = useAppNavigation();

  return (
    <Container>
      <View className="w-full h-full justify-center flex items-centera">
        <Form />
      </View>
    </Container>
  );
};
