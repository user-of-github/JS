import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPadings = {
  vertical: 30,
  horizontal: 30
} as const;

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top + AppPadings.vertical,
          paddingBottom: insets.bottom + AppPadings.vertical,
          paddingLeft: insets.left + AppPadings.horizontal,
          paddingRight: insets.right + AppPadings.horizontal
        }
      ]}
    >
      {children}
    </View>
  );
};
