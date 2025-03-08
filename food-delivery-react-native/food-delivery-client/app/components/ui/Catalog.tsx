import type { Product } from '@/types/product.i';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Heading } from '@/components/ui/Heading';

export interface CatalogProps {
  title?: string;
  products: Product[];
}

export const Catalog: React.FC<CatalogProps> = ({ title, products }) => {
  return (
    <View>
      { title && <Heading>{ title} </Heading>}

      {
        products.length ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No products</Text>
        )
      }
    </View>
  )
};