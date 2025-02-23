import React from 'react';
import { Button, Card, Form, Input, Layout, Row, Space, Typography,  notification } from 'antd';
import { Link } from 'react-router';
import { FormTitle } from './components/FormTitle/FormTitle';
import styles from './index.module.css';
import { AppRoutes } from '../../routes';
import { useLoginMutation, UserData } from '../../core/api/auth';
import { getErrorMessage } from '../../utils/getErrorMessage';


export const LoginPage: React.FC = () => {
  const [notificationApi, NotificationContextHolder] = notification.useNotification();
  const [loginUser, loginUserResult] = useLoginMutation();

  const login = async (user: Omit<UserData, 'name'>) => {
    try {
      await loginUser(user).unwrap();
    } catch (error) {
      const isError = getErrorMessage(error);
      if (isError) {
        notificationApi.error({
          message: isError, type: 'error'
        });
      } else {
        notificationApi.error({
          message: 'Error. Try again later', type: 'error'
        });
      }
    }
  };


  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title={FormTitle} className={styles.card}>
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={login}>
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
              <Button type="primary" htmlType="submit">Sign in</Button>
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