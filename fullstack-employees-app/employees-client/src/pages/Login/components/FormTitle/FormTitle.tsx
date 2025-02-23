import React from 'react';
import { Flex, Typography } from 'antd';
import { Logotype } from '../../../../components/Header';
import styles from './FormTitle.module.css';


export const FormTitle: React.ReactNode = (
  <Flex vertical gap={4} align="center" className={styles.container}>
    <Logotype/>
    <Typography.Title level={4} className={styles.title}>
      Sign in to Employees
    </Typography.Title>
  </Flex>
);