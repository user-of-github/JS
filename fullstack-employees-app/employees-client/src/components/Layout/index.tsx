import React from 'react';
import styles from './index.module.css';
import { Layout as AntLayout } from 'antd';
import { AppHeader } from '../Header';


export const AppLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
      <main className={styles.container}>
          <AppHeader/>
          <AntLayout.Content className={styles.fullHeight}>
              {children}
          </AntLayout.Content>
      </main>
    );
};