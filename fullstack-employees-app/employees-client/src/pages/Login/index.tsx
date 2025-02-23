import React from 'react';
import { Button, Card, Form, Input, Layout, Row, Space, Typography } from 'antd';
import { FormTitle } from './components/FormTitle/FormTitle';
import styles from './index.module.css';
import { Link } from 'react-router';
import { AppRoutes } from '../../routes';


export const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title={FormTitle} className={styles.card}>
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
    </Layout>
  );
};