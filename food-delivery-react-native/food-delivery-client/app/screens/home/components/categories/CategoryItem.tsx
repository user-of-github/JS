import React from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';
import type { Category } from '@/types/category.i';
import { getMediaSource } from '@/services/utils';
import { AppRoutes } from '@/navigation/routes';
import { useAppNavigation } from '@/navigation/useAppNavigation';

interface CategoryItemProps {
  item: Category;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  const { navigate } = useAppNavigation();

  return (
    <View className="rounded-xl overflow-hidden" style={{ marginRight: 5}}>
      <TouchableNativeFeedback
        onPress={() => {
          navigate(AppRoutes.Category.name, { slug: item.slug } as any);
        }}
        key={item.id}
        background={TouchableNativeFeedback.Ripple('#ccc', false)}
      >
        <View className="w-full py-5 px-5 rounded-xl bg-white flex items-center justify-center">
          <Image
            source={{ uri: getMediaSource(item.image) }}
            className="mb-5"
            width={60}
            height={60}
            resizeMode="contain"
          />
          <Text className="text-lg text-center">{item.name}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
