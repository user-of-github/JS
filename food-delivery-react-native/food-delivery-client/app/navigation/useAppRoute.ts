import { type RouteProp, useRoute } from '@react-navigation/native';
import { NavigationScreensListType } from '@/navigation/types';

export const useAppRoute = <T extends keyof NavigationScreensListType>() => {
  return useRoute<RouteProp<NavigationScreensListType, T>>();
};
