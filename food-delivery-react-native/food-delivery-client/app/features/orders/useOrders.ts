import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';

export const useGetAllOrders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['getOrders'],
    queryFn: () => orderService.getAll()
  });

  return { orders, isLoading };
};