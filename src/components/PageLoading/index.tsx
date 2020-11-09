import React from 'react';
import { Result, Spin } from 'antd';

export default () => {
  return <Result icon={<Spin size="large" />} />;
};
