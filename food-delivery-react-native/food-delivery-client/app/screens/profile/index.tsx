import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuthMutations } from '@/features/auth/useAuthMutations';
import { useProfile } from '@/features/auth/useProfile';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Feather } from '@expo/vector-icons';
import { cn } from '@/components/utils';
import { AppRoutes } from '@/navigation/routes';

export const ProfileScreen: React.FC = () => {
  const { logout } = useAuthMutations();
  const { profile, isLoading } = useProfile();
  const { navigate } = useAppNavigation();


  if (isLoading) {
    return (
      <Container className="min-h-screen-safe">
        <Heading center>Profile</Heading>
        <View className="my-6 flex items-center justify-center">
          <LoadingSpinner />
          <Button onPress={logout} className="mt-10" textClassName="text-lg">
            Log out
          </Button>
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
      </View>
      <View className="w-full flex-row gap-x-3 items-center mt-10">
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigate(AppRoutes.Cart.name)}
          className="rounded-lg bg-secondary py-3 px-1 flex items-center justify-center w-[22%]"
        >
          <View className="flex flex-col items-center justify-center gap-x-3">
            <Feather name="shopping-bag" size={22} color="#FFF" />
            <Text className="text-white text-center text-lg">Cart</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          className="rounded-lg bg-secondary py-3 px-1 flex items-center justify-center w-[22%]"
          onPress={() => navigate(AppRoutes.Orders.name)}
        >
          <View className="flex flex-col items-center justify-center gap-x-3">
            <Feather name="coffee" size={22} color="#FFF" />
            <Text className="text-white text-center text-lg">Orders</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          className="rounded-lg bg-secondary py-3 px-1 flex items-center justify-center w-[22%]"
          onPress={() => navigate(AppRoutes.Favourites.name)}
        >
          <View className="flex flex-col items-center justify-center gap-x-3">
            <Feather name="heart" size={22} color="#FFF" />
            <Text className="text-white text-center text-lg">Favorites</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logout}
          activeOpacity={0.75}
          className="rounded-lg bg-text-secondary py-3 px-1 flex items-center justify-center w-[22%]"
        >
          <View className="flex flex-col items-center justify-center gap-x-3">
            <Feather name="log-out" size={22} color="#FFF" />
            <Text className="text-white text-center text-lg">Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
