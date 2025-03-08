import React from 'react';
import { FlatList, Text, View } from 'react-native';
import type { Product } from '@/types/product.i';
import { DynamicGrid } from '@/components/layout/Grid';
import { Heading } from '@/components/ui/Heading';
import { ProductItem } from '@/components/ui/catalog/ProductItem';

export interface CatalogProps {
  title?: string;
  products: Product[];
}

export const Catalog: React.FC<CatalogProps> = ({ title, products }) => {
  return (
    <View>
      {title && <Heading>{title} </Heading>}

      {products.length ? (
        <DynamicGrid
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <ProductItem product={item} />}
          numColumns={3}
          gap={5}
        />
      ) : (
        <Text>No products</Text>
      )}
    </View>
  );
};
