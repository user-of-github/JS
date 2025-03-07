import { useAuth } from './AuthProvider';
import { useEffect } from 'react';
import { AuthDataStorageService } from '@/services/auth/auth-data-storage.service';
import { AuthService } from '@/services/auth/auth.service';
import { getNewTokens } from '@/services/api/helper';

export const useCheckAuth = (routeName?: string | null) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = await AuthDataStorageService.getAccessToken();

      if (accessToken) {
        try {
          await getNewTokens();
        } catch (error) {
          await AuthService.logout();
          setUser(null);
        }
      }
    };

    checkAccessToken();
  }, []);

  useEffect(() => {
    const checkRefreshToken = async () => {
      const refreshToken = await AuthDataStorageService.getRefreshToken();

      if (!refreshToken) {
        await AuthService.logout();
        setUser(null);
      }
    };

    checkRefreshToken();
  }, [routeName]);
};
