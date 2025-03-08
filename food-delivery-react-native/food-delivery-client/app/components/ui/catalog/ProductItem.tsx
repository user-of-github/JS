import React from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import type { Product } from '@/types/product.i';
import { getMediaSource } from '@/services/utils';

interface ProductItemsProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemsProps> = ({ product }) => {
  const { navigate } = useAppNavigation();

  return (
    <View className="w-full rounded-lg flex overflow-hidden">
      <TouchableNativeFeedback
        onPress={() => {
          navigate(AppRoutes.Product.name, { slug: product.slug } as any);
        }}
        key={product.id}
        background={TouchableNativeFeedback.Ripple('#ccc', false)}
      >
        <View className="bg-white py-3 flex items-center justify-center">
        <Image
          source={{ uri: getMediaSource(product.image) }}
          width={100}
          height={100}
          resizeMode="cover"
        />
          <Text>{product.name}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
};