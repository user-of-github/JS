import { useAppRoute } from '@/navigation/useAppRoute';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';


export const useProduct = () => {
  const { params } = useAppRoute<'Product'>();
  const { isLoading, data: product } = useQuery({
    queryKey: ['getProductBySlug', params?.slug],
    queryFn: () => productService.getBySlug(params?.slug || '')
  });

  return { isLoading, route: params?.slug, product };
};