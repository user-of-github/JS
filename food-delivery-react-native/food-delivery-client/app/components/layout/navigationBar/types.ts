import type { NavigationScreensListType } from '@/navigation/types';
import type { ExpoIconNames } from '@/types/expo-icon.t';

export interface MenuItemType {
  path: keyof NavigationScreensListType;
  icon: ExpoIconNames;
}

export type NavigateFunctionType = (path: keyof NavigationScreensListType) => void;