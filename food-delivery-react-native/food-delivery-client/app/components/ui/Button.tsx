import React from 'react';
import { Pressable, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { cn } from '@/components/utils';


interface CustomButtonProps extends React.PropsWithChildren<TouchableOpacityProps> {
  children?: string;
  className?: string;
}

export const Button: React.FC<CustomButtonProps> = ({ children, className, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      className={cn('self-center  rounded-lg bg-primary py-5 px-5 w-full', className)}
    >
        <Text className="text-white text-2xl">{children}</Text>
    </TouchableOpacity>
  );
};