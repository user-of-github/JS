import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { cn } from '@/components/utils';

export const Banner: React.FC<{ className?: string }> = ({ className }) => {
  const { navigate } = useAppNavigation();

  return (
    <View className={cn('relative w-full bg-primary px-5 py-5 rounded-xl justify-between flex-row flex', className)}>
      <View>
        <Text className="font-light w-56 text-white text-xl">Fast delivery - delicious choice every time !</Text>

        <TouchableOpacity
          onPress={() => navigate(AppRoutes.Explorer.name)}
          className="bg-white py-2 rounded-full w-28 mt-6"
          activeOpacity={0.75}
        >
          <Text className="text-black text-center text-lg">Order now</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 right-4 w-28 h-28">
        <Image source={require('@assets/images/delivery-man.png')} className="w-full h-full" />
      </View>
    </View>
  );
};
