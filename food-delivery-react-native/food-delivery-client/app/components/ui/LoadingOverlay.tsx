import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const LoadingOverlay: React.FC = () => (
  <View style={styles.container}>
  <BlurView style={styles.overlay}
            blurType="light"
            blurAmount={10}>
    <LoadingSpinner />
  </BlurView>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
