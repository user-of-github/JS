import React from 'react';
import { FormattedMessage } from 'react-intl';
import { localization } from '@/stores/Localization';
import type { ActiveMode } from '@/stores/types';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/components/utils';

interface ViewModeSwitcherProps {
  currentMode: ActiveMode;
  enter3DMode: () => void;
  enterWalls2DMode: () => void;
  className?: string;
}

const modeButtonBaseClass =
  'text-sm w-7 h-7 flex text-center justify-center items-center bg-transparent outline-none rounded-full transition-all active:scale-95';

export const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({ currentMode, enter3DMode, enterWalls2DMode, className }) => {
  return (
    <div className={cn('select-none flex items-center gap-x-4 p-2 rounded border-1 border border-border-main', className)}>
      <Typography variant="paragraph-small">{localization.formatMessage('ui.configurator.viewMode')}</Typography>
      <div className="bg-primary-800 p-2 rounded-full flex flex-row items-center gap-x-1">
        <button
          onClick={enterWalls2DMode}
          className={cn(
            modeButtonBaseClass,
            currentMode.type === 'edit' && currentMode.subtype === 'walls' && 'bg-white',
            currentMode.type !== 'edit' || (currentMode.subtype !== 'walls' && 'text-white hover:bg-primary-600')
          )}
        >
          <FormattedMessage id="ui.general.2d" />
        </button>
        <button
          onClick={enter3DMode}
          className={cn(
            modeButtonBaseClass,
            currentMode.type === 'edit' && currentMode.subtype === 'objects' && 'bg-white',
            currentMode.type !== 'edit' || (currentMode.subtype !== 'objects' && 'text-white hover:bg-primary-600')
          )}
        >
          <FormattedMessage id="ui.general.3d" />
        </button>
      </div>
    </div>
  );
};
