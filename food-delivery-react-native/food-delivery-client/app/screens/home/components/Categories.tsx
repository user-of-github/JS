import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { ApiUrls } from '@/config/api';
import { getMediaSource } from '@/services/utils';
import { useGetAllCategories } from '@/features/categories/useGetAllCategories';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Categories: React.FC = () => {
  const { navigate } = useAppNavigation();
  const { isLoading, categories } = useGetAllCategories();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex flex-col mt-12 mb-4">
      <Heading>Categories</Heading>

      <View className="flex flex-row justify-center mt-5">
        {categories?.map((category) => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigate(AppRoutes.Category.name, { slug: category.slug })}
            key={category.id}
            className="rounded-xl bg-[#FFF] p-5 mx-2"
          >
            <Image
              source={{ uri: getMediaSource(category.image) }}
              className="w-10 h-8 mb-2 p-3 object-cover"
              resizeMode="cover"
            />
            <Text className="text-md text-center">{ category.name }</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
