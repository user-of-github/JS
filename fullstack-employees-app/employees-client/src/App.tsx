import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/register';
import { AppLayout } from './components/Layout';
import { AppStore } from './app/store';
import { AuthCurrentUser } from './components/AuthCurrentUser';
import { EmployeesPage } from './pages/Employees';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { UnprotectedOnlyRoute } from './components/ProtectedRoute/UnprotectedOnlyRoute';
import { AddEmployeePage } from './pages/Employees/AddEmployee';
import { AppRoutes } from './routes';
import { themeConfig } from './theme';
import { ViewEmployeePage } from './pages/Employees/ViewEmployee';
import { EditEmployeePage } from './pages/Employees/EditEmployee';


export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig}>
        <Provider store={AppStore}>
          <AuthCurrentUser>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Navigate to={AppRoutes.home.path}/> } />
                <Route path={AppRoutes.login.path} element={<UnprotectedOnlyRoute page={<LoginPage/>}/>}/>
                <Route path={AppRoutes.register.path} element={<UnprotectedOnlyRoute page={<RegisterPage/>}/>}/>

                <Route path={AppRoutes.employees.path}>
                  <Route index element={<ProtectedRoute page={<EmployeesPage/>}/>}/>
                  <Route path={AppRoutes.employees.add.path} element={<ProtectedRoute page={<AddEmployeePage/>}/>}/>
                  <Route path={AppRoutes.employees.view.path}>
                    <Route index element={<ProtectedRoute page={<ViewEmployeePage/>}/>}/>
                    <Route path={AppRoutes.employees.view.edit.path} element={<EditEmployeePage/>}/>
                  </Route>
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
