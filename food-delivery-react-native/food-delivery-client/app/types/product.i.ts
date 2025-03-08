import type { Category } from '@/types/category.i';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}
