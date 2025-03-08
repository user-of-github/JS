import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/categories/category.service';

export const useGetAllCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['getCategories'],
    queryFn: () => categoryService.getAll(),
    select: data => data
  });

  return { categories, isLoading };
};