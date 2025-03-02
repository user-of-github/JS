import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { FormModeToggler } from '@/screens/auth/components/FormModeToggler';
import { LoginForm } from '@/screens/auth/components/LoginForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');

  const toggleFormMode = () => {
    setFormMode((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };

  return (
    <View className="w-full h-full flex flex-col justify-center">
      <Text className="text-center text-secondary text-5xl font-bold mb-8">
        {formMode === 'login' ? 'Authorization' : 'Registration'}
      </Text>

      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <View>
          {formMode === 'login' && <LoginForm toggleLoading={setIsLoading} onSubmit={() => {}} />}

          <FormModeToggler mode={formMode} onToggle={toggleFormMode} className="mt-4" />
        </View>
      )}
    </View>
  );
};
