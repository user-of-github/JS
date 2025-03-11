import React from 'react';
import type { Material } from '@/core/types/domain/Material';
import { localization } from '@/stores/Localization';
import { MenuCardItem, imageContainerQuery } from '@/components/MenuCardItem';
import { Icon } from '@/components/ui/icons';
import { cn } from '@/components/utils';
import { SelectedMenuItemMode } from './SideBar';

interface SideBarOptionsProps {
  setSelectedMenuItem: (selectedMenuItemMode: SelectedMenuItemMode) => void;
  currentWallMaterial: Material;
  currentFloorMaterial: Material;
}

export const SideBarOptions: React.FC<SideBarOptionsProps> = ({ setSelectedMenuItem, currentWallMaterial, currentFloorMaterial }) => {
  const wallTextureImage =
    currentWallMaterial?.type === 'texture' ? (
      <img src={currentWallMaterial.preview} className={imageContainerQuery} alt={currentWallMaterial.name} />
    ) : (
      <div className={imageContainerQuery} style={{ backgroundColor: currentWallMaterial.color }} />
    );

  const floorTextureImage =
    currentFloorMaterial?.type === 'texture' ? (
      <img src={currentFloorMaterial.preview} className={imageContainerQuery} alt={currentFloorMaterial.name} />
    ) : (
      <div className={imageContainerQuery} style={{ backgroundColor: currentFloorMaterial.color }} />
    );

  return (
    <div className="w-full flex flex-col gap-y-3">
      <MenuCardItem
        title={localization.formatMessage('ui.configurator.menu.wallTexture')}
        description={localization.formatMessage('ui.configurator.menu.wallTextureText')}
        image={wallTextureImage}
        onClick={() => setSelectedMenuItem(SelectedMenuItemMode.WallTextureChoice)}
      />

      <MenuCardItem
        title={localization.formatMessage('ui.configurator.menu.floorTexture')}
        description={localization.formatMessage('ui.configurator.menu.floorTextureText')}
        image={floorTextureImage}
        onClick={() => setSelectedMenuItem(SelectedMenuItemMode.FloorTextureChoice)}
      />

      <MenuCardItem
        title={localization.formatMessage('ui.configurator.menu.sceneSettings')}
        description={localization.formatMessage('ui.configurator.menu.sceneSettingsText')}
        image={<Icon iconName="settings" width={40} />}
        onClick={() => setSelectedMenuItem(SelectedMenuItemMode.SceneSettings)}
      />
    </div>
  );
};
