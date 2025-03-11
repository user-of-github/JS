import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export const RootLayout: React.FC = () => (
  <div className="max-h-dvh h-dvh flex flex-col overflow-y-hidden">
    <Header />
    <Outlet />
  </div>
);
