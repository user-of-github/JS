import React from 'react';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import type { Material } from '@/core/types/domain/Material';
import type { Product } from '@/core/types/domain/Product';
import { ConfigurationScene } from '@/core/viewer/viewer3D/ConfigurationScene';
import { ObjectsFlowScene } from '@/core/viewer/viewer3D/ObjectsFlowScene';
import type { ConfiguratorStore } from '@/stores/ConfiguratorStore';
import { SceneEditStore } from '@/stores/scene3D/SceneEditStore';
import { useModal } from '@/components/hooks/useModal';
import { Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';
import { CanvasContainer, EditorLayout } from '../../components/layout/EditorLayout';
import { CatalogModal } from './CatalogModal';
import { ModeInfo, isModeInfoShown } from './ModeInfo';
import { Orchestrator } from './Orchestrator';
import { SideBar } from './sideBar/SideBar';
import { SummaryModal } from './summary/SummaryModal';

interface Scene3DCanvasProps {
  configuratorStore: ConfiguratorStore;
}

export const Scene3DCanvas: React.FC<Scene3DCanvasProps> = observer(({ configuratorStore }) => {
  const { sceneSettingsStore: settingsStore } = configuratorStore;

  const [store] = React.useState(() => new SceneEditStore(configuratorStore));
  const [orchestrator] = React.useState<Orchestrator>(() => new Orchestrator());

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [catalogModalOpened, openCatalogModal, closeCatalogModal] = useModal();
  const [summaryModalOpened, openSummaryModal, closeSummaryModal] = useModal();

  React.useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      const canvasContainer = document.getElementById(canvasContainerId) as HTMLDivElement;
      const canvasHtmlElement = document.getElementById(canvasId) as HTMLCanvasElement;

      const configurationScene = new ConfigurationScene();
      configurationScene.initWithCanvas(canvasHtmlElement, canvasContainer);

      const objectsFlowScene = new ObjectsFlowScene(configurationScene, settingsStore);

      await objectsFlowScene.switchFloorMaterial(settingsStore.selectedFloorMaterial);
      await objectsFlowScene.switchWallMaterial(settingsStore.selectedWallMaterial);

      orchestrator.init(configurationScene, objectsFlowScene, store, settingsStore);

      objectsFlowScene.init({
        enterSelectedMode: orchestrator.enterSelectedMode.bind(orchestrator),
        enterOverviewMode: orchestrator.enterOverviewMode.bind(orchestrator),
        saveDraggedProduct: orchestrator.saveDraggedProduct.bind(orchestrator)
      });

      configurationScene.start();
      await objectsFlowScene.renderData(configuratorStore.walls, store.products);
      setIsLoading(false);

      canvasHtmlElement.oncontextmenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
    };

    (async () => {
      store.init(configuratorStore.positionedProducts);
      await init();
    })().catch((error) => console.log(error));

    const onWindowResize = async (): Promise<void> => await init();

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const onWallMaterialChange = async (material: Material) => {
    await orchestrator.switchWallMaterial(material);
  };

  const onFloorMaterialChange = async (material: Material) => {
    await orchestrator.switchFloorMaterial(material);
  };

  const onNewProductSelect = async (product: Readonly<Product>) => {
    store.setIsProductLoading(true);
    await orchestrator.mountProduct(product);
    closeCatalogModal();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    const { key } = event;
    switch (key) {
      case 'Backspace':
      case 'Delete':
        orchestrator.deleteProduct();
        break;
      case 'Escape': {
        switch (store.mode.type) {
          case 'installation':
            orchestrator.cancelInstallation();
            break;
          case 'moving':
            orchestrator.cancelMoving();
            break;
        }
        break;
      }
    }
  };

  return (
    <EditorLayout>
      {isModeInfoShown(store.mode) ? (
        <ModeInfo
          mode={store.mode}
          goBack={orchestrator.enterOverviewMode.bind(orchestrator)}
          cancelInstallation={orchestrator.cancelInstallation.bind(orchestrator)}
          moveProduct={orchestrator.enterMovingMode.bind(orchestrator)}
          removeProduct={orchestrator.deleteProduct.bind(orchestrator)}
          cancelMoving={orchestrator.cancelMoving.bind(orchestrator)}
        />
      ) : (
        <SideBar
          settingsStore={configuratorStore.sceneSettingsStore}
          onWallMaterialChange={onWallMaterialChange}
          onFloorMaterialChange={onFloorMaterialChange}
          onOpenCatalog={openCatalogModal}
          orchestrator={orchestrator}
        />
      )}

      <CanvasContainer id={canvasContainerId}>
        <canvas className="w-full h-full max-h-full outline-none select-none" id={canvasId} tabIndex={0} onKeyDown={handleKeyDown}>
          3D Scene canvas
        </canvas>

        <Button
          appearance="gradient-mono-red"
          className="flex flex-row items-center absolute right-3 top-3 gap-x-3"
          onClick={openSummaryModal}
        >
          <Icon iconName="cart" width={20} stroke="white" />
          <Typography variant="paragraph" className="text-white">
            <FormattedMessage id="ui.configurator.cartButton" />
          </Typography>
        </Button>

        {isLoading && (
          <div className="flex items-center justify-center absolute left-0 bottom-0 right-0 top-0 w-full h-full bg-white">
            <LoadingSpinner />
          </div>
        )}
      </CanvasContainer>

      <>
        <CatalogModal
          opened={catalogModalOpened}
          onChoose={onNewProductSelect}
          onClose={closeCatalogModal}
          isLoading={store.isProductLoading}
        />

        <SummaryModal opened={summaryModalOpened} onClose={closeSummaryModal} items={store.reportItems} />
      </>
    </EditorLayout>
  );
});

const canvasId = 'scene-canvas';
const canvasContainerId = 'scene-canvas-container-id';
