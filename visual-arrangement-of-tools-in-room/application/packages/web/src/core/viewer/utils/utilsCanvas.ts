import { Formatter } from '@/core/services/Formatter';
import { type PanOffset, WallCanvasElementLine } from '@/core/types/WallCanvas';
import { Coordinate } from '@/core/types/domain/Coordinate';
import type { Constraints } from '@/core/types/utility/Constraints';
import { DPI, WALLS_SCALING } from '@/core/viewer/utils/canvasConstants';
import { localization } from '@/stores/Localization';
import type { ItemByPositionResult } from '@/stores/walls/WallsEditStore';

export const scaleCoordinates = (coordinate: Readonly<Coordinate>, dpi: number): Coordinate => {
  return { x: coordinate.x * dpi, y: coordinate.y * dpi };
};

export const areCoordinatesEqual = (a: Readonly<Coordinate>, b: Readonly<Coordinate>): boolean => {
  return a.x === b.x && a.y === b.y;
};

export const calculateDistance = (a: Readonly<Coordinate>, b: Readonly<Coordinate>): number => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

/**
For determining object selection on wall canvas
 */
export const isWithinCanvasElement = (clickCoordinate: Coordinate, wallCanvasElementLine: WallCanvasElementLine): boolean => {
  const rangeValue = (wallCanvasElementLine.wallThickness / DPI) * WALLS_SCALING * 0.125; //((wallCanvasElementLine.wallThickness * 0.5) / DPI) * 0.0625;
  const a: Coordinate = {
    x: wallCanvasElementLine.start.x,
    y: wallCanvasElementLine.start.y
  };
  const b: Coordinate = {
    x: wallCanvasElementLine.end.x,
    y: wallCanvasElementLine.end.y
  };
  const c: Coordinate = clickCoordinate;

  const offset = calculateDistance(a, b) - (calculateDistance(a, c) + calculateDistance(b, c));

  return Math.abs(offset) < rangeValue;
};

export const getMouseCoordinateTowardsWallCanvasHtml = (
  event: MouseEvent,
  canvasHtmlElement: HTMLCanvasElement,
  panOffset: PanOffset
): Coordinate => {
  const { clientX, clientY } = event;
  const boundingClientRectangle: DOMRect = canvasHtmlElement.getBoundingClientRect();

  const x: number = clientX - boundingClientRectangle.left - panOffset.x / DPI;
  const y: number = clientY - boundingClientRectangle.top - panOffset.y / DPI;

  return { x, y };
};

export const getMouseCoordinateTowardsElement = (event: MouseEvent | PointerEvent, canvasHtmlElement: HTMLElement): Coordinate => {
  const { clientX, clientY } = event;
  const boundingClientRectangle: DOMRect = canvasHtmlElement.getBoundingClientRect();

  const x: number = clientX - boundingClientRectangle.left;
  const y: number = clientY - boundingClientRectangle.top;

  return { x, y };
};

export const getCSSCursorPropertyValueForPositionOnHover = (element: ItemByPositionResult | undefined): string => {
  if (!element) {
    return 'default';
  }

  if (element.type === 'body') {
    return 'grab';
  }

  if (element.type === 'edge') {
    const { start, end } = element.wall;
    const grabbedPoint = element.selectedPoint === 'start' ? start : end;
    const leftPoint = start == grabbedPoint ? end : start;

    switch (true) {
      case grabbedPoint.y > leftPoint.y && grabbedPoint.x < leftPoint.x:
        return 'nesw-resize';
      case grabbedPoint.y === leftPoint.y && grabbedPoint.x < leftPoint.x:
        return 'w-resize';
      case grabbedPoint.y < leftPoint.y && grabbedPoint.x < leftPoint.x:
        return 'nwse-resize';
      case grabbedPoint.y < leftPoint.y && grabbedPoint.x === leftPoint.x:
        return 'n-resize';
      case grabbedPoint.y < leftPoint.y && grabbedPoint.x > leftPoint.x:
        return 'nesw-resize';
      case grabbedPoint.y === leftPoint.y && grabbedPoint.x > leftPoint.x:
        return 'e-resize';
      case grabbedPoint.y > leftPoint.y && grabbedPoint.x > leftPoint.x:
        return 'nwse-resize';
      case grabbedPoint.y > leftPoint.y && grabbedPoint.x === leftPoint.x:
        return 's-resize';
      default:
        return 'default';
    }
  }

  return 'default';
};

export const doesPanOffsetSatisfyConstraints = (panOffset: Readonly<PanOffset>, constraints: Constraints<PanOffset>): boolean => {
  return (
    panOffset.x >= constraints.min.x &&
    panOffset.y >= constraints.min.y &&
    panOffset.x <= constraints.max.x &&
    panOffset.y <= constraints.max.y
  );
};

export const getWallLengthText = (start: Readonly<Coordinate>, end: Readonly<Coordinate>): string => {
  return `${Formatter.formatInteger(calculateDistance(start, end))} ${localization.formatMessage('ui.units.cm')}`;
};
