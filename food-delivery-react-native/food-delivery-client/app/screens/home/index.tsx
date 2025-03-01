import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { Container } from '@/components/layout/Container';

export const HomeScreen: React.FC = () => {
  const { navigate } = useAppNavigation();


  return (
    <Container>
      <Text>Home</Text>
      <Button title="Go to auth" onPress={() => navigate('Auth')}/>
    </Container>
  );
};
