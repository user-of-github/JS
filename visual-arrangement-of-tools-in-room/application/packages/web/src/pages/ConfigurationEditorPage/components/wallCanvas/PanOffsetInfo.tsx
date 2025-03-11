import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Formatter } from '@/core/services/Formatter';
import type { PanOffset } from '@/core/types/WallCanvas';
import { localization } from '@/stores/Localization';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/components/utils';

interface PanOffsetInfoProps {
  className?: string;
  panOffset: Readonly<PanOffset>;
  onClick?: () => void;
}

export const PanOffsetInfo: React.FC<PanOffsetInfoProps> = ({ panOffset, className, onClick }) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  return (
    <button
      className={cn(
        'bg-primary-800/75 rounded-md py-1 px-3 cursor-pointer active:scale-95 transition-transform select-none min-w-[280px]',
        'relative overflow-hidden',
        className
      )}
      title="Reset pan offset"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Typography variant="paragraph" className="text-white w-full flex justify-between">
        <FormattedMessage id="ui.configurator.panOffset" />
        <span>
          [{Formatter.formatWholeNumber(panOffset.x)} × {Formatter.formatWholeNumber(panOffset.y)}]
        </span>
      </Typography>

      <div
        className={cn(
          'absolute top-0 left-0 right-0 bottom-0 bg-primary-800 flex items-center justify-center text-white',
          'transition-transform duration-200 -translate-y-full',
          isHovered && 'translate-y-0'
        )}
      >
        <Typography variant="paragraph-small">
          <FormattedMessage id="ui.configurator.resetOffset" />
        </Typography>
      </div>
    </button>
  );
};
