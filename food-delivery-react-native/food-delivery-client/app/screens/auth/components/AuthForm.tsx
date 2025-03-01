import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text, View } from 'react-native';
import { AuthDto } from '@/types/auth.i';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const AuthForm: React.FC = () => {
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { handleSubmit, reset, control } = useForm<AuthDto>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<AuthDto> = data => {
    console.log(data)
  };


  return (
    <View className="w-9/12">
      <Text className="text-center text-primary text-6xl font-bold mb-8">
        {formMode === 'login' ? 'Sign in' : 'Sign up'}

        { isLoading && <LoadingSpinner/>}
      </Text>
    </View>
  );
};