import React from 'react';
import styles from './ProductCard.module.css';
import { Typography } from './ui/Typography';
import { cn } from './utils';

interface ProductCardProps {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  price: number | null | string;
  className?: string;
  onDoubleClick?: VoidFunction;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, description, imageUrl, price, className, onDoubleClick }) => {
  return (
    <section
      className={cn(
        'select-none max-w-xs w-full bg-white outline outline-1 -outline-offset-2 outline-border-main hover:outline-border-main-hover active:outline-border-main-active transition-colors duration-100 rounded-lg overflow-hidden shadow-sm flex flex-col transition-all',
        className
      )}
      onDoubleClick={onDoubleClick}
    >
      <img className="w-full h-52 object-cover" src={imageUrl} alt={title} />

      <div className="p-5 flex flex-col items-start">
        <Typography variant="h4" className={cn('mb-2 font-bold tracking-tight text-gray-900 h-14', styles.truncate2Rows)}>
          {title}
        </Typography>
        <Typography variant="paragraph-small" className="mb-3 font-normal text-gray-400 text-left truncate">
          {description}
        </Typography>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{price} </span>
      </div>
    </section>
  );
};
