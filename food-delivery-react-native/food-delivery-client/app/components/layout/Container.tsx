import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPaddings = {
  vertical: 30,
  horizontal: 30
} as const;

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();

  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }]
  }));

  return (
    <View
      style={[
        {
          paddingTop: insets.top + AppPaddings.vertical,
          paddingBottom: insets.bottom + AppPaddings.vertical,
          paddingLeft: insets.left + AppPaddings.horizontal,
          paddingRight: insets.right + AppPaddings.horizontal
        },
        animatedStyles
      ]}
    >
      {children}
    </View>
  );
};
