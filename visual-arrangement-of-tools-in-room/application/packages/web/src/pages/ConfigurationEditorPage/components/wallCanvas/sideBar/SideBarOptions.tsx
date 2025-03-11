import React from 'react';
import { observer } from 'mobx-react-lite';
import type { WallCanvasElementLine } from '@/core/types/WallCanvas';
import { localization } from '@/stores/Localization';
import { WallsSettingsStore } from '@/stores/walls/WallsSettingsStore';
import { MenuCardItem } from '@/components/MenuCardItem';
import { Icon } from '@/components/ui/icons';
import { SelectedMenuItemMode } from '@/pages/ConfigurationEditorPage/components/wallCanvas/sideBar/SideBar';

interface SideBarOptionsProps {
  selectedWall?: WallCanvasElementLine | null | undefined;
  setSelectedMenuItem: (selectedMenuItemMode: SelectedMenuItemMode) => void;
}

export const SideBarOptions: React.FC<SideBarOptionsProps> = observer(({ selectedWall, setSelectedMenuItem }) => (
  <div className="w-full flex flex-col gap-y-3">
    <MenuCardItem
      title={localization.formatMessage('ui.configurator.menu.parameters')}
      description={localization.formatMessage('ui.configurator.menu.parametersText')}
      image={<Icon iconName="settings" width={40} className="w-10" />}
      onClick={() => setSelectedMenuItem(SelectedMenuItemMode.WallCanvasSettings)}
    />

    <MenuCardItem
      title={localization.formatMessage('ui.configurator.menu.selectedItem')}
      description={
        selectedWall
          ? localization.formatMessage('ui.configurator.menu.selectedItemText')
          : localization.formatMessage('ui.configurator.menu.wallNotSelected')
      }
      image={<Icon iconName="wall" width={40} className="w-10" />}
      onClick={() => setSelectedMenuItem(SelectedMenuItemMode.SelectedWallInfo)}
    />
  </div>
));
