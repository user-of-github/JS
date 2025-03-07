import type { UseFormReset } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import { useAuth } from '@/features/auth/AuthProvider';
import type { AuthDto, AuthResponse, RegisterDto } from '@/types/auth.i';

type AuthFormType = AuthDto | RegisterDto;

export const useAuthMutations = (resetForm?: UseFormReset<AuthFormType>) => {
  const { user, setUser } = useAuth();

  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: AuthDto) => await authService.login(data),
    onSuccess: (data: AuthResponse) => {
      resetForm?.();
      setUser(data.user);
    }
  });

  const { mutate: register, isPending: isRegisterLoading } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterDto) => {
      debugger;
      console.log('MUTATION FN: DATA: ', data)
      return await authService.register(data);
    },
    onSuccess: (data: AuthResponse) => {
      resetForm?.();
      setUser(data.user);
    }
  });

  return {
    login,
    register,
    isLoading: isRegisterLoading || isRegisterLoading
  };
};
