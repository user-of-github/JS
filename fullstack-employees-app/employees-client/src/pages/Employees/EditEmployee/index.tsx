import React, { useState } from 'react';
import { Layout, notification, Row, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../../app/api/employees';
import { LoadingOutlined } from '@ant-design/icons';
import { EmployeeForm } from '../components/EmployeeForm';
import { Employee } from '../../../app/types';
import { AppRoutes } from '../../../routes';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { ButtonBack } from '../../../components/ButtonBack';

export const EditEmployeePage: React.FC = () => {
  const params = useParams();
  const [notificationApi, NotificationContextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [editEmployee] = useEditEmployeeMutation();


  const onUserEdit = async (employee: Employee) => {
    const editedEmployee: Employee = {
      ...data?.employee,
      ...employee
    };

    try {
      setIsEditLoading(true);
      await editEmployee(editedEmployee).unwrap();
      navigate(AppRoutes.employees.view.link(editedEmployee.id));
    } catch (error) {
      const isError = getErrorMessage(error);
      if (isError) {
        notificationApi.open({message: isError, type: 'error'});
      } else {
        notificationApi.open({message: 'Error. Try again later', type: 'error'});
      }
    } finally {
      setIsEditLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <ButtonBack path={AppRoutes.employees.view.link(params.id || '')}/>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Layout>
    );
  }


  return (
    <Layout>
      <ButtonBack path={AppRoutes.employees.view.link(params.id || '')}/>

      <Row align="middle" justify="center">
        <EmployeeForm
          isLoading={isEditLoading}
          title="Edit Employee"
          initialValue={data?.employee}
          onFinish={onUserEdit}
        />
      </Row>

      { NotificationContextHolder }
    </Layout>
  );
};