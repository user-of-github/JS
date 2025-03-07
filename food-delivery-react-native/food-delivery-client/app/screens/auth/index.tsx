import React from 'react';
import { View } from 'react-native';
import { useAuthMutations } from '@/features/auth/useAuthMutations';
import { Form } from '@/screens/auth/components/Form';
import { Container } from '@/components/layout/Container';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export const AuthScreen: React.FC = () => {
  const { isLoading } = useAuthMutations();

  return (
    <>
      <Container>
        <View className="w-full h-full justify-center flex items-centera">
          <Form />
        </View>
      </Container>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
