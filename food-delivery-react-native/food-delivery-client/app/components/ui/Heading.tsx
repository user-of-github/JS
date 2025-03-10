import React from 'react';
import { Text } from 'react-native';
import { cn } from '@/components/utils';

type HeadingSizeType = 'page' | 'section' | 'extralarge';


interface HeadingProps {
  center?: boolean;
  className?: string;
  size?: HeadingSizeType;
}

const headingSize: Record<HeadingSizeType, number> = {
  page: 30,
  section: 25,
  extralarge: 35
} as const;


export const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({ center = false, className, size = 'page', children }) => (
  <Text
    className={cn('text-secondary font-black', center && 'text-center', className)}
    style={{ fontSize: headingSize[size] }}
  >
    {children}
  </Text>
);
