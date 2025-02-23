import React from 'react';
import { Button, Card, Form, Input, Layout, Row, Space, Typography } from 'antd';
import { FormTitle } from '../Login/components/FormTitle/FormTitle';
import styles from '../Login/index.module.css';
import { Link } from 'react-router';
import { AppRoutes } from '../../routes';

export const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title={FormTitle} className={styles.card}>
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
              rules={[{ required: true, message: 'Please enter your email' }]}
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
              <Button type="primary" htmlType="submit">Sign up</Button>
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
    </Layout>
  );
};