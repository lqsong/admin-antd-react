import { memo } from 'react';
import { Result, Spin } from 'antd';

export default memo(() => <Result icon={<Spin size='large' />} />);
