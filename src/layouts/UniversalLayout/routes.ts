/**
 * UniversalLayout 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const universalLayoutRotes: IRouter[] = [
  /*
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'universal-layout.menu.home',
    },
    component: lazy(() => import('@/pages/Home')),
  },
  */
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'universal-layout.menu.home',
    },
    redirect: '/home/workplace',
    children: [
      {
        path: 'workplace',
        meta: {
          icon: 'control',
          title: 'universal-layout.menu.home.workplace',
        },
        component: lazy(() => import('@/pages/Home')),
      },
      {
        path: 'custombreadcrumbs',
        meta: {
          icon: 'edit',
          title: 'universal-layout.menu.home.custom-breadcrumbs',
          breadcrumb: [
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs',
              path: '/home/custombreadcrumbs',
            },
            {
              title: 'universal-layout.menu.home',
              path: '/home',
            },
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
              path: 'http://liqingsong.cc',
            },
          ],
          tabNavCloseBefore: (close: () => void): void => {
            // eslint-disable-next-line no-alert
            if (window.confirm('确认关闭吗')) {
              close();
            }
          },
        },
        component: lazy(() => import('@/pages/CustomBreadcrumbs')),
      },
      {
        path: 'http://admin-antd-react.liqingsong.cc/',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.home.docs',
          selectLeftMenu: '/home',
        },
      },
    ],
  },
  {
    path: '/component',
    redirect: '/component/icon/svg',
    meta: {
      icon: 'components',
      title: 'universal-layout.menu.component',
    },
    children: [
      {
        path: 'icon',
        redirect: '/component/icon/svg',
        meta: {
          icon: 'icon',
          title: 'universal-layout.menu.component.icon',
        },
        children: [
          {
            path: 'svg',
            meta: {
              title: 'universal-layout.menu.component.icon.svg',
            },
            component: lazy(() => import('@/pages/component/icon/svg')),
          },
        ],
      },
      {
        path: 'editor',
        redirect: '/component/editor/tuieditor',
        meta: {
          icon: 'editor',
          title: 'universal-layout.menu.component.editor',
        },
        children: [
          {
            path: 'tuieditor',
            meta: {
              title: 'universal-layout.menu.component.editor.tui-editor',
            },
            component: lazy(() => import('@/pages/component/editor/TuiEditor')),
          },
          {
            path: 'ckeditor',
            meta: {
              title: 'universal-layout.menu.component.editor.ckeditor',
            },
            component: lazy(() => import('@/pages/component/editor/ckeditor')),
          },
        ],
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/list/basic',
    meta: {
      icon: 'page',
      title: 'universal-layout.menu.pages',
    },
    children: [
      {
        path: 'list',
        redirect: '/pages/list/basic',
        meta: {
          icon: 'list',
          title: 'universal-layout.menu.pages.list',
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: 'universal-layout.menu.pages.list.basic',
            },
            component: lazy(() => import('@/pages/pagesample/list/basic')),
          },
          {
            path: 'table',
            meta: {
              title: 'universal-layout.menu.pages.list.table',
            },
            component: lazy(() => import('@/pages/pagesample/list/table')),
          },
          {
            path: 'search',
            redirect: '/pages/list/search/table',
            meta: {
              title: 'universal-layout.menu.pages.list.search',
            },
            children: [
              {
                path: 'table',
                meta: {
                  title: 'universal-layout.menu.pages.list.search.table',
                },
                component: lazy(() => import('@/pages/pagesample/list/search/table')),
              },
            ],
          },
        ],
      },
      {
        path: 'form',
        redirect: '/pages/form/basic',
        meta: {
          icon: 'edit',
          title: 'universal-layout.menu.pages.form',
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: 'universal-layout.menu.pages.form.basic',
            },
            component: lazy(() => import('@/pages/pagesample/form/basic')),
          },
          {
            path: 'complex',
            meta: {
              title: 'universal-layout.menu.pages.form.complex',
            },
            component: lazy(() => import('@/pages/pagesample/form/complex')),
          },
        ],
      },
      {
        path: 'detail',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.pages.detail',
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: 'universal-layout.menu.pages.detail.basic',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/basic')),
          },
          {
            path: 'module',
            meta: {
              title: 'universal-layout.menu.pages.detail.module',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/module')),
          },
          {
            path: 'table',
            meta: {
              title: 'universal-layout.menu.pages.detail.table',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/table')),
          },
        ],
      },
    ],
  },
  {
    path: '/roles',
    redirect: '/roles/all',
    meta: {
      icon: 'permissions',
      title: 'universal-layout.menu.roles',
    },
    children: [
      {
        path: 'all',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.roles.all',
        },
        component: lazy(() => import('@/pages/roles/all')),
      },
      {
        path: 'user',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.roles.user',
          roles: ['user'],
        },
        component: lazy(() => import('@/pages/roles/user')),
      },
      {
        path: 'test',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.roles.test',
          roles: ['test'],
        },
        component: lazy(() => import('@/pages/roles/test')),
      },
    ],
  },
];

export default universalLayoutRotes;
