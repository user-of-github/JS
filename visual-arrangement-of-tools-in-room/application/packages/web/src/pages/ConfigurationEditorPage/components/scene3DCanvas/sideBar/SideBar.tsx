import React from 'react';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { DatasetService } from '@/core/services/DatasetService';
import type { Material } from '@/core/types/domain/Material';
import { localization } from '@/stores/Localization';
import { SceneSettingsStore } from '@/stores/scene3D/SceneSettingsStore';
import { useSideBarData } from '@/components/hooks/useSideBarData';
import { Button } from '@/components/ui';
import { SideBarHeading, SideBarLayout } from '@/pages/ConfigurationEditorPage/components/layout/SideBarLayout';
import type { Orchestrator } from '@/pages/ConfigurationEditorPage/components/scene3DCanvas/Orchestrator';
import { SceneSettings } from '@/pages/ConfigurationEditorPage/components/scene3DCanvas/sideBar/SceneSettings';
import { SideBarOptions } from '@/pages/ConfigurationEditorPage/components/scene3DCanvas/sideBar/SideBarOptions';
import { TextureChoice } from '@/pages/ConfigurationEditorPage/components/scene3DCanvas/sideBar/TextureChoice';

export const enum SelectedMenuItemMode {
  WallTextureChoice = 'WallTextureChoice',
  FloorTextureChoice = 'FloorTextureChoice',
  SceneSettings = 'SceneSettings'
}

interface SideBarProps {
  settingsStore: Readonly<SceneSettingsStore>;
  onWallMaterialChange: (material: Material) => void;
  onFloorMaterialChange: (material: Material) => void;
  onOpenCatalog: () => void;
  orchestrator: Readonly<Orchestrator>;
}

export const SideBar: React.FC<SideBarProps> = observer(
  ({ settingsStore, onWallMaterialChange, onFloorMaterialChange, onOpenCatalog, orchestrator }) => {
    const [selectedMenuItem, setSelectedMenuItem, goBackToMenu] = useSideBarData<SelectedMenuItemMode>();

    if (selectedMenuItem === null) {
      return (
        <SideBarLayout className="border-r-1 border-r border-r-border-main">
          <SideBarOptions
            setSelectedMenuItem={setSelectedMenuItem}
            currentWallMaterial={settingsStore.selectedWallMaterial}
            currentFloorMaterial={settingsStore.selectedFloorMaterial}
          />

          <div className="flex w-full bg-white py-4 px-1 justify-center mt-auto">
            <Button appearance="gradient-mono-green" className="text-center justify-center items-center" onClick={onOpenCatalog}>
              <FormattedMessage id="ui.configurator.chooseProductButton" />
            </Button>
          </div>
        </SideBarLayout>
      );
    }

    let RenderedItem: React.ReactElement = <></>;
    let title: string = '';

    switch (selectedMenuItem) {
      case SelectedMenuItemMode.WallTextureChoice:
        RenderedItem = (
          <TextureChoice
            textures={DatasetService.wallTextures}
            onSelect={onWallMaterialChange}
            selected={settingsStore.selectedWallMaterial}
            lastSelectedColorCode={settingsStore.lastColorForWalls}
            whichMaterialIsLoading={settingsStore.whichMaterialIsLoading}
          />
        );
        title = localization.formatMessage('ui.configurator.menu.wallTexture');
        break;

      case SelectedMenuItemMode.FloorTextureChoice:
        RenderedItem = (
          <TextureChoice
            textures={DatasetService.floorTextures}
            onSelect={onFloorMaterialChange}
            selected={settingsStore.selectedFloorMaterial}
            lastSelectedColorCode={settingsStore.lastColorForFloor}
            whichMaterialIsLoading={settingsStore.whichMaterialIsLoading}
          />
        );
        title = localization.formatMessage('ui.configurator.menu.floorTexture');
        break;

      case SelectedMenuItemMode.SceneSettings:
        RenderedItem = (
          <SceneSettings
            onGridOpacityChange={orchestrator.changeGridOpacity.bind(orchestrator)}
            gridOpacity={settingsStore.gridOpacity}
          />
        );
        title = localization.formatMessage('ui.configurator.menu.sceneSettings');
        break;
    }

    return (
      <SideBarLayout className="border-r-1 border-r border-r-border-main overflow-y-auto">
        <SideBarHeading onBackButtonClick={goBackToMenu} title={title} />
        {RenderedItem}
      </SideBarLayout>
    );
  }
);
