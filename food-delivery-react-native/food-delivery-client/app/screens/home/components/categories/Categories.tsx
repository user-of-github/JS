import React from 'react';
import { ScrollView, View } from 'react-native';
import { getMediaSource } from '@/services/utils';
import { useGetAllCategories } from '@/features/categories/useGetAllCategories';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CategoryItem } from '@/screens/home/components/categories/CategoryItem';

export const Categories: React.FC = () => {
  const { isLoading, categories } = useGetAllCategories();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex flex-col mt-7">
      <Heading>Categories</Heading>

      <ScrollView horizontal className="max-w-full w-full flex flex-row mt-5 gap-x-5" showsHorizontalScrollIndicator={false}>
        {
          categories?.map(item => (
            <CategoryItem item={item} key={item.id} />
          ))
        }
      </ScrollView>
    </View>
  );
};
