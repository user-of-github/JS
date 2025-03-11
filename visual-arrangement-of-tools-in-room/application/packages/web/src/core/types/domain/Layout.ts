import { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import { Wall } from '@/core/types/domain/Wall';

export interface Layout {
  id: string;
  name: string;
  createdDate: string;
  updatedDate: string;
  walls: Array<Wall>;
  items: Array<PositionedProduct>;
  preview?: string;
}

export type LayoutPreview = Omit<Layout, 'items' | 'walls'>;

export const emptyLayout = Object.freeze({
  walls: [],
  id: '',
  createdDate: '',
  items: [],
  preview: '',
  name: '',
  updatedDate: ''
} as const);
