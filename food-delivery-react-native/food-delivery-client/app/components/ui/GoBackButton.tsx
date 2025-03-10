import React from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { TouchableNativeFeedback, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type GoBackButtonSize = 'default' | 'small';

interface GoBackButtonProps {
  size?: GoBackButtonSize;
}

const sizes: Record<GoBackButtonSize, { container: number, icon: number}> = {
  default: {
    container: 55,
    icon: 32
  } as const,

  small: {
    container: 40,
    icon: 25
  } as const
} as const;

export const GoBackButton: React.FC<GoBackButtonProps> = ({ size = 'default '}) => {
  const { goBack } = useAppNavigation();

  const { container, icon } = sizes[(size || 'default') as GoBackButtonSize];

  return (
    <View className="rounded-full flex overflow-hidden" style={{ width: container }}>
      <TouchableNativeFeedback
        className="rounded-full overflow-hidden justify-center items-center"
        background={TouchableNativeFeedback.Ripple('#ccc', false)}
        onPress={goBack}
      >
        <View className="bg-[#FFF] rounded-full overflow-hidden justify-center items-center" style={{ width: container, height: container }}>
          <Feather name="chevron-left" size={icon} color="#000"/>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}