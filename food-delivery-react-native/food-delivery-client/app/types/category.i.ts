import type { Product } from './product.i';

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}