import { Drawable } from 'roughjs/bin/core';
import { Coordinate } from '@/core/types/domain/Coordinate';

interface WallCanvasElementLineBase {
  readonly id: string;
  start: Coordinate;
}

export interface WallCanvasElementLine extends WallCanvasElementLineBase {
  readonly type: 'line';
  readonly roughElements: Drawable[];
  end: Coordinate;
  wallThickness: number; // in millimeters
}

export interface WallCanvasElementLineStart extends WallCanvasElementLineBase {
  readonly type: 'lineStart';
}

export type WallCanvasElement = WallCanvasElementLine | WallCanvasElementLineStart;

export interface PanOffset {
  x: number;
  y: number;
}
