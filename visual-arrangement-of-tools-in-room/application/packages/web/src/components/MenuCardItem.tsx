import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/components/utils';

interface MenuCardItemProps {
  onClick: () => void;
  image: React.ReactElement;
  title: string;
  description: string;
  className?: string;
}

export const imageContainerQuery = cn(
  'aspect-square object-cover rounded',
  'hidden',
  '@[200px]/menucard:block @[150px]/menucard:w-12 @[150px]/menucard:h-12 @[150px]/menucard:absolute @[150px]/menucard:top-0 @[150px]/menucard:right-0 @[150px]/menucard:opacity-75',
  '@[225px]/menucard:w-14 @[200px]/menucard:h-14 @[200px]/menucard:translate-x-0 @[200px]/menucard:translate-y-0 @[200px]/menucard:static',
  '@[250px]/menucard:w-20 @[250px]/menucard:h-20'
);

export const MenuCardItem: React.FC<MenuCardItemProps> = ({ onClick, image, title, description, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative select-none bg-none flex gap-x-2 justify-between w-full items-center rounded py-4 px-2.5 @[250px]/menucard:py-5 @[250px]/menucard:px-4',
        'outline outline-1 outline-border-main hover:outline-border-main-hover duration-100 transition-all active:outline-border-main-active',
        '@container/menucard',
        className
      )}
    >
      <div className="flex flex-col gap-y-1 items-start">
        <Typography variant="h6" className="text-left">
          {title}
        </Typography>
        <Typography variant="paragraph-small" className="text-left text-gray-600 text-sm">
          {description}
        </Typography>
      </div>

      {image}
    </button>
  );
};
