import { useEffect } from 'react';
import { getNewTokens } from '@/services/api/helper';
import { authDataStorageService } from '@/services/auth/auth-data-storage.service';
import { authService } from '@/services/auth/auth.service';
import { useAuth } from './AuthProvider';

export const useCheckAuth = (routeName?: string | null) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = await authDataStorageService.getAccessToken();

      if (accessToken) {
        try {
          await getNewTokens();
        } catch (error) {
          await authService.logout();
          setUser(null);
        }
      }
    };

    checkAccessToken();
  }, []);

  useEffect(() => {
    const checkRefreshToken = async () => {
      const refreshToken = await authDataStorageService.getRefreshToken();

      if (!refreshToken) {
        await authService.logout();
        setUser(null);
      }
    };

    checkRefreshToken();
  }, [routeName]);
};
