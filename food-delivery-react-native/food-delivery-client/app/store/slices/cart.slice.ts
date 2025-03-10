import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/cart.i';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
} as const;

export type AddToCartPayload = Omit<CartItem, 'id'>;
export type ChangeCountPayload = Pick<CartItem, 'id'> & {
  type: 'inc' | 'dec';
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {

    }
  }
});