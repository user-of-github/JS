import React from 'react';
import { SectionList, View } from 'react-native';
import { useProducts } from '@/features/products/useProducts';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Catalog } from '@/components/ui/catalog/Catalog';

export const Products: React.FC = () => {
  const { products, isLoading } = useProducts(4);

  return (
    <View className="mt-12 pb-20">
      <Heading>Popular products</Heading>

      {isLoading && <LoadingSpinner />}

      {!isLoading && <Catalog products={products || []} />}
    </View>
  );
};
