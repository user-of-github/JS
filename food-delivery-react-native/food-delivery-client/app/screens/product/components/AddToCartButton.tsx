import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useActions } from '@/store/useActions';
import type { Product } from '@/types/product.i';
import { useCart } from '@/features/cart/useCart';
import { Button } from '@/components/ui/Button';

interface AddToCartButtonProps {
  className?: string;
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className }) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const isInCart = items.some((cartItem) => cartItem.product.id === product.id);

  const add = () => {
    const { description, category, ...neededData } = product;
    addToCart({ product: neededData });
  };

  const remove = () => {
    removeFromCart({ id: product.id });
  };

  return (
    <Button className={className} onPress={isInCart ? remove : add}>
      {!isInCart ? (
        <>
          <Feather name="shopping-cart" size={20} color="#FFF" className="mr-3" /> Add to cart
        </>
      ) : (
        <>
          <MaterialCommunityIcons name="cart" size={20} color="#FFF" className="mr-3" /> Remove from cart
        </>
      )}
    </Button>
  );
};
