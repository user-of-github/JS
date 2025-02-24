import React, { useState } from 'react';
import { Button, Card, Form, Input, Layout, Row, Space, Typography, notification, Spin } from 'antd';
import { Link, useNavigate } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import { FormTitle } from './components/FormTitle/FormTitle';
import { AppRoutes } from '../../routes';
import { useLoginMutation, UserData } from '../../app/api/auth';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './index.module.css';


export const LoginPage: React.FC = () => {
  const [notificationApi, NotificationContextHolder] = notification.useNotification({
    placement: 'top',
    showProgress: true
  });
  const [loginUserMutation] = useLoginMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (user: Omit<UserData, 'name'>) => {
    try {
      setIsLoading(true);
      await loginUserMutation(user).unwrap();
      navigate(`/${AppRoutes.home.path}`);
    } catch (error) {
      const isError = getErrorMessage(error);
      if (isError) {
        notificationApi.open({message: isError, type: 'error'});
      } else {
        notificationApi.open({message: 'Error. Try again later', type: 'error'});
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title={FormTitle} className={styles.card}>
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={login} autoComplete="on">
            <Form.Item
              className={styles.formItem}
              name="email"
              label="Email"
              required
              shouldUpdate
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="password"
              label="Password"
              rules={[{required: true, message: 'Please input your password!'}]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item style={{ marginTop: 20}}>
              <Button
                type="primary"
                htmlType="submit"
                icon={isLoading && (
                  <Spin
                    className={styles.spinner}
                    indicator={<LoadingOutlined spin />}
                    size="small"
                  />
                )
              }
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Space direction="vertical" size="large">
            <Typography.Text>Don't have an account ?{' '}
              <Link to={{pathname: `/${AppRoutes.register.path}`}}>
                Sign up
              </Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
      { NotificationContextHolder }
    </Layout>
  );
};