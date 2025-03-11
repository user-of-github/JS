import { WallCanvasElementLine } from '@/core/types/WallCanvas';
import { Coordinate } from '@/core/types/domain/Coordinate';

interface DrawingMode {
  readonly type: 'drawing';
}

interface SelectedMode {
  readonly type: 'selected';
  readonly selected: WallCanvasElementLine;
  readonly offsetTowardsElementStart: Coordinate; // to avoid jumping if moving
}

interface MovingMode {
  readonly type: 'moving';
  readonly selected: WallCanvasElementLine;
  readonly offsetTowardsElementStart: Coordinate; // to avoid jumping if moving
}

interface ResizingMode {
  readonly type: 'resizing';
  readonly selected: WallCanvasElementLine;
  readonly selectedPoint: 'start' | 'end';
}

interface PanningMode {
  readonly type: 'panning';
  readonly startPanMousePosition: Coordinate;
}

export interface ViewMode {
  readonly type: 'viewing';
  readonly selected?: WallCanvasElementLine;
}

export type WallsLocalEditMode = ViewMode | DrawingMode | SelectedMode | MovingMode | ResizingMode | PanningMode;
