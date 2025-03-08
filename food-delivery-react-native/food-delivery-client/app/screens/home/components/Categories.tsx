import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useGetAllCategories } from '@/features/categories/useGetAllCategories';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Heading } from '@/components/ui/Heading';


export const Categories: React.FC = () => {
  const { navigate } = useAppNavigation();
  const { isLoading, categories} = useGetAllCategories();


  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <View className="flex flex-col mt-12 mb-4">
      <Heading>Categories</Heading>

      <View className="flex flex-row justify-center mt-5">
        {
          categories?.map(category => (
            <TouchableOpacity activeOpacity={0.75} onPress={() => {}}>

            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}