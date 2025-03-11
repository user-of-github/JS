import { v4 } from 'uuid';
import { WallCanvasElement, type WallCanvasElementLine } from '@/core/types/WallCanvas';
import { DEFAULT_HEIGHT } from '@/core/types/domain/Dimensions';
import { Wall } from '@/core/types/domain/Wall';
import type { CanvasWallElementsCreator } from '@/core/viewer/CanvasWallElementsCreator';
import { calculateDistance } from '@/core/viewer/utils/utilsCanvas';

export const wallCanvasElementsToPositionedWalls = (wallCanvasElements: ReadonlyArray<WallCanvasElement>): Wall[] => {
  return wallCanvasElements
    .filter((element): element is WallCanvasElementLine => element.type === 'line')
    .map<Wall>((wallCanvasElement) => ({
      start: wallCanvasElement.start,
      end: wallCanvasElement.end,
      dimensions: {
        length: calculateDistance(wallCanvasElement.start, wallCanvasElement.end),
        height: DEFAULT_HEIGHT,
        width: wallCanvasElement.wallThickness
      },
      material: { type: 'color', color: '#000' },
      id: v4()
    }));
};

export const wallsToWallCanvasElements = (
  walls: ReadonlyArray<Wall>,
  elementsCreator: CanvasWallElementsCreator
): WallCanvasElementLine[] => {
  return walls.map((wall) => {
    return {
      start: wall.start,
      end: wall.end,
      type: 'line',
      wallThickness: wall.dimensions.width,
      id: v4(),
      roughElements: elementsCreator.createRoughLine(wall.start, wall.end, wall.dimensions.width)
    };
  });
};
