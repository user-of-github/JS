import React from 'react';
import { Text } from 'react-native';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { authService } from '@/services/auth/auth.service';
import { useAuthMutations } from '@/features/auth/useAuthMutations';

export const ProfileScreen: React.FC = () => {
  const { logout } = useAuthMutations();

  return (
    <Container>
      <Text>Profile</Text>
      <Button onPress={logout}>Log out</Button>
    </Container>
  );
};
