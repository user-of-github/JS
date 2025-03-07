import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '@/components/utils';

interface CustomButtonProps extends React.PropsWithChildren<TouchableOpacityProps> {
  children?: string;
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<CustomButtonProps> = ({ children, className, textClassName, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      className={cn('self-center  rounded-lg bg-secondary py-4 w-full', className)}
    >
      <Text className={cn("text-white text-2xl font-bold text-center", textClassName)}>{children}</Text>
    </TouchableOpacity>
  );
};
