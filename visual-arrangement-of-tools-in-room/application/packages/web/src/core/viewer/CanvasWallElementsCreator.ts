import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Drawable } from 'roughjs/bin/core';
import { RoughGenerator } from 'roughjs/bin/generator';
import { v4 } from 'uuid';
import { Converter } from '@/core/services/Converter';
import { WallCanvasElement, WallCanvasElementLine, WallCanvasElementLineStart } from '@/core/types/WallCanvas';
import { Coordinate } from '@/core/types/domain/Coordinate';
import { DPI, WALLS_SCALING } from '@/core/viewer/utils/canvasConstants';
import { areCoordinatesEqual, calculateDistance, getWallLengthText, scaleCoordinates } from '@/core/viewer/utils/utilsCanvas';
import { getWallCenter } from '@/core/viewer/utils/utilsThree';
import { WallsSettingsStore } from '@/stores/walls/WallsSettingsStore';
import type { WallsLocalEditMode } from '@/stores/walls/types';

export class CanvasWallElementsCreator {
  private static readonly wallLengthTextBackgroundStyle = 'rgba(255, 255, 255, 0.95)';
  private static readonly wallLengthTextSize = 27;
  private static readonly angleTextSize = 20;
  private static readonly oneCanvasSymbolToPtRatio = 16;

  private static readonly wallsCircleControlsColorOptions = {
    fill: 'white',
    stroke: 'black',
    fillStyle: 'solid'
  } as const;
  public static readonly wallsCircleControlsSize = 10 * DPI;
  private static readonly OTHER_LINES_BINDING_DISTANCE: number = 15;

  private readonly generator: RoughGenerator;

  public canvasHtmlElement!: HTMLCanvasElement;
  private canvasContext!: CanvasRenderingContext2D;
  private roughCanvas!: RoughCanvas;

  public constructor(private readonly wallsEditSettingsStore: WallsSettingsStore) {
    this.generator = rough.generator({ options: { roughness: 0 } });
  }

  public init(canvasHtmlElement: HTMLCanvasElement, canvasContainer: HTMLElement): void {
    if (canvasHtmlElement) {
      canvasHtmlElement.width = canvasContainer.offsetWidth * DPI;
      canvasHtmlElement.height = canvasContainer.offsetHeight * DPI;

      this.canvasHtmlElement = canvasHtmlElement;
      this.roughCanvas = rough.canvas(canvasHtmlElement);
      this.canvasContext = canvasHtmlElement.getContext('2d') as CanvasRenderingContext2D;
    } else {
      throw new Error('HTML Canvas is undefined');
    }
  }

  public renderCanvasImage(elements: ReadonlyArray<WallCanvasElement>, currentMode: WallsLocalEditMode): void {
    this.canvasContext.clearRect(0, 0, this.canvasHtmlElement.width, this.canvasHtmlElement.height);

    this.canvasContext.save();
    this.canvasContext.translate(this.wallsEditSettingsStore.panOffset.x, this.wallsEditSettingsStore.panOffset.y);

    for (let index = 0; index < elements.length; ++index) {
      const element = elements.at(index);
      if (!element) {
        return;
      }

      if (element.type === 'lineStart') {
        this.roughCanvas.draw(this.getLineCircle(scaleCoordinates(element.start, DPI)));
        continue;
      }

      if (areCoordinatesEqual(element.start, element.end)) {
        continue; // TODO : filter such things
      }

      for (const roughElement of element.roughElements) {
        this.roughCanvas.draw(roughElement);
      }

      this.renderLinesLengthText(element);

      if (currentMode.type === 'resizing' && currentMode.selected.id === element.id) {
        this.renderLineAngleText(element, currentMode);
      }

      if (currentMode.type === 'drawing' && index === elements.length - 1) {
        this.renderLineAngleText(element);
      }
    }

    this.canvasContext.restore();
  }

  public startWall(sourceStart: Coordinate, alreadyDrawn: Readonly<WallCanvasElement[]> = []): WallCanvasElementLineStart {
    let startCoordinates = sourceStart;
    const newId: string = v4();

    if (this.wallsEditSettingsStore.isWallsBindingEnabled) {
      startCoordinates = CanvasWallElementsCreator.calculateCoordinatesWithBindingToOtherLines(
        startCoordinates,
        newId,
        alreadyDrawn,
        CanvasWallElementsCreator.OTHER_LINES_BINDING_DISTANCE * 2.5
      );
    }

    return {
      type: 'lineStart',
      start: startCoordinates,
      id: newId
    };
  }

  /**
  Source-start / source-end — is its location "in world" and "on screen"
  start / source-start — it is location inside scaled canvas — just for rough element
  */
  public createWall(
    sourceEnd: Coordinate,
    alreadyDrawn: ReadonlyArray<WallCanvasElement> = [] // for binding to existing points
  ): WallCanvasElementLine {
    const currentLineStart = alreadyDrawn.at(-1)!;
    if (!currentLineStart) {
      throw new Error('Can not create line with no start element...');
    }
    const newId = currentLineStart.id;

    const sourceStart = currentLineStart.start;

    const { isAngleBindingEnabled, isWallsBindingEnabled } = this.wallsEditSettingsStore;

    let endCoordinates: Coordinate = sourceEnd;

    if (isAngleBindingEnabled) {
      endCoordinates = CanvasWallElementsCreator.calculateCoordinatesWithBindingToBaseAngles(sourceStart, sourceEnd);
    }

    if (isWallsBindingEnabled) {
      endCoordinates = CanvasWallElementsCreator.calculateCoordinatesWithBindingToOtherLines(endCoordinates, newId, alreadyDrawn);
    }

    return {
      type: 'line',
      start: sourceStart,
      end: endCoordinates,
      roughElements: this.createRoughLine(sourceStart, endCoordinates, this.wallsEditSettingsStore.wallsThickness),
      id: newId,
      wallThickness: this.wallsEditSettingsStore.wallsThickness
    };
  }

  public createRoughLine(sourceStart: Coordinate, sourceEnd: Coordinate, thickness: number): Drawable[] {
    const wallsThickness = CanvasWallElementsCreator.scaleToCanvas(thickness);

    const roughStart = scaleCoordinates(sourceStart, DPI);
    const roughEnd = scaleCoordinates(sourceEnd, DPI);

    const roughElement: Drawable = this.generator.line(roughStart.x, roughStart.y, roughEnd.x, roughEnd.y, {
      strokeWidth: wallsThickness * DPI
    });
    const roughStartCircle: Drawable = this.getLineCircle(roughStart);
    const roughEndCircle: Drawable = this.getLineCircle(roughEnd);

    return [roughElement, roughStartCircle, roughEndCircle];
  }

  public updateWallPosition(
    wall: WallCanvasElementLine,
    newMousePosition: Coordinate,
    offsetWhenClicked: Coordinate
  ): WallCanvasElementLine {
    const width = wall.end.x - wall.start.x;
    const height = wall.end.y - wall.start.y;

    const nextStart: Coordinate = {
      x: newMousePosition.x - offsetWhenClicked.x,
      y: newMousePosition.y - offsetWhenClicked.y
    };

    const nextEnd: Coordinate = {
      x: nextStart.x + width,
      y: nextStart.y + height
    };

    return {
      type: 'line',
      start: nextStart,
      end: nextEnd,
      roughElements: this.createRoughLine(nextStart, nextEnd, wall.wallThickness),
      id: wall.id,
      wallThickness: wall.wallThickness
    };
  }

  public resizeWall(
    wall: WallCanvasElementLine,
    selectedPoint: 'start' | 'end',
    clientCoordinate: Coordinate,
    alreadyDrawn: ReadonlyArray<WallCanvasElement> = []
  ): WallCanvasElementLine {
    const { isAngleBindingEnabled, isWallsBindingEnabled } = this.wallsEditSettingsStore;

    let coordinates: Coordinate = clientCoordinate;

    if (isAngleBindingEnabled) {
      let currentStart: Coordinate = wall.start;
      let currentEnd: Coordinate = wall.end;

      if (selectedPoint === 'start') {
        currentStart = clientCoordinate;
        coordinates = CanvasWallElementsCreator.calculateCoordinatesWithBindingToBaseAngles(currentEnd, currentStart);
      } else if (selectedPoint === 'end') {
        currentEnd = clientCoordinate;
        coordinates = CanvasWallElementsCreator.calculateCoordinatesWithBindingToBaseAngles(currentStart, currentEnd);
      }
    }

    if (isWallsBindingEnabled) {
      coordinates = CanvasWallElementsCreator.calculateCoordinatesWithBindingToOtherLines(coordinates, wall.id, alreadyDrawn);
    }

    let nextStart = wall.start,
      nextEnd = wall.end;

    if (selectedPoint === 'start') {
      nextStart = coordinates;
    } else if (selectedPoint === 'end') {
      nextEnd = coordinates;
    }

    return {
      type: 'line',
      start: nextStart,
      end: nextEnd,
      roughElements: this.createRoughLine(nextStart, nextEnd, wall.wallThickness),
      id: wall.id,
      wallThickness: wall.wallThickness
    };
  }

  private getLineCircle(coordinate: Readonly<Coordinate>): Drawable {
    return this.generator.circle(
      coordinate.x,
      coordinate.y,
      CanvasWallElementsCreator.wallsCircleControlsSize,
      CanvasWallElementsCreator.wallsCircleControlsColorOptions
    );
  }

  private renderLinesLengthText(element: Readonly<WallCanvasElementLine>): void {
    const wallLength = getWallLengthText(element.start, element.end);

    const lineCenter: Coordinate = scaleCoordinates(getWallCenter(element), DPI);
    this.canvasContext.fillStyle = CanvasWallElementsCreator.wallLengthTextBackgroundStyle;

    const rectWidth = CanvasWallElementsCreator.oneCanvasSymbolToPtRatio * wallLength.length;

    const nearTextWidthRatio = CanvasWallElementsCreator.oneCanvasSymbolToPtRatio - 1; // 16 - 1
    const paddingBetweenTextAndBackground = 2;
    const rectHeight = CanvasWallElementsCreator.wallLengthTextSize + paddingBetweenTextAndBackground * 2;

    const nearTextWidth = nearTextWidthRatio * wallLength.length;
    this.canvasContext.fillRect(
      lineCenter.x - rectWidth * 0.5,
      lineCenter.y - (CanvasWallElementsCreator.wallLengthTextSize + paddingBetweenTextAndBackground * 2) * 0.5,
      rectWidth,
      rectHeight
    );
    this.canvasContext.font = `300 ${CanvasWallElementsCreator.wallLengthTextSize}px Open Sans`;
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillText(
      wallLength,
      lineCenter.x - rectWidth * 0.5 + (rectWidth - nearTextWidth) * 0.5,
      lineCenter.y + rectHeight * 0.5 - paddingBetweenTextAndBackground - 1
    );
  }

  private renderLineAngleText(element: Readonly<WallCanvasElementLine>, mode?: WallsLocalEditMode): void {
    let { start, end } = element;

    if (mode?.type === 'resizing') {
      if (mode.selectedPoint === 'start') {
        [start, end] = [end, start];
      }
    }

    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const angleBetween = Math.atan(deltaY / deltaX);

    const abs = Math.abs(angleBetween);
    const absDegreesValue = Converter.radiansToDegrees(abs);

    const scaled = scaleCoordinates(start, DPI);
    const wallLength = calculateDistance(start, end);
    const upperBorder = 275;
    const lowerBorder = 40;
    const arcRadius = wallLength < upperBorder ? lowerBorder + (wallLength / upperBorder) * (upperBorder - lowerBorder) : upperBorder;

    let startAngle: number | null = null;
    let endAngle: number | null = null;

    let angleTextPosition: Coordinate | null = null;
    let angleTextValue: number | null = null;

    let polarLineFinalPoint: Coordinate = scaled;
    const polarLineMarginFromArcRadius = 100;
    let bisector: number;

    const polarLineLength = arcRadius + polarLineMarginFromArcRadius;

    switch (true) {
      case deltaX < 0 && deltaY < 0:
        startAngle = Math.PI + abs;
        endAngle = oneAndHalfPi;
        angleTextValue = 90 - absDegreesValue;
        bisector = (halfPI - abs) * 0.5;
        angleTextPosition = { x: scaled.x - arcRadius * Math.sin(bisector), y: scaled.y - arcRadius * Math.cos(bisector) };
        polarLineFinalPoint = { x: scaled.x, y: scaled.y - polarLineLength };
        break;
      case deltaX < 0 && deltaY > 0:
        startAngle = halfPI + (halfPI - abs);
        endAngle = Math.PI;
        angleTextValue = absDegreesValue;
        bisector = halfPI - abs * 0.5;
        angleTextPosition = { x: scaled.x - arcRadius * Math.sin(bisector), y: scaled.y + arcRadius * Math.cos(bisector) };
        polarLineFinalPoint = { x: scaled.x - polarLineLength, y: scaled.y };
        break;
      case deltaX > 0 && deltaY > 0:
        startAngle = abs;
        endAngle = halfPI;
        angleTextValue = 90 - absDegreesValue;
        bisector = (halfPI - abs) * 0.5;
        angleTextPosition = { x: scaled.x + arcRadius * Math.sin(bisector), y: scaled.y + arcRadius * Math.cos(bisector) };
        polarLineFinalPoint = { x: scaled.x, y: scaled.y + polarLineLength };
        break;
      case deltaX > 0 && deltaY < 0:
        startAngle = twoPi - abs;
        endAngle = twoPi;
        angleTextValue = absDegreesValue;
        bisector = halfPI - abs * 0.5;
        angleTextPosition = { x: scaled.x + arcRadius * Math.sin(bisector), y: scaled.y - arcRadius * Math.cos(bisector) };
        polarLineFinalPoint = { x: scaled.x + polarLineLength, y: scaled.y };
        break;
      case abs === 0 || abs === halfPI: {
        switch (true) {
          case deltaX > 0 && deltaY === 0:
            startAngle = twoPi;
            endAngle = halfPI;
            angleTextValue = 90;
            angleTextPosition = { x: scaled.x + arcRadius / sqrt2 - 10, y: scaled.y + arcRadius / sqrt2 + 10 };
            polarLineFinalPoint = { x: scaled.x, y: scaled.y + polarLineLength };
            break;
          case deltaX === 0 && deltaY < 0:
            startAngle = oneAndHalfPi;
            endAngle = twoPi;
            angleTextValue = absDegreesValue;
            angleTextPosition = { x: scaled.x + arcRadius / sqrt2 - 10, y: scaled.y - arcRadius / sqrt2 + 10 };
            polarLineFinalPoint = { x: scaled.x + polarLineLength, y: scaled.y };
            break;
          case deltaX === 0 && deltaY > 0:
            startAngle = halfPI;
            endAngle = Math.PI;
            angleTextValue = absDegreesValue;
            angleTextPosition = { x: scaled.x - arcRadius / sqrt2 - 10, y: scaled.y + arcRadius / sqrt2 + 10 };
            polarLineFinalPoint = { x: scaled.x - polarLineLength, y: scaled.y };
            break;
          case deltaX < 0 && deltaY === 0:
            startAngle = Math.PI;
            endAngle = oneAndHalfPi;
            angleTextValue = 90;
            angleTextPosition = { x: scaled.x - arcRadius / sqrt2 - 10, y: scaled.y - arcRadius / sqrt2 + 10 };
            polarLineFinalPoint = { x: scaled.x, y: scaled.y - polarLineLength };
            break;
        }
        break;
      }
    }

    if (startAngle && endAngle) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = 'rgba(0, 0, 0, .4)';
      this.canvasContext.setLineDash([10, 10]);
      this.canvasContext.arc(scaled.x, scaled.y, arcRadius, startAngle, endAngle);
      this.canvasContext.stroke();
      this.canvasContext.closePath();
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(scaled.x, scaled.y);
      this.canvasContext.strokeStyle = 'rgba(0, 0, 0, .4)';
      this.canvasContext.setLineDash([10, 15]);
      this.canvasContext.lineTo(polarLineFinalPoint.x, polarLineFinalPoint.y);
      this.canvasContext.stroke();
      this.canvasContext.closePath();

      if (angleTextPosition !== null && angleTextValue !== null) {
        const text = angleTextValue.toFixed(1) + ' °';
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(
          angleTextPosition.x,
          angleTextPosition.y - 20,
          text.length * 12,
          CanvasWallElementsCreator.angleTextSize
        );
        this.canvasContext.font = `700 ${CanvasWallElementsCreator.angleTextSize}px Open Sans`;
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.fillText(text, angleTextPosition.x, angleTextPosition.y);
      }
      this.canvasContext.setLineDash([]);
      this.canvasContext.closePath();
    }
  }

  // TODO: maybe do the same for 30 and 60 deg
  private static calculateCoordinatesWithBindingToBaseAngles(sourceStart: Coordinate, sourceEnd: Coordinate): Coordinate {
    const deltaX = sourceEnd.x - sourceStart.x;
    const deltaY = sourceEnd.y - sourceStart.y;
    const angleBetween = Math.atan(Math.abs(deltaY / deltaX));
    const angleBetweenDeg = (angleBetween * 180) / Math.PI; // 1-st quarter for TAN => 0..90

    if (angleBetweenDeg >= 0 && angleBetweenDeg <= 4) {
      return { x: sourceEnd.x, y: sourceStart.y };
    } else if (angleBetweenDeg >= 42 && angleBetweenDeg <= 48) {
      const min = Math.min(Math.abs(deltaX), Math.abs(deltaY));
      const [xDirection, yDirection] = [Math.sign(deltaX), Math.sign(deltaY)];
      return {
        x: sourceStart.x + min * xDirection,
        y: sourceStart.y + min * yDirection
      };
    } else if (angleBetweenDeg >= 87 && angleBetweenDeg <= 90) {
      return { x: sourceStart.x, y: sourceEnd.y };
    } else {
      return sourceEnd;
    }
  }

  private static calculateCoordinatesWithBindingToOtherLines(
    source: Coordinate,
    currentlyDrawnId: string,
    alreadyDrawn: ReadonlyArray<WallCanvasElement> = [],
    bindingDistance: number = CanvasWallElementsCreator.OTHER_LINES_BINDING_DISTANCE
  ): Coordinate {
    // base points
    for (let index = 0; index < alreadyDrawn.length; ++index) {
      const element = alreadyDrawn[index];

      if (element.type === 'lineStart') {
        continue;
      }

      if (element.id === currentlyDrawnId) {
        continue;
      }

      if (calculateDistance(element.end, source) < bindingDistance) {
        return element.end;
      } else if (calculateDistance(element.start, source) < bindingDistance) {
        return element.start;
      }
    }

    return source;
  }

  private static scaleToCanvas(value: number): number {
    return value;
  }
}

const halfPI = Math.PI / 2;
const oneAndHalfPi = (3 * Math.PI) / 2;
const twoPi = Math.PI * 2;
const sqrt2 = 1.4142;
