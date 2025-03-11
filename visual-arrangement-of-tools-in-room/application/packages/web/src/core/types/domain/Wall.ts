import type { Coordinate } from '@/core/types/domain/Coordinate';
import { Dimensions } from '@/core/types/domain/Dimensions';
import { Material } from '@/core/types/domain/Material';

export interface Wall {
  start: Coordinate;
  end: Coordinate;
  dimensions: Dimensions;
  material: Material;
  id: string;
}
