import { RoutesDataItem } from '@/utils/routes';

/**
 * User Layout 路由页面
 */
const UserLayoutRoutes: RoutesDataItem[] = [
  {
    title: 'user-layout.menu.login',
    path: '/user/login',
    component: '@/pages/user/login',
  },
  {
    title: 'user-layout.menu.register',
    path: '/user/register',
    component: '@/pages/user/register',
  },
];

export default UserLayoutRoutes;
