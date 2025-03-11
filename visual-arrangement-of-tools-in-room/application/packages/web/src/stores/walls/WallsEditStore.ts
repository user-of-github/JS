import { action, computed, makeObservable, observable } from 'mobx';
import { WallCanvasElement, WallCanvasElementLine, WallCanvasElementLineStart } from '@/core/types/WallCanvas';
import { Coordinate } from '@/core/types/domain/Coordinate';
import { CanvasWallElementsCreator } from '@/core/viewer/CanvasWallElementsCreator';
import { DPI } from '@/core/viewer/utils/canvasConstants';
import { calculateDistance, isWithinCanvasElement } from '@/core/viewer/utils/utilsCanvas';
import type { WallsLocalEditMode } from './types';

export class WallsEditStore {
  private _walls: WallCanvasElement[] = [];
  private _mode: WallsLocalEditMode = { type: 'viewing' };

  public constructor() {
    type PrivateFields = '_walls' | '_mode';

    makeObservable<WallsEditStore, PrivateFields>(
      this,
      {
        _mode: observable,
        _walls: observable,

        mode: computed,
        selectedWall: computed.struct,
        walls: computed,

        init: action.bound,
        enterDrawingMode: action.bound,
        enterOverviewMode: action.bound,
        enterSelectedMode: action.bound,
        enterMovingMode: action.bound,
        enterResizingMode: action.bound,
        enterPanningMode: action.bound,

        startWall: action.bound,
        cancelWall: action.bound,
        continueWall: action.bound,
        exchangeWall: action.bound,
        removeSelectedWall: action.bound,
        leaveOnlyDrawnLines: action.bound
      },
      {
        deep: true
      }
    );
  }

  public init(walls: WallCanvasElementLine[]): void {
    this._walls = walls;
  }

  public get mode(): Readonly<WallsLocalEditMode> {
    return this._mode;
  }

  public get selectedWall(): Readonly<WallCanvasElementLine> | undefined {
    return this._mode.type === 'moving' ||
      this._mode.type === 'resizing' ||
      this._mode.type === 'selected' ||
      this._mode.type === 'viewing'
      ? this._mode.selected
      : undefined;
  }

  public get walls(): ReadonlyArray<WallCanvasElement> {
    return this._walls;
  }

  public enterDrawingMode(): void {
    this._mode = { type: 'drawing' };
  }

  public enterOverviewMode(selected?: WallCanvasElementLine): void {
    this._mode = { type: 'viewing', selected };
  }

  public enterSelectedMode(selected: WallCanvasElementLine, offsetTowardsElementStart: Coordinate): void {
    this._mode = { type: 'selected', selected, offsetTowardsElementStart };
  }

  public enterMovingMode(selected: WallCanvasElementLine, offsetTowardsElementStart: Coordinate): void {
    this._mode = { type: 'moving', selected, offsetTowardsElementStart };
  }

  public enterResizingMode(selected: WallCanvasElementLine, selectedPoint: 'start' | 'end'): void {
    this._mode = { type: 'resizing', selected, selectedPoint };
  }

  public enterPanningMode(clientCoordinates: Coordinate): void {
    console.log('panning entered');
    this._mode = { type: 'panning', startPanMousePosition: clientCoordinates };
  }

  public startWall(lineStartElement: WallCanvasElementLineStart): void {
    this._walls.push(lineStartElement);
  }

  public continueWall(modifiedLine: WallCanvasElement): void {
    if (modifiedLine.type === 'line' && calculateDistance(modifiedLine.start, modifiedLine.end) < 30) {
      return;
    }
    const { length } = this._walls;
    const index = length - 1;
    if (index >= 0 && index < length) {
      this._walls[index] = modifiedLine;
    }
  }

  public cancelWall(): void {
    this._walls.pop();
  }

  public getItemByPosition(clientPosition: Coordinate): ItemByPositionResult | undefined {
    const epsilonForEdgePoints = CanvasWallElementsCreator.wallsCircleControlsSize / DPI;

    for (let index = this._walls.length - 1; index >= 0; --index) {
      const wall = this._walls.at(index);

      if (!wall) {
        continue;
      }

      if (wall.type !== 'line') {
        continue;
      }

      if (calculateDistance(clientPosition, wall.start) < epsilonForEdgePoints) {
        return {
          type: 'edge',
          selectedPoint: 'start',
          wall: wall
        };
      } else if (calculateDistance(clientPosition, wall.end) < epsilonForEdgePoints) {
        return {
          type: 'edge',
          selectedPoint: 'end',
          wall: wall
        };
      } else if (isWithinCanvasElement(clientPosition, wall)) {
        return { type: 'body', wall: wall };
      }
    }

    return;
  }

  public exchangeWall(updatedWall: WallCanvasElementLine): void {
    // TODO: maybe optimize later: create Map<uuid, index>
    const index = this._walls.findIndex((wall) => wall.id === updatedWall.id);
    if (index < 0) {
      return;
    }

    this._walls[index] = updatedWall;
  }

  public removeSelectedWall(): void {
    if (!(this._mode.type === 'viewing' || this._mode.type === 'selected')) {
      return;
    }

    const id = this._mode.selected?.id;

    const index = this._walls.findIndex((wall) => wall.id === id);

    if (index < 0) {
      return;
    }

    this._walls.splice(index, 1);

    this.enterOverviewMode();
  }

  public leaveOnlyDrawnLines(): void {
    this._walls = this._walls.filter((wall: WallCanvasElement) => wall.type !== 'lineStart');
  }
}

interface ItemByPositionResultBody {
  type: 'body';
  wall: WallCanvasElementLine;
}

interface ItemByPositionResultEdge {
  type: 'edge';
  selectedPoint: 'start' | 'end';
  wall: WallCanvasElementLine;
}

export type ItemByPositionResult = ItemByPositionResultBody | ItemByPositionResultEdge;
