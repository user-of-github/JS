import React from 'react';
import { SubmitHandler, type UseFormReset, useForm } from 'react-hook-form';
import { Animated as AnimatedNative, Vibration, View } from 'react-native';
import type { RegisterDto } from '@/types/auth.i';
import { type AuthFormType, useAuthMutations } from '@/features/auth/useAuthMutations';
import { FormModeToggler } from '@/screens/auth/components/FormModeToggler';
import { EmailRegex } from '@/screens/auth/components/email.regex';
import { useShakeAnimation } from '@/components/hooks/useShakeAnimation';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';

interface RegisterFormProps {
  toggleFormMode: VoidFunction;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleFormMode }) => {
  const { handleSubmit, reset, control } = useForm<RegisterDto>({ mode: 'onSubmit' });
  const { register } = useAuthMutations(reset as UseFormReset<AuthFormType>);
  const { shake, shakingStyle } = useShakeAnimation();

  const onSubmit: SubmitHandler<RegisterDto> = (data) => {
    register(data);
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

      <FormModeToggler mode="register" onToggle={toggleFormMode} className="mt-4" />
    </View>
  );
};
