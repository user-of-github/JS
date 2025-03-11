import React from 'react';
import { Text } from 'react-native';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { useCart } from '@/features/cart/useCart';

export const CartScreen: React.FC = () => {
  const { total, items } = useCart();

  return (
    <Container>
      <Heading>Cart</Heading>

      { items.length <= 0 && <Text>Cart is empty</Text>}
    </Container>
  );
};
