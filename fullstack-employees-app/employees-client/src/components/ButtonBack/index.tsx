import React from 'react';
import { Button, Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

export const ButtonBack: React.FC<{path: string}> = ({ path }) => {
  return (
    <Flex style={{ paddingTop: 10, paddingBottom: 25 }}>
      <Link to={{pathname: path}}>
        <Button shape="round" icon={<ArrowLeftOutlined />} type="dashed"></Button>
      </Link>
    </Flex>
  );
};