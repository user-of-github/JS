import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';

export const useProductsByCategories = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['getProductsByCategories'],
    queryFn: () => productService.getAllByCategories()
  });

  return { products, isLoading };
};