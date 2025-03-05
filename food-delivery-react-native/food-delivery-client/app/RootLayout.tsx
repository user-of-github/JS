import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import { useNavigationContainerRef } from '@react-navigation/native';
import { AppNavigation } from '@/navigation/Navigation';
import type { NavigationScreensListType } from '@/navigation/types';
import { NavigationBar } from '@/components/layout/navigationBar';
import { useCheckAuth } from '@/features/auth/useCheckAuth';

export const RootLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    setCurrentRoute(navigationRef.getCurrentRoute()?.name || null);

    const changeRouteListener = navigationRef.addListener('state', () => {
      setCurrentRoute(navigationRef.getCurrentRoute()?.name || null);
    });

    return () => {
      navigationRef.removeListener('state', changeRouteListener);
    };
  }, []);

  useCheckAuth(currentRoute);

  return (
    <>
      <AppNavigation navigationContainerRef={navigationRef as any} />

      <NavigationBar
        navigate={navigationRef.navigate}
        currentScreen={currentRoute as keyof NavigationScreensListType}
      />
    </>
  );
};
