import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { LoginForm } from './forms/LoginForm';
import { RegisterForm } from './forms/RegisterForm';

export const Form: React.FC = () => {
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');

  const toggleFormMode = () => {
    setFormMode((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };

  return (
    <View className="w-full h-full flex flex-col justify-center relative">
      <Text className="text-center text-secondary text-5xl font-bold mb-8">
        {formMode === 'login' ? 'Authorization' : 'Registration'}
      </Text>

      <View>
        {formMode === 'login' ? (
          <LoginForm toggleFormMode={toggleFormMode} />
        ) : (
          <RegisterForm toggleFormMode={toggleFormMode} />
        )}
      </View>
    </View>
  );
};
