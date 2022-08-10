import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { hasPermissionRoles } from '@/utils/router';

const Forbidden = (
  <Result
    status={403}
    title='403'
    subTitle='Sorry, you are not authorized to access this page.'
    extra={
      <Button type='primary'>
        <Link to='/'>Go Home</Link>
      </Button>
    }
  />
);

export interface ALinkProps {
  children: React.ReactNode;
  role?: string | string[];
  noNode?: React.ReactNode;
}

const Permission: React.FC<ALinkProps> = ({ role, noNode = Forbidden, children }) => {
  const user = useRecoilValue(userState);
  return hasPermissionRoles(user.roles, role) ? <>{children}</> : <>{noNode}</>;
};

export default Permission;
