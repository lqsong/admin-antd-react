import React, { useState, useEffect } from 'react';
import { connect, ConnectProps, Helmet } from 'umi';

import settings from '@/config/settings';
import { getRouteItem, RoutesDataItem } from '@/utils/routes';

import SelectLang from '@/components/SelectLang';

import styles from './style.less';

interface UserLayoutPorps extends ConnectProps {}

const UserLayout: React.FC<UserLayoutPorps> = props => {
  const { location, route, children } = props;

  const { pathname } = location;
  const { routes } = route;

  const readRouteItem = (): RoutesDataItem => {
    return getRouteItem(pathname, routes as RoutesDataItem[]);
  };

  const [routeItem, setRouteItem] = useState<RoutesDataItem>({
    title: '',
    path: '',
  });

  // 设置当前路由项内容、父路由paths数组
  useEffect(() => {
    const routeItem = readRouteItem();
    setRouteItem(routeItem);
  }, [pathname]);

  return (
    <div className={styles['user-layout']}>
      <Helmet>
        <title>{`${routeItem.title} - ${settings.siteTitle}`}</title>
      </Helmet>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      {children}
    </div>
  );
};

export default connect()(UserLayout);
