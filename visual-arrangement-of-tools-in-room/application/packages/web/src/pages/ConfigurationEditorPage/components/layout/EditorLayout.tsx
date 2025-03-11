import React from 'react';
import { motion } from 'framer-motion';
import { animatedComponentProperties } from '@/components/AnimatedPage';
import { headerHeight } from '@/components/Header';
import { cn } from '@/components/utils';

export const EditorLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div className="flex-grow w-full max-h-full grid grid-cols-[repeat(16,1fr)]" {...animatedComponentProperties}>
    {children}
  </motion.div>
);

// @todo: sorry for max-h-[calc(100vh-80px)] (headerHeight)
export const CanvasContainer: React.FC<React.PropsWithChildren<{ id: string; className?: string }>> = ({
  id,
  children,
  className
}) => (
  <div
    className={cn(
      'w-full h-full col-start-5 2xl:col-start-4 col-end-[17] relative',
      `max-h-[calc(100vh-${headerHeight}px)]`,
      className
    )}
    id={id}
  >
    {children}
  </div>
);
