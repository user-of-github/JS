import React, { useState } from 'react';
import { Button, Card, Form, Input, Layout, notification, Row, Space, Spin, Typography } from 'antd';
import { FormTitle } from '../Login/components/FormTitle/FormTitle';
import styles from '../Login/index.module.css';
import { Link, useNavigate } from 'react-router';
import { AppRoutes } from '../../routes';
import { UserData, useRegisterMutation } from '../../app/api/auth';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { LoadingOutlined } from '@ant-design/icons';

export const RegisterPage: React.FC = () => {
  const [notificationApi, NotificationContextHolder] = notification.useNotification({
    placement: 'top',
    showProgress: true
  });
  const [registerUserMutation] = useRegisterMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const register = async (user: UserData) => {
    try {
      setIsLoading(true);
      const newUser = await registerUserMutation(user).unwrap();
      notificationApi.open({
        type: 'success',
        message: `Registration successful`,
        onClose: () => navigate(`/${AppRoutes.employees.path}`)
      });
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
        <Card title={<FormTitle title="Sign up to «Employees»"/>} className={styles.card}>
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={register}>
            <Form.Item
              className={styles.formItem}
              label="Name"
              name="name"
              required
              shouldUpdate
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              label="Email"
              name="email"
              required
              shouldUpdate
              rules={[{ required: true, type: 'email', message: 'Please enter your email' }]}
            >
              <Input type="email" placeholder="john@doe.com" />
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

            <Form.Item
              className={styles.formItem}
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {required: true, message: 'Please confirm your password!',},
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  }
                })
              ]}
            >
              <Input.Password placeholder="Same password" />
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
                )}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <Space direction="vertical" size="large">
            <Typography.Text>Already have an account ?{' '}
              <Link to={{pathname: `/${AppRoutes.login.path}`}}>
                Sign in
              </Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>

      { NotificationContextHolder }
    </Layout>
  );
};