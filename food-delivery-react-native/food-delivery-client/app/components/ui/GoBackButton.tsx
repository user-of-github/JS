import React from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { IconButton, type IconButtonSize } from '@/components/ui/IconButton';


interface GoBackButtonProps {
  size: IconButtonSize;
}

export const GoBackButton: React.FC<GoBackButtonProps> = ({ size = 'default'}) => {
  const { goBack } = useAppNavigation();

  return (
    <IconButton
      onPress={goBack}
      size={size}
      icon={{name: 'chevron-left', color: '#000'}}
    />
  );
};