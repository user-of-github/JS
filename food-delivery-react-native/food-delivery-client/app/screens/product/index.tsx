import React from 'react';
import { Image, View, Text } from 'react-native';
import { useProduct } from '@/features/products/useProduct';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { convertPrice, getMediaSource } from '@/services/utils';
import { GoBackButton } from '@/components/ui/GoBackButton';
import { Button } from '@/components/ui/Button';
import { Feather } from '@expo/vector-icons';

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

  if (!isLoading && !product) {
    return (
      <Container>
        <GoBackButton size="default"/>
        <Heading>Product not found</Heading>
      </Container>
    );
  }

  return (
    <Container>
      <GoBackButton size="default"/>
      <View className="flex flex-col mt-2">
        <View className="items-center justify-center">
          <Image
            source={{ uri: getMediaSource(product?.image || '')}}
            width={245}
            height={245}
          />
        </View>

        <View className="mt-3">
          <Text className="font-bold text-4xl">{product?.name}</Text>
          <Text className="text-lg opacity-70 mt-2">{product?.description}</Text>
          <Text className="text-3xl font-semibold mt-6 text-primary">{convertPrice(product?.price)}</Text>
        </View>

        <Button className="mt-6">
          <Feather name="shopping-cart" size={20} color="#FFF" className="mr-3"/>
          {' '}Add to cart
        </Button>
      </View>
    </Container>
  );
};
