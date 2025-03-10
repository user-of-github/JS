import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';

export const useProducts = (limit?: number) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['getProducts', limit],
    queryFn: () => productService.getAll({ limit })
  });

  return { products, isLoading };
};
