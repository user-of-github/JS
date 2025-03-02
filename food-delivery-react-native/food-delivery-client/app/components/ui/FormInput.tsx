import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';
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
  label?: string;
}

export const FormInput = <ValueType extends Record<string, any>>({
  control,
  name,
  rules,
  className,
  label,
  ...props
}: FormField<ValueType>): React.ReactElement => {
  return (
    <Controller
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View className={className}>
          {label && <Text className="text-2xl">{label}</Text>}
          <TextInput
            autoCapitalize="none"
            onChangeText={onChange}
            onBlur={onBlur}
            value={(value || '').toString()}
            className={cn(
              'text-text-secondary text-lg bg-white w-full rounded-lg py-3 px-4',
              error ? 'outline outline-1 outline-error' : 'border-none'
            )}
            {...props}
          />
          <Text className="text-error text-md">{error ? error.message : ''}</Text>
        </View>
      )}
      control={control}
      rules={rules}
      name={name}
    />
  );
};
