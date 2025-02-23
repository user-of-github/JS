import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import styles from './index.module.css';
import { AppRoutes } from '../../routes';

export const Logotype: React.FC = () => (
  <Flex justify="center" align="center" className={styles.iconContainer}>
    <TeamOutlined className={styles.icon} />
  </Flex>
);

export const AppHeader: React.FC = ()=> {
  return (
    <header className={styles.header}>
      <Flex justify="space-between">
        <Flex align="center" gap={10} justify="center">
          <Logotype/>
          <Typography.Title level={2}>Employees</Typography.Title>
        </Flex>

        <Flex align="center" gap={10}>
          <Link to={{ pathname: `/${AppRoutes.register.path}` }}>
            <Button type="link" icon={<UserOutlined/>}>Register</Button>
          </Link>

          <Link to={{ pathname: `/${AppRoutes.login.path}` }}>
            <Button type="link" icon={<LoginOutlined/>}>Sign in</Button>
          </Link>
        </Flex>
      </Flex>
    </header>
  );
};