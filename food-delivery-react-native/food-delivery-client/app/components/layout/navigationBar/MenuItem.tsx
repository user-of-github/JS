import React from 'react';
import { Pressable, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NavigationScreensListType } from '@/navigation/types';
import type { MenuItemType, NavigateFunctionType } from '@/components/layout/navigationBar/types';

interface MenuItemProps {
  item: MenuItemType;
  navigate: NavigateFunctionType;
  currentScreen?: keyof NavigationScreensListType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, currentScreen, navigate }) => {
  const isActive = currentScreen === item.path;

  return (
    <TouchableOpacity
      onPress={() => navigate(item.path)}
      className="flex items-center w-[20%] pt-[20px]"
      style={{
        paddingVertical: 17,
        borderRadius: 10000
      }}
    >
      <Feather name={item.icon} size={22} color={isActive ? '#194DC8' : '#999999'} />
    </TouchableOpacity>
  );
};
