import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useGetAllCategories } from '@/features/categories/useGetAllCategories';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ApiUrls } from '@/config/api';

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
            onPress={() => navigate(ApiUrls)}
            key={category.id}
          >

          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
