import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface FormModeTogglerProps {
  onToggle: VoidFunction;
  mode: 'login' | 'register';
  className?: string;
}

export const FormModeToggler: React.FC<FormModeTogglerProps> = ({ mode, onToggle, className }) => {
  return (
    <TouchableOpacity onPress={onToggle} className={className}>
      <Text className="text-text-secondary text-lg text-center">
        {mode === 'register' ? 'Already have an account ?' : 'Don\'t have an account ?'}
        <Text className="text-secondary font-bold">
          { mode === 'login' ? ' Sign up' : ' Login'}
        </Text>
      </Text>
    </TouchableOpacity>
  )
};