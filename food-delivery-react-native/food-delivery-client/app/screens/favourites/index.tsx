import React from 'react';
import { useProfile } from '@/features/auth/useProfile';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Catalog } from '@/components/ui/catalog/Catalog';

export const FavouritesScreen: React.FC = () => {
  const { profile } = useProfile();

  return (
    <Container>
      <Heading>Favourites</Heading>
      <Catalog products={profile?.favourites || []} />
    </Container>
  );
};
