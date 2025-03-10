import { useAppRoute } from '@/navigation/useAppRoute';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import { productService } from '@/services/product.service';

export const useCategory = () => {
  const { params } = useAppRoute<'Category'>();
  const { isLoading: isCategoryLoading, data: category } = useQuery({
    queryKey: ['getCategoryBySlug', params?.slug],
    queryFn: () => categoryService.getBySlug(params?.slug || '')
  });

  const categoryId = category?.id || '';

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['getProductByCategory', params?.slug],
    queryFn: () => productService.getByCategory(params?.slug || ''),
    enabled: !!categoryId
  });

  return { category, products, isLoading: isProductsLoading || isCategoryLoading, route: params?.slug };
};