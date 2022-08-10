import { lazy } from 'react';
import { IRouter } from '@/@types/router';

const pathPre = '/user';

const UserLayoutRoutes: IRouter[] = [
  {
    path: `${pathPre}/login`,
    meta: {
      title: 'user-layout.menu.login',
    },
    component: lazy(() => import('@/pages/user/login')),
  },
  {
    path: `${pathPre}/register`,
    meta: {
      title: 'user-layout.menu.register',
    },
    component: lazy(() => import('@/pages/user/register')),
  },
];

export default UserLayoutRoutes;
