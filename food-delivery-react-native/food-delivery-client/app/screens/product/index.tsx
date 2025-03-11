import React from 'react';
import { Image, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { convertPrice, getMediaSource } from '@/services/utils';
import { useProduct } from '@/features/products/useProduct';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { FavouriteButton } from '@/screens/product/components/FavouriteButton';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { GoBackButton } from '@/components/ui/GoBackButton';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AddToCartButton } from '@/screens/product/components/AddToCartButton';

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

  if (!product) {
    return (
      <Container>
        <GoBackButton size="default" />
        <Heading>Product not found</Heading>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex flex-row items-center justify-between w-full">
        <GoBackButton size="small" />
        <FavouriteButton productId={product?.id || ''} />
      </View>
      <View className="flex flex-col mt-2">
        <View className="items-center justify-center">
          <Image source={{ uri: getMediaSource(product?.image || '') }} width={245} height={245} resizeMode="contain" />
        </View>

        <View className="mt-3">
          <Text className="font-bold text-4xl">{product?.name}</Text>
          <Text className="text-lg opacity-70 mt-2">{product?.description}</Text>
          <Text className="text-3xl font-semibold mt-6 text-primary">{convertPrice(product?.price)}</Text>
        </View>

        <AddToCartButton className="mt-5" product={product}/>
      </View>
    </Container>
  );
};
