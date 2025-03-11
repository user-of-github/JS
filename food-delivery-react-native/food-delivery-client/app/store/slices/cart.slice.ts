import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/cart.i';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
} as const;

type AddToCartPayload = Pick<CartItem, 'product'>;
type ChangeCountPayload = Pick<CartItem, 'id'> & {
  type: 'inc' | 'dec';
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const doesExist = state.items.some((item) => item.product.id === action.payload.product.id);
      const newId = Date.now().toString();
      if (!doesExist) {
        state.items.push({
          product: action.payload.product,
          count: 1,
          id: newId,
          price: action.payload.product.price
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload.id);
    },

    changeCount: (state, action: PayloadAction<ChangeCountPayload>) => {
      const { id, type } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex < 0) {
        return;
      }

      switch (type) {
        case 'inc': {
          if (state.items[itemIndex].count < 100) {
            ++state.items[itemIndex].count;
          }
          break;
        }
        case 'dec': {
          if (state.items[itemIndex].count > 1) {
            --state.items[itemIndex].count;
          } else if (state.items[itemIndex].count === 1) {
            state.items.splice(itemIndex, 1);
          }
          break;
        }
      }
    },

    reset: (state) => {
      state.items = [];
    }
  }
});

export default cartSlice.reducer;

export const cartActions = {
  ...cartSlice.actions
};
