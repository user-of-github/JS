import { action, computed, makeObservable, observable } from 'mobx';
import type { PanOffset } from '@/core/types/WallCanvas';
import type { Constraints } from '@/core/types/utility/Constraints';
import { doesPanOffsetSatisfyConstraints } from '@/core/viewer/utils/utilsCanvas';

export const enum Tool {
  Wall = 'Wall',
  Select = 'Select'
}

export const availableTools: Readonly<Tool[]> = [Tool.Select, Tool.Wall] as const;

export class WallsSettingsStore {
  public static readonly wallThicknessConstraint: Constraints<number> = { min: 10, max: 640 }; /* THICKNESS in MM ? */
  private static readonly defaultWallsThickness = WallsSettingsStore.wallThicknessConstraint.min;
  private static readonly panOffsetConstraint: Constraints<PanOffset> = { min: { x: -1000, y: -1000 }, max: { x: 1000, y: 1000 } };

  private _isAngleBindingEnabled: boolean = true;
  private _isWallsBindingEnabled: boolean = true;
  private _wallsThickness: number = WallsSettingsStore.defaultWallsThickness;
  private _currentTool: Tool = Tool.Wall;
  private _isGridShown: boolean = false;

  private _panOffset: PanOffset = { x: 0, y: 0 }; // offset when moving (translate API) canvas

  public constructor() {
    type PrivateFields =
      | '_isWallsBindingEnabled'
      | '_isAngleBindingEnabled'
      | '_wallsThickness'
      | '_currentTool'
      | '_isGridShown'
      | '_panOffset';

    makeObservable<WallsSettingsStore, PrivateFields>(this, {
      _isWallsBindingEnabled: observable,
      _isAngleBindingEnabled: observable,
      _wallsThickness: observable,
      _currentTool: observable,
      _isGridShown: observable,
      _panOffset: observable,

      isWallsBindingEnabled: computed,
      isAngleBindingEnabled: computed,
      wallsThickness: computed,
      currentTool: computed,
      isGridShown: computed,
      panOffset: computed,

      toggleAnglesBinding: action.bound,
      toggleWallsBinding: action.bound,
      toggleGridShown: action.bound,
      changeTool: action.bound,
      changeWallsThickness: action.bound,
      setPanOffset: action.bound,
      resetPanOffset: action.bound
    });
  }

  public get isAngleBindingEnabled(): boolean {
    return this._isAngleBindingEnabled;
  }
  public get isWallsBindingEnabled(): boolean {
    return this._isWallsBindingEnabled;
  }
  public get wallsThickness(): number {
    return this._wallsThickness;
  }
  public get currentTool(): Tool {
    return this._currentTool;
  }
  public get isGridShown(): boolean {
    return this._isGridShown;
  }
  public get panOffset(): Readonly<PanOffset> {
    return this._panOffset;
  }

  public toggleAnglesBinding(bindingEnabled: boolean): void {
    this._isAngleBindingEnabled = bindingEnabled;
  }

  public toggleWallsBinding(bindingEnabled: boolean): void {
    this._isWallsBindingEnabled = bindingEnabled;
  }

  public toggleGridShown(isShown: boolean): void {
    this._isGridShown = isShown;
  }

  public changeTool(tool: Tool): void {
    this._currentTool = tool;
  }

  public changeWallsThickness(value: number): void {
    if (WallsSettingsStore.wallThicknessConstraint.min <= value && value <= WallsSettingsStore.wallThicknessConstraint.max) {
      this._wallsThickness = value;
    }
  }

  public setPanOffset(value: PanOffset): void {
    if (doesPanOffsetSatisfyConstraints(value, WallsSettingsStore.panOffsetConstraint)) {
      this._panOffset = value;
    }
  }

  public resetPanOffset(): void {
    this._panOffset = { x: 0, y: 0 };
  }
}
