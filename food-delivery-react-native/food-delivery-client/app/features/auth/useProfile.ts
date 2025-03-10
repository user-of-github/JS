import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';



export const useProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryFn: () => userService.getProfile(),
    queryKey: [GET_PROFILE_KEY]
  });

  return { profile, isLoading };
};

export const GET_PROFILE_KEY = 'getProfile';
