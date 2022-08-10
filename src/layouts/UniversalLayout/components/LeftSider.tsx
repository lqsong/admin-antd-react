import { memo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import logo from '@/assets/images/logo.png';
import SiderMenu from './SiderMenu';

import { IRouter } from '@/@types/router';
import { Theme } from '@/@types/settings';

export interface LeftSiderProps {
  menuData: IRouter[];
  routeItem: IRouter;
  userRoles?: string[];
  collapsed?: boolean;
  theme?: Theme;
  leftSiderFixed?: boolean;
}

export default memo(
  ({
    menuData,
    routeItem,
    userRoles = [],
    collapsed = false,
    theme = 'dark',
    leftSiderFixed = true,
  }: LeftSiderProps) => (
    <div id='universallayout-left' className={classnames({ narrow: collapsed, fiexd: leftSiderFixed })}>
      <div className='universallayout-left-sider'>
        <div className='universallayout-left-logo'>
          <Link to='/' className='logo-url'>
            {collapsed ? <img alt='' src={logo} width='30' /> : <h3 className='logo-title'>AdminAntdReact</h3>}
          </Link>
        </div>
        <div className='universallayout-left-menu'>
          <SiderMenu
            userRoles={userRoles}
            menuData={menuData}
            routeItem={routeItem}
            collapsed={collapsed}
            theme={theme}
          />
        </div>
      </div>
    </div>
  ),
);
