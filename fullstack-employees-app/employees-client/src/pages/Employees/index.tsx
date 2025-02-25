import React from 'react';
import { Button, Flex, Layout, Row, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router';
import { useGetAllEmployeesQuery } from '../../app/api/employees';
import { Employee } from '../../app/types';
import { AppRoutes } from '../../routes';
import styles from './index.module.css';


const columns: ColumnsType<Employee> = [{
  title: 'Name', dataIndex: 'firstName', key: 'name'
}, {
  title: 'Age', dataIndex: 'age', key: 'age'
}, {
  title: 'Address', dataIndex: 'address', key: 'address'
}] as const;

export const EmployeesPage: React.FC = () => {
  const {data, isLoading} = useGetAllEmployeesQuery();
  const navigate = useNavigate();

  return (
    <Layout>
      <Flex vertical gap={30}>
        <Row>
          <Link to={{pathname: AppRoutes.employees.add.path }}>
            <Button type="primary" icon={<PlusCircleOutlined/>}>Add</Button>
          </Link>
        </Row>

        <Table
          loading={isLoading}
          dataSource={data?.employees || []}
          pagination={false}
          columns={columns}
          rowKey={record => record.id}
          rowClassName={styles.tableRow}
          onRow={(record) => ({
            onClick: () => {
              navigate(AppRoutes.employees.view.link(record.id));
            }
          })}
        />
      </Flex>
    </Layout>
  );
};