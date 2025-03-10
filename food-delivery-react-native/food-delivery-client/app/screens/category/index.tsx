import React from 'react';
import { Image, View } from 'react-native';
import { getMediaSource } from '@/services/utils';
import { useCategory } from '@/features/categories/useCategory';
import { useAppRoute } from '@/navigation/useAppRoute';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Catalog } from '@/components/ui/catalog/Catalog';

export const CategoryScreen: React.FC = () => {
  const { route, category, isLoading, products } = useCategory();

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

  if (!isLoading && !category) {
    return (
      <Container>
        <Heading>Category not found</Heading>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex flex-row items-end justify-between relative gap-x-2 p-2 pb-4 border-b border-dashed border-b-primary">
        <Heading size="page">{category?.name}</Heading>

        <Image source={{ uri: getMediaSource(category?.image || '') }} width={40} height={40} resizeMode="cover" />
      </View>

      <View className="mt-5">
        <Catalog products={products || []} />
      </View>
    </Container>
  );
};
