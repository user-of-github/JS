import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { useActions } from '@/store/useActions';
import { useCart } from '@/features/cart/useCart';
import type { Product } from '@/types/product.i';

interface AddToCartButtonProps {
  className?: string;
  product: Product;
}


export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className } ) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const isInCart = items.some(cartItem => cartItem.product.id === product.id);

  const add = () => {
    const { description, category, ...neededData} = product;
    addToCart({ product: neededData})
  };

  const remove = () => {
    removeFromCart({ id: product.id });
  }


  return (
    <Button
      className={className}
      onPress={isInCart ? remove : add}
    >
      {
        !isInCart ? (
          <>
            <Feather name="shopping-cart" size={20} color="#FFF" className="mr-3" /> Add to cart
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="cart" size={20} color="#FFF" className="mr-3"/> Remove from cart
          </>
        )
      }
    </Button>
  )
};