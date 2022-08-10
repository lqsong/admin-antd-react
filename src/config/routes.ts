/**
 * 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { createUseRoutes } from '@/utils/router';
import { IRouter } from '@/@types/router.d';

import SecurityLayout from '@/layouts/SecurityLayout';

import UniversalLayoutRoutes from '@/layouts/UniversalLayout/routes';
import UniversalLayout from '@/layouts/UniversalLayout';

import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout';

export const routes: IRouter[] = [
  {
    path: '/',
    component: SecurityLayout,
    children: [
      {
        path: '/',
        redirect: '/home',
        component: UniversalLayout,
        children: UniversalLayoutRoutes,
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: UserLayoutRoutes,
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
];

export default () => useRoutes(createUseRoutes(routes));
