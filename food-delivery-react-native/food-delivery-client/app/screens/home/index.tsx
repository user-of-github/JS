import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Banner } from '@/screens/home/components/Banner';
import { Header } from '@/screens/home/components/Header';
import { Products } from '@/screens/home/components/Products';
import { Categories } from '@/screens/home/components/categories/Categories';
import { Container } from '@/components/layout/Container';

export const HomeScreen: React.FC = () => (
    <Container>
      <Header />
      <Banner className="mt-7 mb-3" />
      <Categories />
      <Products />
    </Container>
);
