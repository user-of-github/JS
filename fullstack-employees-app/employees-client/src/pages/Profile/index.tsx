import React from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Layout } from 'antd';
import { selectUser } from '../../app/store/slices/auth';
import { Navigate } from 'react-router';
import { AppRoutes } from '../../routes';

export const ProfilePage: React.FC = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={{pathname: AppRoutes.home.path}}/>;
  }

  return (
    <Layout>
      <Descriptions title="Profile" bordered>
        <Descriptions.Item label="Name" span={3}>
          {user.name}
        </Descriptions.Item>

        <Descriptions.Item label="Email" span={3}>
          {user.email}
        </Descriptions.Item>

        <Descriptions.Item label="Id" span={3}>
          {user.id}
        </Descriptions.Item>
      </Descriptions>
    </Layout>
  );
};