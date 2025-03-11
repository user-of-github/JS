import React from 'react';
import { observer } from 'mobx-react-lite';
import { localization } from '@/stores/Localization';
import { WallsSettingsStore } from '@/stores/walls/WallsSettingsStore';
import { Checkbox, RangeSlider } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';

interface CanvasSettingsProps {
  store: WallsSettingsStore;
  className?: string;
}

export const WallCanvasSettings: React.FC<CanvasSettingsProps> = observer(({ store, className }) => {
  return (
    <div className={className}>
      <div className={settingsBlockClass}>
        <Typography variant="h5" className={settingsBlockTitleClass}>
          {localization.formatMessage('ui.configurator.binding.blockTitle')}
        </Typography>
        <Checkbox
          id="angles-binding"
          label={localization.formatMessage('ui.configurator.binding.bindingForAngles')}
          checked={store.isAngleBindingEnabled}
          onChange={store.toggleAnglesBinding}
        />

        <Checkbox
          id="other-walls-binding"
          label={localization.formatMessage('ui.configurator.binding.bindingToOtherWalls')}
          checked={store.isWallsBindingEnabled}
          onChange={store.toggleWallsBinding}
        />
      </div>

      {/*<div className={settingsBlockClass}>*/}
      {/*  <Typography variant="h5" className={settingsBlockTitleClass}>*/}
      {/*    {localization.formatMessage('ui.configurator.wallWidth')}*/}
      {/*  </Typography>*/}
      {/*  <RangeSlider*/}
      {/*    min={WallsSettingsStore.wallThicknessConstraint.min}*/}
      {/*    max={WallsSettingsStore.wallThicknessConstraint.max}*/}
      {/*    step={5}*/}
      {/*    value={store.wallsThickness}*/}
      {/*    id="walls-thickness"*/}
      {/*    label={store.wallsThickness + ' ' + localization.formatMessage('ui.units.mm')}*/}
      {/*    onChange={store.changeWallsThickness}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
});

export const settingsBlockTitleClass = 'mb-2 font-medium';
export const settingsBlockClass = 'flex flex-col border-b-primary-200 border-b py-2' as const;
