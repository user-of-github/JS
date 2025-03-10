import React from 'react';
import { View } from 'react-native';
import { useProduct } from '@/features/products/useProduct';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const ProductScreen: React.FC = () => {
  const { isLoading, product, route } = useProduct();

  if (isLoading) {
    return (
      <Container>
        <Heading>{route}</Heading>

        <View className="mt-5">
          <LoadingSpinner />
        </View>
      </Container>
    );
  }

  if (!isLoading && !product) {
    return (
      <Container>
        <Heading>Product not found</Heading>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex flex-col items-center justify-center mt-4"></View>
    </Container>
  );
};
