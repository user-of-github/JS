import React from 'react';
import { Image, Text, View } from 'react-native';
import { useAuthMutations } from '@/features/auth/useAuthMutations';
import { useProfile } from '@/features/auth/useProfile';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const ProfileScreen: React.FC = () => {
  const { logout } = useAuthMutations();
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <Container className="min-h-screen-safe">
        <Heading center>Profile</Heading>
        <View className="my-6 flex items-center justify-center h-full">
          <LoadingSpinner />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Heading center>Profile</Heading>
      <View className="my-6 flex items-center justify-center">
        <Image source={{ uri: profile?.avatarPath }} className="w-40 h-40 rounded-full" alt="Avatar" />
        <View className="flex flex-col w-full mt-2.5 px-5 gap-y-2">
          <View className="flex flex-row justify-center items-center">
            <Text className="text-4xl font-bold">{profile?.name}</Text>
          </View>

          <View className="flex flex-row justify-center items-center">
            <Text className="text-2xl text-text-secondary">{profile?.email}</Text>
          </View>

          <View className="flex flex-row justify-center items-center">
            <Text className="text-2xl text-text-secondary">{profile?.phone}</Text>
          </View>

          <View className="flex flex-row justify-center items-center">
            <Text className="text-sm text-text-secondary">User ID: {profile?.id}</Text>
          </View>
        </View>
        <Button onPress={logout} className="mt-10" textClassName="text-lg">
          Log out
        </Button>
      </View>
    </Container>
  );
};
