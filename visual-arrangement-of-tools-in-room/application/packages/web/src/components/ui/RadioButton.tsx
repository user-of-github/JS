import React from 'react';
import { cn } from '@/components/utils';

interface RadioButtonProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
  value: string;
  className?: string;
  disabled?: boolean;
}

export const RadioButtonCard: React.FC<React.PropsWithChildren<RadioButtonProps>> = ({
  id,
  name,
  checked,
  onChange,
  children,
  value,
  className,
  disabled
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className="w-full">
      <input
        value={value}
        type="radio"
        id={id}
        name={name}
        className="hidden peer"
        checked={checked}
        onChange={changeHandler}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={cn(
          'outline -outline-offset-2 overflow-hidden flex items-center justify-between w-full text-gray-500 bg-white outline-2 outline-gray-200 rounded-lg peer-checked:outline-primary-600 transition transition-colors duration-100',
          !disabled && 'hover:text-gray-600 hover:bg-gray-50 cursor-pointer ',
          className
        )}
      >
        {children}
      </label>
    </div>
  );
};
