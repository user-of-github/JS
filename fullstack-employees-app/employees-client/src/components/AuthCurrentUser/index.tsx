import React from 'react';
import { useCurrentUserQuery } from '../../app/api/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const AuthCurrentUser: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return (
      <main
        style={{
        width: '100%',
        margin: 'auto',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </main>
    );
  }

  return children;
};