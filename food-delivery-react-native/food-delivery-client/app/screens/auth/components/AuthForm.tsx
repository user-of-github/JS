import React, { useRef, useState } from 'react';
import { Animated, Pressable, Text, Vibration, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthDto } from '@/types/auth.i';
import { AuthFields } from '@/screens/auth/components/AuthFields';
import { FormModeToggler } from '@/screens/auth/components/FormModeToggler';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const AuthForm: React.FC = () => {
  const shakeAnimation = useRef(new Animated.Value(0));

  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, reset, control } = useForm<AuthDto>({
    mode: 'onSubmit'
  });

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation.current, { toValue: 10, duration: 75, useNativeDriver: true }),
      Animated.timing(shakeAnimation.current, { toValue: -10, duration: 75, useNativeDriver: true }),
      Animated.timing(shakeAnimation.current, { toValue: 10, duration: 75, useNativeDriver: true }),
      Animated.timing(shakeAnimation.current, { toValue: 0, duration: 75, useNativeDriver: true })
    ]).start();
  };

  const onSubmit: SubmitHandler<AuthDto> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  const onError = () => {
    Vibration.vibrate([50, 25, 50, 25]);
    shake();
  };

  const toggleFormMode = () => {
    setFormMode((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };

  return (
    <View className="w-full">
      <Text className="text-center text-secondary text-5xl font-bold mb-8">
        {formMode === 'login' ? 'Authorization' : 'Registration'}
      </Text>

      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <View>
          <AuthFields control={control} />
          <Animated.View style={{ transform: [{ translateX: shakeAnimation.current }] }}>
            <Button onPress={handleSubmit(onSubmit, onError)} className="mt-10">
              {formMode === 'login' ? 'Sign in' : 'Sign up'}
            </Button>
          </Animated.View>
          <FormModeToggler mode={formMode} onToggle={toggleFormMode} className="mt-4" />
        </View>
      )}
    </View>
  );
};
