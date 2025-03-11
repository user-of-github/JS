import React from 'react';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useActions } from '@/store/useActions';
import type { CartItem } from '@/types/cart.i';
import { useCart } from '@/features/cart/useCart';
import { IconButton } from '@/components/ui/IconButton';

interface CartItemActionsProps {
  item: CartItem;
}

export const CartItemActions: React.FC<CartItemActionsProps> = ({ item }) => {
  const { changeCount } = useActions();
  const { items } = useCart();

  const count = items.find((cartItem) => cartItem.id === item.id)?.count;

  const inc = () => changeCount({ id: item.id, type: 'inc' });
  const dec = () => changeCount({ id: item.id, type: 'dec' });

  return (
    <View className="flex-row flex items-center gap-x-4">
      <IconButton icon={{ component: <AntDesign name="minus" size={18} /> }} size="small" onPress={dec} />
      <Text className="font-semibold">{count}</Text>
      <IconButton icon={{ component: <AntDesign name="plus" size={18} /> }} size="small" onPress={inc} />
    </View>
  );
};
