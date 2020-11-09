import React from 'react';
import { Card } from 'antd';

export default () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>此页面只有 test 与 admin 账号可以查看。</Card>
    </div>
  );
};
