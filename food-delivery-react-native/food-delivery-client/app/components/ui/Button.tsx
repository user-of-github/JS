import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '@/components/utils';

interface CustomButtonProps extends React.PropsWithChildren<TouchableOpacityProps> {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<CustomButtonProps> = ({ children, className, textClassName, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      {...props}
      className={cn('rounded-lg bg-secondary py-3.5 w-full flex items-center justify-center', className)}
    >
      <Text className={cn('text-white text-xl font-bold text-center', textClassName)}>{children}</Text>
    </TouchableOpacity>
  );
};
