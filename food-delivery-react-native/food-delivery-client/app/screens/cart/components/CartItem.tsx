import React from 'react';
import type { CartItem } from '@/types/cart.i';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Image, TouchableOpacity, View } from 'react-native';
import { AppRoutes } from '@/navigation/routes';
import { getMediaSource } from '@/services/utils';


interface CartItemProps {
  item: CartItem;
}


export const CartRow: React.FC<CartItemProps> = ({ item }) => {
  const { navigate } = useAppNavigation();

  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity
        onPress={() => navigate(AppRoutes.Product.name, { slug: item.product.slug } as any)}
        className="bg-white rounded-xl overflow-hidden p-1.5 flex items-center"
      >
        <Image source={{ uri: getMediaSource(item.product.image)}} width={60} height={60} resizeMode="contain"/>
      </TouchableOpacity>
    </View>
  )
};