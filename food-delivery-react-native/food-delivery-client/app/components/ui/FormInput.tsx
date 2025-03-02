import React from 'react';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { cn } from '@/components/utils';

type RulesType<ValueType extends FieldValues> = Omit<
  RegisterOptions<ValueType, FieldPath<ValueType>>,
  'valueAsDate' | 'setValueAs' | 'disabled' | 'valueAsNumber'
>;

export interface FormField<ValueType extends FieldValues>
  extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value'> {
  control: Control<ValueType>;
  name: FieldPath<ValueType>;
  rules?: RulesType<ValueType>;
}

export const FormInput = <ValueType extends Record<string, any>>({
  control,
  name,
  rules,
  className,
  ...props
}: FormField<ValueType>): React.ReactElement => {
  return (
    <Controller
      render={({ field: { value, onChange, onBlur}, fieldState: { error } }) => (
        <View className={cn('bg-white w-full rounded-lg pb-4 pt-2.5 px-4 my-1', error ? 'border-red-500' : 'border-gray-400' )}>
          <TextInput
            autoCapitalize="none"
            onChangeText={onChange}
            onBlur={onBlur}
            value={(value || '').toString()}
            className="text-text-secondary"
            placeholderTextColor="#6A6A6A"
            {...props}
          />
          {error && <Text className="text-red-500">{error.message}</Text>}
        </View>
      )}
      control={control}
      rules={rules}
      name={name}
    />
  )
};
