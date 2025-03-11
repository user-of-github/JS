import { Dimensions } from '@/core/types/domain/Dimensions';

export interface Product {
  article: string;
  view: string;
  image: string;
  dimensions: Dimensions;
  category: string;
  collectionId?: string;
  price: number;
}
