import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { cn } from '@/components/utils';

interface AnimatedPageProps {
  className?: string;
}

export const pagePaddings = 'px-20 max-lg:px-10 max-md:px-5 max-sm:px-3';

export const AnimatedPage: React.FC<React.PropsWithChildren<AnimatedPageProps>> = ({ children, ...props }) => (
  <motion.main {...animatedPageProperties} {...props}>
    {children}
  </motion.main>
);

export const animatedPageProperties = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35 }
} as const;

export const animatedComponentProperties = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 }
} as const;

export const animatedComponent2Properties = {
  initial: { x: '-50%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 }
} as const;
