import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import type { Material } from '@/core/types/domain/Material';
import type { Position } from '@/core/types/domain/Position';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import type { Product } from '@/core/types/domain/Product';
import type { OnInstalledCallback } from '@/core/types/utility/callbacks';
import type { ConfigurationScene } from '@/core/viewer/viewer3D/ConfigurationScene';
import type { ISharableConfigurationScene } from '@/core/viewer/viewer3D/ConfigurationScene.i';
import { ObjectsFlowScene } from '@/core/viewer/viewer3D/ObjectsFlowScene';
import { localization } from '@/stores/Localization';
import type { SceneEditStore } from '@/stores/scene3D/SceneEditStore';
import type { SceneSettingsStore } from '@/stores/scene3D/SceneSettingsStore';

export class Orchestrator {
  private configurationScene!: ISharableConfigurationScene;
  private sceneEditStore!: SceneEditStore;
  private objectsFlowScene!: ObjectsFlowScene;
  private sceneSettingsStore!: SceneSettingsStore;

  public constructor() {}

  public init(
    configurationScene: ConfigurationScene,
    objectsFlowScene: ObjectsFlowScene,
    sceneEditStore: SceneEditStore,
    sceneSettingsStore: SceneSettingsStore
  ): void {
    this.configurationScene = configurationScene;
    this.objectsFlowScene = objectsFlowScene;
    this.sceneEditStore = sceneEditStore;
    this.sceneSettingsStore = sceneSettingsStore;
  }

  public async switchWallMaterial(material: Material): Promise<void> {
    this.sceneSettingsStore.setWhichMaterialIsLoading(material);
    await this.objectsFlowScene.switchWallMaterial(material);
    this.sceneSettingsStore.setWhichMaterialIsLoading(null);
    this.sceneSettingsStore.switchWallMaterial(material);
  }

  public async switchFloorMaterial(material: Material): Promise<void> {
    this.sceneSettingsStore.setWhichMaterialIsLoading(material);
    await this.objectsFlowScene.switchFloorMaterial(material);
    this.sceneSettingsStore.setWhichMaterialIsLoading(null);
    this.sceneSettingsStore.switchFloorMaterial(material);
  }

  public async mountProduct(product: Readonly<Product>): Promise<void> {
    let mountedId: string | undefined = undefined;

    const onMounted = (): void => {
      this.configurationScene.orbitControls.enableZoom = false;
      this.configurationScene.orbitControls.update();
      this.sceneEditStore.setIsProductLoading(false);

      mountedId = toast(localization.formatMessage('ui.configurator.notifications.onProductMounted'), { duration: 20000 });
      this.sceneEditStore.enterInstallationMode(product);
      this.objectsFlowScene.enterInstallationMode();
    };

    const onInstalled: OnInstalledCallback = async (position: Position): Promise<PositionedProduct> => {
      this.configurationScene.orbitControls.enableZoom = true;

      toast.remove(mountedId);
      toast.success(localization.formatMessage('ui.configurator.notifications.onProductInstalled'), {
        duration: 5000
      });

      const positionedProduct = this.sceneEditStore.addProduct({
        position,
        id: v4(),
        ...product
      });

      this.sceneEditStore.enterOverviewMode();
      this.objectsFlowScene.enterOverviewMode();

      await this.sceneEditStore.saveChanges(/*this.configurationScene.getScreenShot()*/);

      //this.configurationScene.lookAtRootFromSide();

      return positionedProduct;
    };

    await this.objectsFlowScene.mountProduct(product.view, onMounted, onInstalled);
  }

  public cancelInstallation(): void {
    if (this.sceneEditStore.mode.type !== 'installation') {
      return;
    }

    this.objectsFlowScene.cancelInstallation();
    this.sceneEditStore.enterOverviewMode();
    this.objectsFlowScene.enterOverviewMode();
  }

  public enterSelectedMode(productId: string): void {
    this.sceneEditStore.enterSelectedMode(productId);
  }

  public enterOverviewMode(): void {
    this.sceneEditStore.enterOverviewMode();
    this.objectsFlowScene.enterOverviewModeNoRecursion();
  }

  public enterMovingMode(): void {
    if (this.sceneEditStore.mode.type === 'selected') {
      this.sceneEditStore.enterMovingMode();
      toast.dismiss();
      toast(localization.formatMessage('ui.configurator.notifications.onProductMove'), {
        duration: 10000
      });
      this.objectsFlowScene.enterMovingMode();
    }
  }

  public deleteProduct(): void {
    if (this.sceneEditStore.mode.type === 'selected') {
      const positionedProductId = this.sceneEditStore.mode.selected.id;
      this.objectsFlowScene.removeProduct(positionedProductId);
      this.sceneEditStore.deleteProduct(positionedProductId);
      // ATTENTION: breaks logics
      this.sceneEditStore.saveChanges(/*this.configurationScene.renderer.domElement.toDataURL()*/);
      this.enterOverviewMode();
    }
  }

  public cancelMoving(): void {
    if (this.sceneEditStore.mode.type !== 'moving') {
      return;
    }

    const originalPosition: Readonly<Position> = this.sceneEditStore.mode.selected.position;
    this.objectsFlowScene.cancelMoving(originalPosition);
    this.objectsFlowScene.enterOverviewMode();
    this.sceneEditStore.enterOverviewMode();
  }

  public saveDraggedProduct(position: Position): void {
    toast.dismiss();
    this.sceneEditStore.saveDraggedProduct(position);
    this.sceneEditStore.saveChanges(/*this.configurationScene.renderer.domElement.toDataURL()*/);
  }

  public changeGridOpacity(opacity: number): void {
    this.sceneSettingsStore.changeGridOpacity(opacity);
    this.objectsFlowScene.changeGridOpacity(opacity / 100);
  }
}
