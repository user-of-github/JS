import React from 'react';
import { Button, Card, Divider, Form, Input, InputNumber, Spin } from 'antd';
import { Employee } from '../../../../app/types';
import styles from './index.module.css';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';

interface EmployeeFormProps {
  onFinish?: (values: Employee) => void;
  title: string;
  initialValue?: Employee;
  isLoading?: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onFinish,
  title,
  initialValue,
  isLoading
}) => {
  return (
    <Card title={title} className={styles.card}>
      <Form
        name="employee-form"
        onFinish={onFinish}
        initialValues={initialValue}
        labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
      >
        <Form.Item
          className={styles.formItem}
          name="firstName"
          label="First name"
          required
          shouldUpdate
          rules={[{ required: true, message: 'Please enter a first name' }]}
        >
          <Input type="text" placeholder="John" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="lastName"
          label="Last name"
          required
          shouldUpdate
          rules={[{ required: true, message: 'Please enter a last name' }]}
        >
          <Input type="text" placeholder="Doe" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="age"
          label="Age"
          required
          shouldUpdate
          rules={[{ required: true }]}
        >
          <InputNumber type="number" placeholder="18" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="address"
          label="Address"
          required
          shouldUpdate
          rules={[{ required: true, type: 'string', message: 'Please enter a valid address' }]}
        >
          <Input placeholder="Minsk" />
        </Form.Item>

        <Divider/>
        <Button
          type="primary"
          htmlType="submit"
          icon={!isLoading ? <SaveOutlined /> : (
            <Spin
              className={styles.spinner}
              indicator={<LoadingOutlined spin />}
              size="small"
            />
          )}>
          Save
        </Button>
      </Form>
    </Card>
  );
};