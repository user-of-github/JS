import { useForm } from 'react-hook-form';
import { useDebounce } from '@/components/hooks/useDebounce';

export interface SearchFormData {
  searchTerm: string;
}

export const useSearchForm = () => {
  const { control, watch } = useForm<SearchFormData>({
    mode: 'onChange'
  });

  const searchTerm = watch('searchTerm');
  const debouncedSearch = useDebounce(searchTerm, 500);

  return {
    debouncedSearch,
    searchTerm,
    control
  };
};
