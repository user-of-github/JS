import React from 'react';
import { localization } from '@/stores/Localization';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/components/utils';
import styles from './ColorPicker.module.css';

interface ColorPickerProps extends React.HTMLAttributes<HTMLInputElement> {
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, className, ...props }) => {
  const onInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    onColorChange(event.currentTarget.value);
  };

  return (
    <div className="transition-all hover:shadow-sm active:scale-95 w-full cursor-pointer overflow-hidden rounded flex flex-col items-center border-1 border border-border-main hover:border-border-main-active">
      <input type="color" onInput={onInput} className={cn(styles.inputTypeColor, className)} {...props} />
    </div>
  );
};
