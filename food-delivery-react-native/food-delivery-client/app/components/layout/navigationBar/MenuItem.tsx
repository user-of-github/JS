import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NavigationScreensListType } from '@/navigation/types';
import type { MenuItemType, NavigateFunctionType } from '@/components/layout/navigationBar/types';
import { menuItems } from '@/components/layout/navigationBar/menu.data';

interface MenuItemProps {
  item: MenuItemType;
  navigate: NavigateFunctionType;
  currentScreen?: keyof NavigationScreensListType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, currentScreen, navigate }) => {
  const isActive = currentScreen === item.path;
  const { width } = Dimensions.get('window')

  return (
    <TouchableOpacity
      onPress={() => navigate(item.path)}
      className="flex items-center justify-center"
      style={{
        height: width / menuItems.length - 10,
        width: width / menuItems.length,
      }}
    >
      <Feather name={item.icon} size={24} color={isActive ? '#194DC8' : '#999999'} />
    </TouchableOpacity>
  );
};
