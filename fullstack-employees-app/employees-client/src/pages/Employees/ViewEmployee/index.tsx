import React from 'react';
import { Button, Descriptions, Divider, Empty, Layout, notification, Popconfirm, Space, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router';
import { useDeleteEmployeeMutation, useGetEmployeeQuery } from '../../../app/api/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/store/slices/auth';
import { AppRoutes } from '../../../routes';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { getErrorMessage } from '../../../utils/getErrorMessage';

export const ViewEmployeePage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [notificationApi, NotificationContextHolder] = notification.useNotification({
    showProgress: true, placement: 'top'
  });
  const { data, isLoading, error, isError } = useGetEmployeeQuery(params.id || '');
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const user = useSelector(selectUser);

  const onDelete = async () => {
    try {
      await deleteEmployee(params.id || '');
      notificationApi.open({
        type: 'info',
        message: 'Deleted employee',
        duration: 1.5,
        onClose: () => {
          navigate(AppRoutes.employees.list.path);
        }
      });
    } catch (error) {
      const isError = getErrorMessage(error);
      if (isError) {
        notificationApi.open({message: isError, type: 'error'});
      } else {
        notificationApi.open({message: 'Error. Try again later', type: 'error'});
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Layout>
    );
  }

  if (isError) {
    const errorText = getErrorMessage(error) || 'Error in fetching';
    return (
      <Layout>
        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={errorText}/>
      </Layout>
    );
  }

  return (
    <Layout>
      <Descriptions title="Employee details" bordered>
        <Descriptions.Item label="Name" span={3}>
          {data?.employee.firstName}{' '}{data?.employee.lastName}
        </Descriptions.Item>

        <Descriptions.Item label="Age" span={3}>
          {data?.employee.age}
        </Descriptions.Item>

        <Descriptions.Item label="Address" span={3}>
          {data?.employee.address}
        </Descriptions.Item>
      </Descriptions>

      {
        user?.id === data?.employee.userId && (
          <>
            <Divider orientation="left">
              Actions
            </Divider>

            <Space>
              <Link to={{pathname: AppRoutes.employees.view.edit.path}}>
                <Button shape="round" type="default" icon={<EditOutlined/>}>Edit</Button>
              </Link>

              <Popconfirm
                title="Confirmation"
                description="Are you sure to delete this task?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger shape="round">Delete</Button>
              </Popconfirm>
            </Space>
          </>
        )
      }

      { NotificationContextHolder }
    </Layout>
  );
};