import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AppRoutes } from './routes';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/register';
import { AppLayout } from './components/Layout';
import { themeConfig } from './theme';
import { Provider } from 'react-redux';
import { AppStore } from './core/store';
import { AuthCurrentUser } from './components/AuthCurrentUser';


export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig}>
        <Provider store={AppStore}>
          <AuthCurrentUser>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Navigate to={AppRoutes.home.path}/> } />
                <Route path={AppRoutes.login.path} element={<LoginPage/>}/>
                <Route path={AppRoutes.register.path} element={<RegisterPage/>}/>

                <Route path={AppRoutes.employees.path}>
                  <Route index element={<h1>Employees List</h1>}/>
                  <Route path={AppRoutes.employees.add.path} element={<h1>Add employee</h1>}/>
                  <Route path={AppRoutes.employees.edit.path} element={<h1>Edit employee</h1>}/>
                </Route>

                <Route path="*" element={<h1>Not found</h1>}></Route>
              </Routes>
            </AppLayout>
          </AuthCurrentUser>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
};
