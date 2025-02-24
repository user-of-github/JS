import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { selectUser } from '../../app/store/slices/auth';
import { AppRoutes } from '../../routes';

export const UnprotectedOnlyRoute: React.FC<{ page: React.ReactElement }> = ({ page }) => {
  const user = useSelector(selectUser);

  if (user) {
    return <Navigate to={`/${AppRoutes.home.path}`}/>;
  }

  return page;
};