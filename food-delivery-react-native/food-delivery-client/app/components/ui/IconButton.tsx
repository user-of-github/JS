import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { ExpoIconNames } from '@/types/expo-icon.t';

export type IconButtonSize = 'default' | 'small';

interface IconButtonProps {
  size?: IconButtonSize;
  onPress?: VoidFunction;
  icon: {
    component?: React.ReactNode;
    name?: ExpoIconNames;
    color?: string;
  };
}

const sizes: Record<IconButtonSize, { containerSize: number; iconSize: number }> = {
  default: {
    containerSize: 55,
    iconSize: 25
  } as const,

  small: {
    containerSize: 40,
    iconSize: 23
  } as const
} as const;

export const IconButton: React.FC<IconButtonProps> = ({ size = 'default ', onPress, icon }) => {
  const { containerSize, iconSize } = sizes[(size || 'default') as IconButtonSize];

  return (
    <View className="rounded-full flex overflow-hidden" style={{ width: containerSize }}>
      <TouchableNativeFeedback
        className="rounded-full overflow-hidden justify-center items-center"
        background={TouchableNativeFeedback.Ripple('#ccc', false)}
        onPress={onPress}
      >
        <View
          className="bg-[#FFF] rounded-full overflow-hidden justify-center items-center"
          style={{ width: containerSize, height: containerSize }}
        >
          {icon.component}
          {icon.name && <Feather name={icon.name} size={iconSize} color={icon.color} className="overflow-hidden" />}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
