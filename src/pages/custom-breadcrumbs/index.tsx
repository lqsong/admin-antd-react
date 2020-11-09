import React from 'react';
import { useIntl } from 'umi';
import { Card } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

export default () => {
  const { formatMessage } = useIntl();
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <ArrowUpOutlined style={{ fontSize: '35px', color: '#FF0000' }} />{' '}
        {formatMessage({ id: 'page.custom-breadcrumbs.msg' })}
      </Card>
    </div>
  );
};
