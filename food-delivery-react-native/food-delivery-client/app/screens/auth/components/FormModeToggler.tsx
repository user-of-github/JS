import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '@/components/utils';

interface FormModeTogglerProps {
  onToggle: VoidFunction;
  mode: 'login' | 'register';
  className?: string;
}

export const FormModeToggler: React.FC<FormModeTogglerProps> = ({ mode, onToggle, className }) => {
  return (
    <View className={cn('flex flex-row items-center m-auto', className)}>
      <Text className="text-text-secondary text-lg text-center">
        {mode === 'register' ? 'Already have an account ?' : "Don't have an account ?"}
      </Text>
      <TouchableOpacity onPress={onToggle}>
        <Text className="text-secondary font-bold text-lg">{mode === 'login' ? ' Sign up' : ' Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};
