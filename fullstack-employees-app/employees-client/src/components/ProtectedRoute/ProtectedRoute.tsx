import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/store/slices/auth';
import { Navigate } from 'react-router';
import { AppRoutes } from '../../routes';

export const ProtectedRoute: React.FC<{ page: React.ReactElement }> = ({ page }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={`/${AppRoutes.login.path}`}/>;
  }

  return page;
};