import React, { useState } from 'react';
import { Layout, notification, Row } from 'antd';
import { EmployeeForm } from '../components/EmployeeForm';
import { useNavigate } from 'react-router';
import { useAddEmployeeMutation } from '../../../app/api/employees';
import { Employee } from '../../../app/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { AppRoutes } from '../../../routes';

export const AddEmployeePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [notificationApi, NotificationContextHolder] = notification.useNotification({
    placement: 'top',
    showProgress: true
  });
  const [addEmployeeMutation] = useAddEmployeeMutation();

  const createEmployee = async (data: Omit<Employee, 'id' | 'userId'>) => {
    try {
      setIsLoading(true);
      await addEmployeeMutation(data).unwrap();

      navigate(`/${AppRoutes.employees.path}`, { state: { employeeCreated: true }})
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
        <EmployeeForm
          title="Add a new employee"
          isLoading={isLoading}
          onFinish={createEmployee}
        />
      </Row>

      { NotificationContextHolder }
    </Layout>
  );
};