import React from 'react';
import { Text, View } from 'react-native';
import type { SearchFormData } from '@/screens/search/components/useSearchForm';
import { useSearchProducts } from '@/screens/search/components/useSearchProducts';
import { Container } from '@/components/layout/Container';
import { FormInput } from '@/components/ui/FormInput';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Catalog } from '@/components/ui/catalog/Catalog';

export const SearchScreen: React.FC = () => {
  const { control, searchTerm, products, isLoading, debouncedSearch } = useSearchProducts();

  return (
    <Container>
      <Heading>Search</Heading>

      <View className="mt-4">
        <FormInput<SearchFormData>
          placeholder="Cheeseburger"
          control={control}
          name="searchTerm"
          keyboardType="web-search"
        />
      </View>

      <View>
        {(isLoading || debouncedSearch !== searchTerm) && <LoadingSpinner />}
        {!!searchTerm && !(isLoading || debouncedSearch !== searchTerm) && (
          <Catalog products={products || []} title="Results" />
        )}
      </View>
    </Container>
  );
};
