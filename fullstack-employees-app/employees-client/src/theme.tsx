import { ConfigProvider } from 'antd';
import React from 'react';

export const AppThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3c40c6',
          borderRadius: 2,
          colorText: '#fff',
          colorBgContainer: 'transparent',
        },
      }}
    >
      { children }
    </ConfigProvider>
  )
};