import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { AppLayoutPaddings, Container, NoScrollViewContainer } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { useCart } from '@/features/cart/useCart';
import { convertPrice } from '@/services/utils';
import { Button } from '@/components/ui/Button';
import { Feather } from '@expo/vector-icons';
import { CartRow } from '@/screens/cart/components/CartItem';

export const CartScreen: React.FC = () => {
  const { total, items } = useCart();

  return (
    <>
      <NoScrollViewContainer className="min-h-[80%]">
        <View
          style={{
            paddingVertical: AppLayoutPaddings.vertical + AppLayoutPaddings.top,
            paddingBottom: AppLayoutPaddings.vertical * 2,
            paddingHorizontal: AppLayoutPaddings.horizontal,
          }}
        >
        <Heading size="extralarge">Cart</Heading>
        <View className="py-2 border-b-2 border-primary border-dashed mb-4" />

        { items.length <= 0 && <Text>Cart is empty</Text>}

        <View className="max-h-[55vh]">
          <FlatList
            data={items || []}
            renderItem={({ item}) => (
              <CartRow item={item} key={item.id}/>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="my-1 h-[1px] w-full border-dashed border-b border-text-secondary" />}
          />
        </View>
        </View>
      </NoScrollViewContainer>

      {
        items.length && (
          <View className="fixed bottom-5 w-full p-3 py-6 rounded-tl-3xl rounded-tr-3xl bg-primary">
            <Text className="font-bold text-white text-2xl mb-3">
              Total: {convertPrice(total)}
            </Text>
            <Button onPress={() => {}} className="bg-white">
              <View className="flex flex-row items-center justify-center gap-x-3">
                <Feather name="credit-card" size={20} color="#000"/>
                <Text className="text-black text-xl font-semibold">Place order</Text>
              </View>
            </Button>
          </View>
        )
      }
    </>
  );
};
