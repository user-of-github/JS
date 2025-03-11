import React from 'react';
import { cn } from '@/components/utils';
import styles from './Block.module.css';

interface BlockProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  component?: 'div' | 'aside';
}

export const Block: React.FC<BlockProps> = ({ className, children, component = 'div', ...props }) => {
  const Component = component;

  return (
    <Component className={cn('rounded', styles.block, className)} {...props}>
      {children}
    </Component>
  );
};
