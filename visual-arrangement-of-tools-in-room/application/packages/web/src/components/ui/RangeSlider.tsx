import React from 'react';

interface RangeSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  min: number;
  max: number;
  value: number;
  label: React.ReactNode;
  onChange: (newValue: number) => void;
}
export const RangeSlider: React.FC<RangeSliderProps> = ({ id, min, max, value, label, onChange, ...props }) => {
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(event.currentTarget.value);
    onChange(value);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-primary-800 cursor-pointer text-primary-600"
        onChange={onValueChange}
        {...props}
      />
    </div>
  );
};
