import type { Product } from '@/types/product.i';

export type ProductInCart = Pick<Product, 'id' | 'name' | 'price' | 'image' | 'slug'>;

export interface CartItem {
  id: string;
  product: ProductInCart;
  count: number;
  price: number;
}
