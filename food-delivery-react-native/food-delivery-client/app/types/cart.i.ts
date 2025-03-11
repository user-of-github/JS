import type { Product } from '@/types/product.i';

export interface CartItem {
  id: string;
  product: Product;
  count: number;
  price: number;
}
