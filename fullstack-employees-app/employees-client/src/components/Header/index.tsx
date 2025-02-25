import React from 'react';
import { Button, Divider, Flex, Typography } from 'antd';
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { AppRoutes } from '../../routes';
import { selectUser } from '../../app/store/slices/auth';
import { logout } from '../../app/store/slices/auth';
import styles from './index.module.css';

export const Logotype: React.FC = () => (
  <Flex justify="center" align="center" className={styles.iconContainer}>
    <TeamOutlined className={styles.icon} />
  </Flex>
);

export const AppHeader: React.FC = ()=> {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutFromApp = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <Flex justify="space-between">
        <Link to={{pathname: `/${AppRoutes.home.path}`}}>
          <Flex align="center" gap={10} justify="center">
            <Logotype/>
            <Typography.Title level={2}>Employees</Typography.Title>
          </Flex>
        </Link>

        {
          !user ? (
            <Flex align="center" gap={10}>
              <Link to={{ pathname: `/${AppRoutes.register.path}` }}>
                <Button type="link" icon={<UserOutlined/>}>Register</Button>
              </Link>

              <Link to={{ pathname: `/${AppRoutes.login.path}` }}>
                <Button type="link" icon={<LoginOutlined/>}>Sign in</Button>
              </Link>
            </Flex>
          ) : (
            <Flex gap={15} align="center">
              <Link to={{ pathname: `/${AppRoutes.profile.path}`}} style={{ color: 'black' }}>
                <Flex gap={4} align="center">
                  <UserOutlined />
                  <Typography.Text type="secondary">{user.name}</Typography.Text>
                </Flex>
              </Link>
              <Divider type="vertical" style={{ borderWidth: '2px'}} />
              <Button onClick={logoutFromApp} type="link" icon={<LogoutOutlined />}>Sign out</Button>
            </Flex>
          )
        }
      </Flex>
    </header>
  );
};