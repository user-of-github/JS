import React from 'react';
import { Pressable, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { cn } from '@/components/utils';

interface CustomButtonProps extends React.PropsWithChildren<TouchableOpacityProps> {
  children?: string;
  className?: string;
}

export const Button: React.FC<CustomButtonProps> = ({ children, className, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      className={cn('self-center  rounded-lg bg-secondary py-4 w-full', className)}
    >
      <Text className="text-white text-2xl font-bold text-center">{children}</Text>
    </TouchableOpacity>
  );
};
