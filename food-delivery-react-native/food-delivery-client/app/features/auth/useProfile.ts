import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user/user.service';

export const useProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryFn: () => userService.getProfile(),
    queryKey: ['getProfile']
  });

  return { profile, isLoading };
};