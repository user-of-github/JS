import React from 'react';
import { View } from 'react-native';
import { useProducts } from '@/features/products/useProducts';
import { Heading } from '@/components/ui/Heading';

export const Products: React.FC = () => {
  const { products, isLoading } = useProducts();

  return (
    <View>
      <Heading>Popular products</Heading>
    </View>
  )
};