import { useRef } from 'react';
import { Animated as AnimatedNative, type StyleProp } from 'react-native';

interface UseShakeAnimationReturnValue {
  shake: VoidFunction;
  shakingStyle: Readonly<StyleProp<any>>;
}

export const useShakeAnimation = (duration = 75): UseShakeAnimationReturnValue => {
  const shakeAnimation = useRef(new AnimatedNative.Value(0));

  const shake = () => {
    AnimatedNative.sequence([
      AnimatedNative.timing(shakeAnimation.current, { toValue: 10, duration, useNativeDriver: true }),
      AnimatedNative.timing(shakeAnimation.current, { toValue: -10, duration, useNativeDriver: true }),
      AnimatedNative.timing(shakeAnimation.current, { toValue: 10, duration, useNativeDriver: true }),
      AnimatedNative.timing(shakeAnimation.current, { toValue: 0, duration, useNativeDriver: true })
    ]).start();
  };

  const shakingStyle: StyleProp<any> = { transform: [{ translateX: shakeAnimation.current }] };

  return { shake, shakingStyle };
};
