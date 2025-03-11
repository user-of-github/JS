import { action, computed, makeObservable, observable } from 'mobx';
import { DatasetService } from '@/core/services/DatasetService';
import { type Material } from '@/core/types/domain/Material';
import type { Constraints } from '@/core/types/utility/Constraints';
import { Grid } from '@/core/viewer/viewer3D/sceneEntites/Grid';

export class SceneSettingsStore {
  public static readonly gridOpacityConstraint: Constraints<number> = { min: 0, max: 100 };

  private _lastColorForWalls: string = '#f7f1e3';
  private _lastColorForFloor: string = '#d8c5a2';

  private _selectedWallMaterial: Material = DatasetService.wallTextures[1];
  private _selectedFloorMaterial: Material = DatasetService.floorTextures[3];
  private _whichMaterialIsLoading: Material | null = null;

  private _gridOpacity: number = Grid.defaultOpacity * 100;

  public constructor() {
    if (DatasetService.floorTextures.length <= 0 || DatasetService.wallTextures.length <= 0) {
      throw Error('Dataset array is empty, but _selectedWallMaterial and selectedFloorMaterial point to its elements [2024.05.04]');
    }

    type PrivateFields =
      | '_selectedWallMaterial'
      | '_lastColorForWalls'
      | '_selectedFloorMaterial'
      | '_lastColorForFloor'
      | '_whichMaterialIsLoading'
      | '_gridOpacity';

    makeObservable<SceneSettingsStore, PrivateFields>(
      this,
      {
        _selectedWallMaterial: observable,
        _lastColorForWalls: observable,
        _selectedFloorMaterial: observable,
        _lastColorForFloor: observable,
        _whichMaterialIsLoading: observable,
        _gridOpacity: observable,

        selectedWallMaterial: computed,
        lastColorForWalls: computed,
        whichMaterialIsLoading: computed,
        gridOpacity: computed,

        switchWallMaterial: action.bound,
        switchFloorMaterial: action.bound,
        setWhichMaterialIsLoading: action.bound
      },
      { deep: true }
    );
  }

  public get selectedWallMaterial(): Material {
    return this._selectedWallMaterial;
  }

  public get lastColorForWalls(): string {
    return this._lastColorForWalls;
  }

  public get selectedFloorMaterial(): Material {
    return this._selectedFloorMaterial;
  }

  public get lastColorForFloor(): string {
    return this._lastColorForFloor;
  }

  public get whichMaterialIsLoading(): Readonly<Material> | null {
    return this._whichMaterialIsLoading;
  }

  public get gridOpacity(): number {
    return this._gridOpacity;
  }

  public setWhichMaterialIsLoading(material: Material | null): void {
    this._whichMaterialIsLoading = material;
  }

  public switchWallMaterial(material: Material): void {
    this._selectedWallMaterial = material;

    if (material.type === 'color') {
      this._lastColorForWalls = material.color;
    }
  }

  public switchFloorMaterial(material: Material): void {
    this._selectedFloorMaterial = material;

    if (material.type === 'color') {
      this._lastColorForFloor = material.color;
    }
  }

  public changeGridOpacity(opacity: number): void {
    this._gridOpacity = opacity;
  }
}
