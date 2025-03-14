import React from 'react';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { useCategory } from '@/features/categories/useCategory';
import { View, Text } from 'react-native';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { GoBackButton } from '@/components/ui/GoBackButton';
import { useGetAllOrders } from '@/features/orders/useOrders';
import type { Order } from '@/types/order.i';
import { convertPrice } from '@/services/utils';

export const OrdersScreen: React.FC = () => {
  const { isLoading, orders } = useGetAllOrders();

  if (isLoading) {
    return (
      <Container>
        <GoBackButton size="small" />

        <Heading>Orders</Heading>

        <View className="mt-5">
          <LoadingSpinner />
        </View>
      </Container>
    );
  }

  if (!isLoading && (!orders || orders.length === 0) ) {
    return (
      <Container>
        <GoBackButton size="small" />
        <Heading>Orders</Heading>
      </Container>
    );
  }

  return (
    <Container>
      <GoBackButton size="small" />

      <Heading>Orders</Heading>

      <View className="flex flex-col gap-y-1 mt-3">
        {
          orders?.map((order: Order) => (
            <View className="rounded-lg flex flex-row items-center justify-between w-full max-w-full py-2 bg-secondary px-3" key={order.id}>
              <View>
                <Text className="text-white font-light text-lg">{new Date(order.createdAt).toLocaleString()}</Text>
                <Text className="text-white mt-1">Total items: {order.total}</Text>
                <Text className="text-white font-black">Price: {convertPrice(order.items.reduce((acc, curr) => acc + curr.price * curr.count, 0))}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </Container>
  );
};
