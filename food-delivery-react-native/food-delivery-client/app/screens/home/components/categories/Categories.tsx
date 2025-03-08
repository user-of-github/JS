import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { getMediaSource } from '@/services/utils';
import { useGetAllCategories } from '@/features/categories/useGetAllCategories';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CategoryItem } from '@/screens/home/components/categories/CategoryItem';
import { Link } from '@react-navigation/native';

export const Categories: React.FC = () => {
  const { isLoading, categories } = useGetAllCategories();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(categories && getMediaSource( categories[0]?.image))

  return (
    <View className="flex flex-col">
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
