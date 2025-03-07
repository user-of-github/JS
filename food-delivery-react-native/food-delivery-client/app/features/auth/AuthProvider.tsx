import React, { useContext, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import type { AuthContextType, UserState } from '@/features/auth/auth-provider.i';
import { AuthDataStorageService } from '@/services/auth/auth-data-storage.service';

SplashScreen.preventAutoHideAsync();

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState>({} as UserState);

  useEffect(() => {
    let isMounted = true;

    const checkAccessToken = async () => {
      try {
        const accessToken = await AuthDataStorageService.getAccessToken();

        if (accessToken) {
          const usr = await AuthDataStorageService.getUser();
          if (isMounted && usr) {
            setUser(usr);
          }
        }
      } catch {
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    checkAccessToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
