import { useTypedSelector } from '@/store/useTypedSelector';

export const useCart = () => {
  const items = useTypedSelector((state) => state.cart.items);

  const total = items.reduce((acc, item) => acc + item.count * item.price, 0);

  return { items, total };
};
