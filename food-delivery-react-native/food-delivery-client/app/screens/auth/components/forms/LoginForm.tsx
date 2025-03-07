import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Animated as AnimatedNative, Vibration, View } from 'react-native';
import type { AuthDto } from '@/types/auth.i';
import { EmailRegex } from '@/screens/auth/components/email.regex';
import { useShakeAnimation } from '@/hooks/useShakeAnimation';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { useAuthMutations } from '@/features/auth/useAuthMutations';
import { FormModeToggler } from '@/screens/auth/components/FormModeToggler';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import axios from 'axios';
import { ApiUrls } from '@/config/api';

interface LoginFormProps {
  toggleFormMode: VoidFunction;
}



export const LoginForm: React.FC<LoginFormProps> = ({ toggleFormMode }) => {
  const { handleSubmit, reset, control, clearErrors } = useForm<AuthDto>({ mode: 'onSubmit' });
  const { shake: shakeButton, shakingStyle } = useShakeAnimation();
  const {isLoading, login } = useAuthMutations();

  const onSubmit: SubmitHandler<AuthDto> = async (data) => {
    console.log(data)
    const res = await fetch(ApiUrls.auth.login, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch(e => console.log(e))

    console.log(await res.json());

    //login(data);
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

      <FormModeToggler mode="login" onToggle={toggleFormMode} className="mt-4" />
    </View>
  );
};
