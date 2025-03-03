import React, { useContext, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import type { AuthContextType, UserState } from '@/features/auth/auth-provider.i';

SplashScreen.preventAutoHideAsync();

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState>({} as UserState);

  useEffect(() => {
    let mounted = true;

    const checkAccessToken = async () => {
      try {
      } catch {
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    checkAccessToken();

    return () => {
      mounted = false;
    };
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
