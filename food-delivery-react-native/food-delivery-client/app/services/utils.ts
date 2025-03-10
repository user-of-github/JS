import { SERVER_URL } from '@/config/api';

export const getMediaSource = (path: string): string => {
  return `${SERVER_URL}${path}`;
};

export const convertPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};
