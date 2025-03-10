import React from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';
import type { Product } from '@/types/product.i';
import { convertPrice, getMediaSource } from '@/services/utils';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';

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
        <View className="bg-white">
          <View className="flex items-center justify-center mb-3 rounded-lg overflow-hidden">
            <Image source={{ uri: getMediaSource(product.image) }} width={100} height={100} resizeMode="contain" />
          </View>
          <View className="px-1 pb-2">
            <Text className="font-semibold text-base" numberOfLines={1}>
              {product.name}
            </Text>
            <Text className="mt-1 font-normal text-sm rounded-full text-center w-[55px] w-fit bg-primary py-0.5 text-white">
              {convertPrice(product.price)}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
