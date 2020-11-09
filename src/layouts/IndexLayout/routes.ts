import { RoutesDataItem } from '@/utils/routes';

/**
 * Index Layout 路由页面
 */
const IndexLayoutRoutes: RoutesDataItem[] = [
  /* {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    component: '@/pages/home',
  }, */
  {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    redirect: '/home/workplace',
    routes: [
      {
        icon: 'control',
        title: 'index-layout.menu.home.workplace',
        path: 'workplace',
        component: '@/pages/home',
      },
      {
        icon: 'edit',
        title: 'index-layout.menu.home.custom-breadcrumbs',
        path: 'custombreadcrumbs',
        component: '@/pages/custom-breadcrumbs',
        breadcrumb: [
          {
            title: 'index-layout.menu.home.custom-breadcrumbs',
            path: '/home/custombreadcrumbs',
          },
          {
            title: 'index-layout.menu.home',
            path: '/home',
          },
          {
            title: 'index-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
            path: 'http://liqingsong.cc',
          },
        ],
      },
      {
        icon: 'detail',
        title: 'index-layout.menu.home.docs',
        path: 'http://admin-antd-react.liqingsong.cc/',
        belongTopMenu: '/home',
      },
    ],
  },
  {
    icon: 'components',
    title: 'index-layout.menu.component',
    path: '/component',
    redirect: '/component/icon/svg',
    routes: [
      {
        icon: 'icon',
        title: 'index-layout.menu.component.icon',
        path: 'icon',
        redirect: '/component/icon/svg',
        routes: [
          {
            title: 'index-layout.menu.component.icon.svg',
            path: 'svg',
            component: '@/pages/component/icon/svg',
          },
          {
            title: 'index-layout.menu.component.icon.font',
            path: 'font',
            component: '@/pages/component/icon/font',
          },
          {
            title: 'index-layout.menu.component.icon.antd',
            path: 'antd',
            component: '@/pages/component/icon/antd',
          },
        ],
      },
      {
        icon: 'editor',
        title: 'index-layout.menu.component.editor',
        path: 'editor',
        redirect: '/component/editor/tuieditor',
        routes: [
          {
            title: 'index-layout.menu.component.editor.tui-editor',
            path: 'tuieditor',
            component: '@/pages/component/editor/tui-editor',
          },
          {
            title: 'index-layout.menu.component.editor.ckeditor',
            path: 'ckeditor',
            component: '@/pages/component/editor/ckeditor',
          },
        ],
      },
    ],
  },
  {
    icon: 'page',
    title: 'index-layout.menu.pages',
    path: '/pagesample',
    redirect: '/pagesample/list/basic',
    routes: [
      {
        icon: 'list',
        title: 'index-layout.menu.pages.list',
        path: 'list',
        redirect: '/pagesample/list/basic',
        routes: [
          {
            title: 'index-layout.menu.pages.list.basic',
            path: 'basic',
            component: '@/pages/pagesample/list/basic',
          },
          {
            title: 'index-layout.menu.pages.list.table',
            path: 'table',
            component: '@/pages/pagesample/list/table',
          },
          {
            title: 'index-layout.menu.pages.list.highly-adaptive-table',
            path: 'highlyadaptivetable',
            component: '@/pages/pagesample/list/highly-adaptive-table',
          },
          {
            title: 'index-layout.menu.pages.list.search',
            path: 'search',
            redirect: '/pagesample/list/search/table',
            routes: [
              {
                title: 'index-layout.menu.pages.list.search.table',
                path: 'table',
                component: '@/pages/pagesample/list/search/table',
              },
              {
                title: 'index-layout.menu.pages.list.search.pro-table',
                path: 'protable',
                component: '@/pages/pagesample/list/search/pro-table',
              },
            ],
          },
        ],
      },
      {
        icon: 'edit',
        title: 'index-layout.menu.pages.form',
        path: 'form',
        redirect: '/pagesample/form/basic',
        routes: [
          {
            title: 'index-layout.menu.pages.form.basic',
            path: 'basic',
            component: '@/pages/pagesample/form/basic',
          },
          {
            title: 'index-layout.menu.pages.form.complex',
            path: 'complex',
            component: '@/pages/pagesample/form/complex',
          },
        ],
      },
      {
        icon: 'detail',
        title: 'index-layout.menu.pages.detail',
        path: 'detail',
        redirect: '/pagesample/detail/basic',
        routes: [
          {
            title: 'index-layout.menu.pages.detail.basic',
            path: 'basic',
            component: '@/pages/pagesample/detail/basic',
          },
          {
            title: 'index-layout.menu.pages.detail.module',
            path: 'module',
            component: '@/pages/pagesample/detail/module',
          },
          {
            title: 'index-layout.menu.pages.detail.table',
            path: 'table',
            component: '@/pages/pagesample/detail/table',
          },
        ],
      },
    ],
  },
  {
    icon: 'permissions',
    title: 'index-layout.menu.roles',
    path: '/roles',
    redirect: '/roles/all',
    routes: [
      {
        icon: 'detail',
        title: 'index-layout.menu.roles.all',
        path: 'all',
        component: '@/pages/roles/all',
      },
      {
        icon: 'detail',
        roles: ['user'],
        title: 'index-layout.menu.roles.user',
        path: 'user',
        component: '@/pages/roles/user',
      },
      {
        icon: 'detail',
        roles: ['test'],
        title: 'index-layout.menu.roles.test',
        path: 'test',
        component: '@/pages/roles/test',
      },
    ],
  },
];

export default IndexLayoutRoutes;
