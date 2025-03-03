import React from 'react';
import { View } from 'react-native';
import type { NavigateFunctionType } from '@/components/layout/navigationBar/types';
import type { NavigationScreensListType } from '@/navigation/types';
import { menuItems } from '@/components/layout/navigationBar/menu.data';
import { MenuItem } from '@/components/layout/navigationBar/MenuItem';

interface NavigationBarProps {
  navigate: NavigateFunctionType;
  currentScreen?: keyof NavigationScreensListType;
}


export const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  return (
    <View className="px-2 flex flex-row justify-between items-center w-full">
      {
        menuItems.map(item => (
          <MenuItem item={item}  key={item.path} {...props} />
        ))
      }
    </View>
  );
};