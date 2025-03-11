import { action, computed, makeObservable, observable } from 'mobx';
import { type ISynchronizationService } from '@/core/services/SynchronizationService';
import { Layout, emptyLayout } from '@/core/types/domain/Layout';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import { Wall } from '@/core/types/domain/Wall';
import { SceneSettingsStore } from './scene3D/SceneSettingsStore';
import { ActiveMode } from './types';
import { WallsSettingsStore } from './walls/WallsSettingsStore';

export class ConfiguratorStore {
  public readonly wallsSettingStore: WallsSettingsStore;
  public readonly sceneSettingsStore: SceneSettingsStore;

  private readonly _layout: Layout;
  private _activeMode: ActiveMode;

  public constructor(
    private readonly synchronizationService: ISynchronizationService,
    initialLayout: Layout
  ) {
    this._activeMode = { type: 'edit', subtype: 'walls' };
    this._layout = initialLayout || emptyLayout;
    this.wallsSettingStore = new WallsSettingsStore();
    this.sceneSettingsStore = new SceneSettingsStore();

    type PrivateFields = '_layout' | '_activeMode';

    makeObservable<ConfiguratorStore, PrivateFields>(
      this,
      {
        _layout: observable,
        _activeMode: observable,

        currentMode: computed,
        walls: computed.struct,
        positionedProducts: computed.struct,

        enter3DMode: action.bound,
        enter2DMode: action.bound,

        updateWallsWithDataFromCanvas: action.bound,
        updateWallsWithDataFromScene: action.bound
      },
      { deep: true }
    );
  }

  public get currentMode(): ActiveMode {
    return this._activeMode;
  }

  public get walls(): Wall[] {
    return this._layout.walls;
  }

  public get positionedProducts(): PositionedProduct[] {
    return this._layout.items;
  }

  public enter3DMode(): void {
    this._activeMode = { type: 'edit', subtype: 'objects' };
  }

  public enter2DMode(): void {
    this._activeMode = { type: 'edit', subtype: 'walls' };
  }

  public updateWallsWithDataFromCanvas(walls: Wall[]): void {
    this._layout.walls = [...walls];
  }

  public updateWallsWithDataFromScene(products: PositionedProduct[]): void {
    this._layout.items = [...products];
  }

  public async saveChanges(snapshot?: string): Promise<void> {
    console.warn('Layout preview not implemented (for screenshots)');
    await this.synchronizationService.updateLayout({
      ...this._layout,
      preview: snapshot
    });
  }
}
