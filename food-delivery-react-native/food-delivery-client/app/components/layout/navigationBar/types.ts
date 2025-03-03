import type { ExpoIconNames } from '@/types/expo-icon.t';
import type { NavigationScreensListType } from '@/navigation/types';

export interface MenuItemType {
  path: keyof NavigationScreensListType;
  icon: ExpoIconNames;
}

export type NavigateFunctionType = (path: keyof NavigationScreensListType) => void;
