import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { AuthDto, RegisterDto } from '@/types/auth.i';
import { Vibration, View,  Animated as AnimatedNative } from 'react-native';
import { FormInput } from '@/components/ui/FormInput';
import { EmailRegex } from '@/screens/auth/components/email.regex';
import { Button } from '@/components/ui/Button';
import { useShakeAnimation } from '@/hooks/useShakeAnimation';


interface RegisterFormProps {
  onSubmit: (data: RegisterDto) => void;
  toggleLoading: (loading: boolean) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, toggleLoading }) => {
  const { handleSubmit, reset, control, clearErrors } = useForm<RegisterDto>({ mode: 'onSubmit' });

  const { shake, shakingStyle } = useShakeAnimation();

  const submit: SubmitHandler<RegisterDto> = (data) => {
    toggleLoading(true);
    console.log(data);
    onSubmit(data);
  };

  const onError = () => {
    Vibration.vibrate([50, 25, 50, 25]);
    shake();
  };

  return (
    <View>
      <View className="flex flex-col gap-y-2">
        <FormInput<RegisterDto>
          placeholder="Tony Stark"
          label="What is your name ?"
          control={control}
          name="name"
          rules={{
            required: 'Email required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long'
            }
          }}
        />

        <FormInput<RegisterDto>
          placeholder="+1234567890"
          label="Phone number"
          control={control}
          name="phone"
          rules={{
            required: 'Phone number required'
          }}
          keyboardType="phone-pad"
        />

        <FormInput<RegisterDto>
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

        <FormInput<RegisterDto>
          label="Come up with a password"
          control={control}
          name="password"
          rules={{
            required: 'Password required',
            minLength: {
              value: 5,
              message: 'Password should be minimum 5 characters'
            }
          }}
          secureTextEntry
          placeholder="••••••••"
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