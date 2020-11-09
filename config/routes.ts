import {
  RoutesDataItem,
  umiRoutes,
  getNotFoundRoute,
} from '../src/utils/routes';

/**
 * User Layout 路由页面
 */
import UserLayoutRoutes from '../src/layouts/UserLayout/routes';

/**
 * Index Layout 路由页面
 */
import IndexLayoutRoutes from '../src/layouts/IndexLayout/routes';

/**
 * config routes 配置
 * umi routes: https://umijs.org/docs/routing
 */
export const routes: RoutesDataItem[] = [
  {
    title: '',
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      ...umiRoutes(UserLayoutRoutes, '/user', '/user'),
      {
        title: '',
        path: '/user',
        redirect: '/user/login',
      },
      getNotFoundRoute(),
    ],
  },
  {
    title: '',
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        title: '',
        path: '/',
        component: '@/layouts/IndexLayout',
        routes: [
          ...umiRoutes(IndexLayoutRoutes),
          {
            title: '',
            path: '/',
            redirect: '/home',
          },
          getNotFoundRoute(),
        ],
      },
      getNotFoundRoute(),
    ],
  },
  getNotFoundRoute(),
];
