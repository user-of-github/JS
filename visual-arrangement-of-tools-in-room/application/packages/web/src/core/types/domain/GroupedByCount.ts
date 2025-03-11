import type { Product } from './Product';

export interface GroupedProductByCount extends Product {
  count: number;
}
