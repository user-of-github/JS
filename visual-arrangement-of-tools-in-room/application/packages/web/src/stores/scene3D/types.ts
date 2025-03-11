import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import type { Product } from '@/core/types/domain/Product';

interface OverviewMode {
  type: 'overview';
}

export interface InstallationMode {
  type: 'installation';
  item: Readonly<Product>;
}

export interface SelectedMode {
  type: 'selected';
  selected: Readonly<PositionedProduct>;
}

export interface MovingMode {
  type: 'moving';
  selected: Readonly<PositionedProduct>;
}

export type SceneEditMode = OverviewMode | SelectedMode | InstallationMode | MovingMode;
