import React from 'react';
import { View } from 'react-native';
import type { Control } from 'react-hook-form';
import type { AuthDto } from '@/types/auth.i';
import { EmailRegex } from '@/screens/auth/components/email.regex';
import { FormInput } from '@/components/ui/FormInput';

interface AuthFieldsProps {
  control: Control<AuthDto>;
}

export const AuthFields: React.FC<AuthFieldsProps> = ({ control }) => {
  return (
    <View className="flex flex-col gap-y-2">
      <FormInput<AuthDto>
        placeholder="Enter email"
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
        placeholder="Enter password"
        control={control}
        name="password"
        rules={{
          required: 'Password required',
          minLength: {
            value: 5,
            message: 'Password should be minimum 5 characters'
          }
        }}
        keyboardType="email-address"
      />
    </View>
  );
};
