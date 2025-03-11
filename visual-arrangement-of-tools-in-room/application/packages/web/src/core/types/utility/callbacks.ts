import type { LayoutPreview } from '@/core/types/domain/Layout';
import type { Position } from '@/core/types/domain/Position';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';

export type OnInstalledCallback = (position: Position) => Promise<PositionedProduct>;
export type LayoutPreviewCallback = (layoutPreview: LayoutPreview) => void;
