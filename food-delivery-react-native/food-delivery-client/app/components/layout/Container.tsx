import React from 'react';
import { ScrollView, type StyleProp, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppLayoutPaddings = Object.freeze({
  vertical: 30,
  horizontal: 20,
  top: 10
} as const);

interface ContainerProps {
  className?: string;
  style?: StyleProp<any>;
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({ children, className }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        {
          paddingTop: insets.top + AppLayoutPaddings.vertical + AppLayoutPaddings.top,
          paddingBottom: insets.bottom + AppLayoutPaddings.vertical,
          paddingLeft: insets.left + AppLayoutPaddings.horizontal,
          paddingRight: insets.right + AppLayoutPaddings.horizontal
        }
      ]}
      className={className}
    >
      {children}
    </ScrollView>
  );
};

export const NoScrollViewContainer: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  className,
  style
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom
        },
        style
      ]}
      className={className}
    >
      {children}
    </View>
  );
};
