import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPaddings = {
  vertical: 30,
  horizontal: 30
} as const;

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top + AppPaddings.vertical,
          paddingBottom: insets.bottom + AppPaddings.vertical,
          paddingLeft: insets.left + AppPaddings.horizontal,
          paddingRight: insets.right + AppPaddings.horizontal
        }
      ]}
    >
      {children}
    </View>
  );
};
