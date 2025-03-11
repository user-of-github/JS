import React from 'react';
import { clsx } from 'clsx';
import { localization } from '@/stores/Localization';
import { Tool, availableTools } from '@/stores/walls/WallsSettingsStore';
import { ValueSelector } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/components/utils';

interface ToolSelectorProps {
  className?: string;
  currentTool: Tool;
  onToolSelect: (tool: Tool) => void;
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({ currentTool, onToolSelect, className }) => (
  <div className={cn('flex items-center gap-x-3 bg-primary-800 rounded-md py-1 px-3 select-none', className)}>
    <Typography variant="paragraph" className="text-white">
      {localization.formatMessage('ui.configurator.tools.currentTool')}
    </Typography>

    <ValueSelector
      className="w-fit p-1 rounded-md"
      name="wall-canvas-tool"
      options={availableTools}
      selected={currentTool}
      onSelect={onToolSelect}
      renderFunction={(value, isSelected) => (
        <div
          className={cn(
            'w-fit flex flex-col items-center justify-center p-1 rounded-md transition-all cursor-pointer',
            'capitalize flex flex-row items-center gap-x-1',
            {
              'bg-neutral-100': isSelected,
              'text-white': isSelected,
              'hover:bg-[rgba(255,255,255,0.2)] active:scale-[0.95] ': !isSelected
            }
          )}
          title={localization.formatMessage(`ui.configurator.tools.${value.toLowerCase()}`)}
        >
          <img src={toolIcons[value]} alt={value} className={cn('w-5 h-5', !isSelected && 'invert brightness-0')} />
        </div>
      )}
    />
  </div>
);

const toolIcons: Record<keyof typeof Tool, string> = {
  Wall: '/assets/icons/line.png',
  Select: '/assets/icons/selection.png'
};
