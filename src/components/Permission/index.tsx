import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';
import {
  RoutesDataItem,
  hasPermission,
  hasPermissionRouteRoles,
} from '@/utils/routes';

const Forbidden = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

export interface PermissionProps {
  userRoles: string[];
  routeOrRole: RoutesDataItem | string;
  noNode?: React.ReactNode;
}

const Permission: React.FC<PermissionProps> = props => {
  const { userRoles = [], routeOrRole, noNode = Forbidden, children } = props;

  if (typeof routeOrRole === 'string') {
    return hasPermissionRouteRoles(userRoles, routeOrRole) ? (
      <>{children}</>
    ) : (
      <>{noNode}</>
    );
  }

  return hasPermission(userRoles, routeOrRole) ? (
    <>{children}</>
  ) : (
    <>{noNode}</>
  );
};

export default Permission;
