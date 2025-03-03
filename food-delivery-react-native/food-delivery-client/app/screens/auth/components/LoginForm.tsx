import React, { useRef } from 'react';
import { Vibration, View } from 'react-native';
import { Animated as AnimatedNative } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { AuthDto } from '@/types/auth.i';
import { EmailRegex } from '@/screens/auth/components/email.regex';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { useShakeAnimation } from '@/hooks/useShakeAnimation';

interface LoginFormProps {
  onSubmit: (data: AuthDto) => void;
  toggleLoading: (loading: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, toggleLoading }) => {
  const { handleSubmit, reset, control, clearErrors } = useForm<AuthDto>({ mode: 'onSubmit' });

  const { shake: shakeButton, shakingStyle } = useShakeAnimation();

  const submit: SubmitHandler<AuthDto> = (data) => {
    toggleLoading(true);
    console.log(data);
    onSubmit(data);
  };

  const onError = () => {
    Vibration.vibrate([50, 25, 50, 25]);
    shakeButton();
  };

  return (
    <View>
      <View className="flex flex-col gap-y-2">
        <FormInput<AuthDto>
          placeholder="example@mail.com"
          label="Email"
          control={control}
          name="email"
          rules={{
            required: 'Email required',
            pattern: {
              value: EmailRegex,
              message: 'Email is invalid'
            }
          }}
          keyboardType="email-address"
        />

        <FormInput<AuthDto>
          label="Password"
          control={control}
          name="password"
          placeholder="••••••••"
          rules={{
            required: 'Password required',
            minLength: {
              value: 5,
              message: 'Password should be minimum 5 characters'
            }
          }}
          secureTextEntry
        />
      </View>

      <AnimatedNative.View style={shakingStyle}>
        <Button onPress={handleSubmit(onSubmit, onError)} className="mt-4">
          Sign in
        </Button>
      </AnimatedNative.View>
    </View>
  );
};
