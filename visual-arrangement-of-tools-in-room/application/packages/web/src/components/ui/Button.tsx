import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof ButtonVariants>;

export const Button: React.FC<ButtonProps> = ({ appearance, size, rounded, className, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(ButtonVariants({ appearance, size, rounded }), className)} {...props}>
      {children}
    </button>
  );
};

const ButtonVariants = cva(
  [
    'select-none flex text-center font-medium text-sm px-5 py-2.5 active:ring-4 active:outline-none cursor-pointer',
    'transition transition-all disabled:opacity-65 disabled:pointer-events-none disabled:cursor-default'
  ],
  {
    variants: {
      appearance: {
        'flat-primary': 'text-white bg-primary-700 hover:bg-primary-800 active:ring-primary-300 ',
        'flat-ordinary':
          'text-gray-900 active:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 active:ring-gray-200',
        'flat-dark': 'text-white bg-gray-800 hover:bg-gray-900 active:ring-gray-300',
        'flat-light': 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 active:ring-gray-200',
        'flat-green': 'text-white bg-green-700 hover:bg-green-800active:ring-green-300',
        'flat-red': 'text-white bg-red-700 hover:bg-red-800 active:ring-red-300',
        'flat-yellow': 'text-white bg-yellow-400 hover:bg-yellow-500 active:ring-yellow-300',
        'flat-purple': 'text-white bg-purple-700 hover:bg-purple-800 active:ring-purple-300',

        'flat-primary-outlined':
          'text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 active:ring-primary-300',
        'flat-dark-outlined': 'text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 active:ring-gray-300',
        'flat-green-outlined': 'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 active:ring-green-300',
        'flat-red-outlined': 'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 active:ring-red-300',
        'flat-yellow-outlined': 'text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 active:ring-yellow-300',
        'flat-purple-outlined':
          'text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 active:outline-none active:ring-purple-300',

        'gradient-mono-primary':
          'text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br active:ring-primary-300',
        'gradient-mono-green':
          'text-white bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br active:ring-green-300',
        'gradient-mono-red':
          'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br active:ring-red-300',
        'gradient-mono-purple':
          'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br active:ring-purple-300',
        'gradient-mono-lime':
          'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br active:ring-lime-300',

        'gradient-outline-primary':
          'hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'
      },
      rounded: {
        full: 'rounded-full',
        default: 'rounded-lg'
      },
      size: {
        default: 'w-fit',
        fullWidth: 'w-full',
        smallPadding: 'px-3 py-1.5'
      }
    },
    defaultVariants: {
      appearance: 'gradient-mono-primary',
      size: 'default',
      rounded: 'default'
    }
  }
);
