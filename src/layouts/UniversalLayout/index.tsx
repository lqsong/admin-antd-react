import { memo, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { useRecoilValue } from 'recoil';
import { globalState } from '@/store/global';
import { userState } from '@/store/user';
import { useI18n } from '@/store/i18n';
import locales from './locales';

import { formatRoutes, getBreadcrumbRoutes } from '@/utils/router';

import Permission from '@/components/Permission';
import LeftSider from './components/LeftSider';
import RightTop from './components/RightTop';
import RightFooter from './components/RightFooter';
import layoutRotes from './routes';

import useTitle from '@/hooks/useTitle';

import './css/index.less';

export interface UniversalLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: UniversalLayoutProps) => {
  const location = useLocation();

  const t = useRecoilValue(useI18n(locales));
  const global = useRecoilValue(globalState);
  const user = useRecoilValue(userState);

  // 框架所有菜单路由 与 patch key格式的所有菜单路由
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  // 当前路由item
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  // 面包屑导航
  const breadCrumbs = useMemo(
    () =>
      getBreadcrumbRoutes(location.pathname, routerPathKeyRouter.pathKeyRouter).map((item) => ({
        ...item,
        title: t(item.title),
      })),
    [location, routerPathKeyRouter, t],
  );

  // 设置title
  useTitle(t(routeItem?.meta?.title || ''));

  return (
    <div id='universallayout' className={classnames({ light: global.theme === 'light' })}>
      {global.navMode === 'inline' && (
        <LeftSider
          collapsed={global.collapsed}
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          routeItem={routeItem}
          theme={global.theme}
          leftSiderFixed={global.leftSiderFixed}
        />
      )}
      <div id='universallayout-right'>
        <RightTop
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          jsonMenuData={routerPathKeyRouter.pathKeyRouter}
          routeItem={routeItem}
          breadCrumbs={breadCrumbs}
        />
        <div id='universallayout-right-main'>
          <Permission role={routeItem?.meta?.roles}>
            {/* <Outlet /> */}
            {children}
          </Permission>
          <RightFooter />
        </div>
      </div>
    </div>
  );
});
