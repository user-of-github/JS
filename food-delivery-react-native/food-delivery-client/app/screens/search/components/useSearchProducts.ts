import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { useSearchForm } from '@/screens/search/components/useSearchForm';

export const useSearchProducts = () => {
  const { searchTerm, debouncedSearch, control } = useSearchForm();

  const { data: products, isLoading } = useQuery({
    queryKey: ['searchProducts', debouncedSearch],
    queryFn: () => productService.getAll({ searchTerm: debouncedSearch }),
    enabled: !!searchTerm
  });

  return { products, isLoading, control, searchTerm, debouncedSearch };
};
