import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

import ALink from '@/components/ALink';

import styles from '../style.less';

import { UserModelState } from '@/models/user';

interface RightTopMessageProps {
  message: number;
  dispatch: Dispatch;
}

const RightTopMessage: React.FC<RightTopMessageProps> = props => {
  const { message, dispatch } = props;

  const getMessage = (): void => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchMessage',
      });
    }
  };

  useEffect(() => {
    getMessage();
  }, [1]);

  return (
    <ALink to="/" className={styles['indexlayout-top-message']}>
      <BellOutlined style={{ fontSize: '16px' }} />
      <Badge
        className={styles['indexlayout-top-message-badge']}
        size="small"
        count={message}
        style={{ boxShadow: 'none' }}
      />
    </ALink>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  message: user.message,
}))(RightTopMessage);
