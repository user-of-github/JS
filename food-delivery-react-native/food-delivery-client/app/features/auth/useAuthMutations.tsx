import type { UseFormReset } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import { useAuth } from '@/features/auth/AuthProvider';
import type { AuthDto, AuthResponse, RegisterDto } from '@/types/auth.i';

export type AuthFormType = AuthDto | RegisterDto;

export const useAuthMutations = (resetForm?: UseFormReset<AuthFormType>) => {
  const { user, setUser } = useAuth();

  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: AuthDto) => authService.login(data),
    onSuccess: (data: AuthResponse) => {
      resetForm?.();
      console.log(data.user)
      setUser(data.user);
      return data;
    }
  });

  const { mutate: register, isPending: isRegisterLoading } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterDto) => authService.register(data),
    onSuccess: (data: AuthResponse) => {
      resetForm?.();
      setUser(data.user);
    }
  });

  const logout = async () => {
    setUser(null);
    await authService.logout();
  }

  return {
    login,
    register,
    isLoading: isRegisterLoading || isRegisterLoading,
    logout
  };
};
