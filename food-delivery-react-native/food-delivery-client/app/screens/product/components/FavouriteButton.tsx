import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { GET_PROFILE_KEY, useProfile } from '@/features/auth/useProfile';
import { IconButton } from '@/components/ui/IconButton';

export const FavouriteButton: React.FC<{ productId: string }> = ({ productId }) => {
  const { profile } = useProfile();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['toggleFavourite'],
    mutationFn: () => userService.toggleFavourite(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [GET_PROFILE_KEY] })
  });

  if (!profile) {
    return <></>;
  }

  const doesExist = profile.favourites.some((fav) => fav.id === productId);

  return (
    <IconButton
      icon={{
        component: doesExist ? (
          <MaterialCommunityIcons name="heart" size={22} color="#DC3F41" />
        ) : (
          <MaterialCommunityIcons name="heart" size={22} color="#555" />
        )
      }}
      size="small"
      onPress={mutate}
    />
  );
};
