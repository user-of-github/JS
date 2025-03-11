import React from 'react';
import { cn } from '@/components/utils';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'paragraph-small';

/*  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'paragraph1'
  | 'paragraph2';*/

interface TypographyProps {
  children: React.ReactNode;
  variant: TypographyVariant;
  className?: string;
  title?: string;
}

export const Typography: React.FC<TypographyProps> = ({ children, title, variant, className }) => {
  let Component: keyof JSX.IntrinsicElements;
  let classes: string;

  switch (variant) {
    case 'h1':
      Component = 'h1';
      classes = 'font-semibold text-4xl leading-10';
      break;
    case 'h2':
      Component = 'h2';
      classes = 'font-semibold text-3xl';
      break;
    case 'h3':
      Component = 'h3';
      classes = 'font-semibold text-2xl';
      break;
    case 'h4':
      Component = 'h4';
      classes = 'font-semibold text-xl';
      break;
    case 'h5':
      Component = 'h5';
      classes = 'font-semibold text-lg';
      break;
    case 'h6':
      Component = 'h6';
      classes = 'font-semibold text-md';
      break;
    case 'paragraph':
      Component = 'p';
      classes = 'text-md leading-6';
      break;
    case 'paragraph-small':
      Component = 'p';
      classes = 'text-sm leading-5';
      break;
  }

  return (
    <Component className={cn(classes, className)} title={title}>
      {children}
    </Component>
  );
};
