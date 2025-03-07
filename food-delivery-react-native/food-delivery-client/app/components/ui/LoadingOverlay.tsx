import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const LoadingOverlay: React.FC = () => (
  <View style={styles.overlay}>
    <LoadingSpinner />
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent effect
    justifyContent: 'center',
    alignItems: 'center'
  }
});
