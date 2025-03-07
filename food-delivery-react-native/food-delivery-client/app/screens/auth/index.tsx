import React from 'react';
import { View } from 'react-native';
import { Form } from '@/screens/auth/components/Form';
import { Container } from '@/components/layout/Container';

export const AuthScreen: React.FC = () => {
  return (
    <Container>
      <View className="w-full h-full justify-center flex items-centera">
        <Form />
      </View>
    </Container>
  );
};
