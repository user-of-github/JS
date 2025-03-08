import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPaddings = {
  vertical: 30,
  horizontal: 20,
  top: 10
} as const;

interface ContainerProps {
  className?: string;
  avoidLeftPadding?: boolean;
  avoidRightPadding?: boolean;
  avoidTopPadding?: boolean;
  avoidBottomPadding?: boolean;
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  className,
  avoidLeftPadding = false,
  avoidRightPadding = false,
  avoidTopPadding = false,
  avoidBottomPadding = false
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        {
          paddingTop: avoidTopPadding ? 0 : (insets.top + AppPaddings.vertical + AppPaddings.top),
          paddingBottom: avoidBottomPadding ? 0 : (insets.bottom + AppPaddings.vertical),
          paddingLeft: avoidLeftPadding ? 0 : insets.left + AppPaddings.horizontal,
          paddingRight: avoidRightPadding ? 0 : insets.right + AppPaddings.horizontal
        }
      ]}
      className={className}
    >
      {children}
    </ScrollView>
  );
};
