import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPaddings = {
  vertical: 30,
  horizontal: 30
} as const;

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
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
      className={className}
    >
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  );
};
