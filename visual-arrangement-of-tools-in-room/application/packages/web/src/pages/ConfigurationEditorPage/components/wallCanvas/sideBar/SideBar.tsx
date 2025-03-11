import React from 'react';
import { observer } from 'mobx-react-lite';
import { localization } from '@/stores/Localization';
import type { WallsEditStore } from '@/stores/walls/WallsEditStore';
import { type WallsSettingsStore } from '@/stores/walls/WallsSettingsStore';
import { useSideBarData } from '@/components/hooks/useSideBarData';
import { Block } from '@/components/ui/Block';
import { SideBarHeading, SideBarLayout } from '../../layout/SideBarLayout';
import { SelectedWallInfo } from './SelectedWallInfo';
import { SideBarOptions } from './SideBarOptions';
import { WallCanvasSettings } from './WallCanvasSettings';

interface SideBarProps {
  settingsStore: WallsSettingsStore;
  store: WallsEditStore;
}

export const enum SelectedMenuItemMode {
  WallCanvasSettings = 'WallCanvasSettings',
  SelectedWallInfo = 'SelectedWallInfo'
}

export const SideBar: React.FC<SideBarProps> = observer(({ settingsStore, store }) => {
  const [selectedMenuItem, setSelectedMenuItem, goBackToMenu] = useSideBarData<SelectedMenuItemMode>();

  if (selectedMenuItem === null) {
    return (
      <SideBarLayout>
        <SideBarOptions selectedWall={store.selectedWall} setSelectedMenuItem={setSelectedMenuItem} />
      </SideBarLayout>
    );
  }

  const onWallDelete = (): void => {
    store.removeSelectedWall();
    goBackToMenu();
  };

  let RenderedView: React.ReactElement = <></>;
  let title: string = '';

  switch (true) {
    case selectedMenuItem === SelectedMenuItemMode.WallCanvasSettings:
      RenderedView = (
        <Block className="w-full h-fit px-6 py-5">
          <WallCanvasSettings store={settingsStore} />
        </Block>
      );
      title = localization.formatMessage('ui.configurator.menu.parameters');
      break;
    case selectedMenuItem === SelectedMenuItemMode.SelectedWallInfo && !!store.selectedWall:
      RenderedView = <SelectedWallInfo selectedWall={store.selectedWall} onWallDelete={onWallDelete} />;
      title = localization.formatMessage('ui.configurator.menu.selectedItem');
      break;
    default:
      goBackToMenu();
      break;
  }

  return (
    <SideBarLayout>
      <SideBarHeading title={title} onBackButtonClick={goBackToMenu} />
      {RenderedView}
    </SideBarLayout>
  );
});
