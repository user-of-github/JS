import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { AuthDto } from '@/types/auth.i';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { FormModeToggler } from '@/screens/auth/components/FormModeToggler';

export const AuthForm: React.FC = () => {
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, reset, control } = useForm<AuthDto>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<AuthDto> = data => {
    console.log(data)
  };

  const toggleFormMode = () => {
    setFormMode(prevState => prevState === 'login' ? 'register' : 'login');
  };


  return (
    <View className="w-9/12">
      <Text className="text-center text-secondary text-5xl font-bold mb-8">
        {formMode === 'login' ? 'Authorization' : 'Registration'}
      </Text>

      { isLoading && <LoadingSpinner/>}

      { !isLoading && (
        <View>
          <Button>{ formMode === 'login' ? 'Sign in' : 'Sign up'}</Button>
          <FormModeToggler mode={formMode} onToggle={toggleFormMode} className="mt-4"/>
        </View>
      )}
    </View>
  );
};