import React from 'react';
import { cn } from '../utils';

interface ValueSelectorProps<ValueType> {
  name: string;
  options: Readonly<ValueType[]>;
  selected: ValueType | undefined | null;
  renderFunction?: (value: ValueType, isSelected?: boolean) => React.ReactNode;
  className?: string;
  onSelect: (value: ValueType) => void;
  disabled?: boolean;
}

export const ValueSelector = <ValueType,>({
  name,
  options,
  selected,
  renderFunction,
  className,
  onSelect,
  disabled
}: ValueSelectorProps<ValueType>): React.ReactNode => {
  const [id] = React.useId();

  return (
    <ul className={cn('flex flex-row gap-x-1', disabled && 'opacity-60 cursor-default select-none pointer-events-none', className)}>
      {options.map((option, index) => {
        const inputId = `${id}-input-${index}-${option}`;
        const isSelected = selected === option;

        return (
          <li key={index}>
            <input
              type="radio"
              name={name}
              className="m-0 p-0 absolute opacity-0"
              checked={isSelected}
              onChange={() => onSelect(option)}
              id={inputId}
              disabled={disabled}
            />
            <label htmlFor={inputId} className="cursor-pointer">
              {renderFunction ? renderFunction(option, isSelected) : String(option)}
            </label>
          </li>
        );
      })}
    </ul>
  );
};
