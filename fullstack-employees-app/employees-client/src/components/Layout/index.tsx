import React from 'react';
import styles from './index.module.css';
import { Layout as AntLayout } from 'antd';


export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className={styles.container}>
    <AntLayout.Content className={styles.fullHeight}>
      { children }
    </AntLayout.Content>
    </main>
);