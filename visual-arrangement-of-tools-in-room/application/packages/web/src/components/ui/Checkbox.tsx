import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/components/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>, VariantProps<typeof CheckboxVariants> {
  id: string;
  label: string;
  onChange: (newValue: boolean) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({ className, id, label, appearance, onChange, ...props }) => {
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.currentTarget.checked);
  };

  return (
    <div className={cn('flex items-center', className)}>
      <input className={CheckboxVariants({ appearance })} id={id} type="checkbox" onChange={onCheckboxChange} {...props} />
      <label className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

const CheckboxVariants = cva(['w-4 h-4 rounded focus:ring-2 bg-gray-100 border-gray-300 transition transition-all accent-current'], {
  variants: {
    appearance: {
      primary: 'text-primary-600 focus:ring-primary-500',
      red: 'text-red-600 focus:ring-red-500',
      purple: 'text-purple-600 focus:ring-purple-500',
      teal: 'text-teal-600 focus:ring-teal-500',
      yellow: 'text-yellow-400 focus:ring-yellow-500',
      orange: 'text-orange-500 focus:ring-orange-500'
    }
  },
  defaultVariants: { appearance: 'primary' }
});
