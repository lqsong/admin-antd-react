import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import { useRecoilValue } from 'recoil';
import { userMessageState } from '@/store/user';

import IconSvg from '@/components/IconSvg';

export default memo(() => {
  const userMessage = useRecoilValue(userMessageState);
  return (
    <Link to={'/'} className='universallayout-top-message'>
      <IconSvg name='message' />
      <Badge className='universallayout-top-message-badge' count={userMessage} size='small' />
    </Link>
  );
});
