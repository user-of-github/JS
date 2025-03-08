import React from 'react';
import { Button, Text } from 'react-native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Header } from '@/screens/home/components/Header';
import { Container } from '@/components/layout/Container';
import { Banner } from '@/screens/home/components/Banner';
import { Categories } from '@/screens/home/components/Categories';

export const HomeScreen: React.FC = () => {
  const { navigate } = useAppNavigation();

  return (
    <Container>
      <Header />

      <Banner className="mt-7"/>

      <Categories/>
    </Container>
  );
};
