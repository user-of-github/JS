import React from 'react';
import { ActivityIndicator } from 'react-native';

export const LoadingSpinner: React.FC = () => {
  return (
    <ActivityIndicator size="large" className="color-primary "/>
  )
};