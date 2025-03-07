import React from 'react';
import { Text } from 'react-native';
import { cn } from '@/components/utils';


interface HeadingProps {
  center?: boolean;
  className?: string;
}


export const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({ center = false, className, children }) => (
  <Text className={cn('text-secondary font-black text-5xl', center && 'text-center', className)}>
    { children}
  </Text>
);