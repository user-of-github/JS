import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { AppLayoutPaddings, Container, NoScrollViewContainer } from '@/components/layout/Container';
import { useProductsByCategories } from '@/features/products/useProductsByCategories';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Catalog } from '@/components/ui/catalog/Catalog';

export const ExplorerScreen: React.FC = () => {
  const { products, isLoading } = useProductsByCategories();

  return (
    <NoScrollViewContainer className="h-full">
      <View style={{ paddingVertical: AppLayoutPaddings.vertical, paddingBottom: AppLayoutPaddings.vertical * 2 }}>
        <View className="mb-10" style={{ paddingHorizontal: AppLayoutPaddings.horizontal }}>
          <Heading>Explorer</Heading>
        </View>

        { isLoading && <LoadingSpinner/>}

        { !isLoading && (
          <FlatList
            style={{ paddingHorizontal: AppLayoutPaddings.horizontal}}
            data={products}
            renderItem={({item}) => (
              <Catalog
                products={item.products}
                title={item.name}
                className="my-5"
              />
            )}
          />
        )}

      </View>
    </NoScrollViewContainer>
  );
};
