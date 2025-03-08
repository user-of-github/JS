import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';

export const useProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['getProducts'],
    queryFn: () => productService.getAll(),
    select: data => data.slice(0, 4)
  });

  return { products, isLoading }
};