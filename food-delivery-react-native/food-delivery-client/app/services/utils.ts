import { SERVER_URL } from '@/config/api';

export const getMediaSource = (path: string): string => {
  return `${SERVER_URL}${path}`;
};
