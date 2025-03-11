import { Position } from '@/core/types/domain/Position';
import { Product } from '@/core/types/domain/Product';

export interface PositionedProduct extends Product {
  position: Position;
  id: string;
}
