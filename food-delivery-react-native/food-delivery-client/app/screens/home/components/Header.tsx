import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '@/features/auth/useProfile';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Header: React.FC = () => {
  const { profile, isLoading } = useProfile();
  const { navigate } = useAppNavigation();

  return (
    <View className="flex flex-row justify-between items-center py-3">
      <Text className="font-light text-4xl text-secondary">
        Hello, {isLoading ? <LoadingSpinner /> : profile?.name}
      </Text>

      <TouchableOpacity onPress={() => navigate(AppRoutes.Cart.name)}>
        <Ionicons name="cart" size={33} color="gray" />
      </TouchableOpacity>
    </View>
  );
};
