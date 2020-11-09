import React, { useState, useEffect } from 'react';

import { Link } from 'umi';
import { Scrollbars } from 'react-custom-scrollbars';
import { RoutesDataItem } from '@/utils/routes';

import logo from '@/assets/images/logo.png';
import SiderMenu from './SiderMenu';

import styles from '../style.less';

export interface LeftProps {
  collapsed?: boolean;
  topNavEnable?: boolean;
  belongTopMenu?: string;
  selectedKeys?: string[];
  openKeys?: string[];
  onOpenChange?: (key: any) => void;
  menuData?: RoutesDataItem[];
}

const Left: React.FC<LeftProps> = ({
  collapsed = false,
  topNavEnable = true,
  belongTopMenu = '',
  selectedKeys = [],
  openKeys = [],
  onOpenChange,
  menuData = [],
}) => {
  const [leftClassName, setLeftClassName] = useState<string>('');

  useEffect(() => {
    if (collapsed) {
      setLeftClassName(`${styles.narrow}`);
    } else {
      setLeftClassName('');
    }
  }, [collapsed]);

  return (
    <div id={styles['indexlayout-left']} className={leftClassName}>
      <div className={styles['indexlayout-left-logo']}>
        <Link to="/" className={styles['logo-url']}>
          {collapsed ? (
            <img alt="logo" src={logo} width="30" />
          ) : (
            <h3 className={styles['logo-title']}>AdminAntdReact</h3>
          )}
        </Link>
      </div>
      <div className={styles['indexlayout-left-menu']}>
        <Scrollbars
          className={styles['left-scrollbar']}
          autoHide
          renderThumbHorizontal={(props: any) => (
            <div {...props} className={styles['scrollbar-thumb']} />
          )}
          renderThumbVertical={(props: any) => (
            <div {...props} className={styles['scrollbar-thumb']} />
          )}
        >
          <SiderMenu
            collapsed={collapsed}
            topNavEnable={topNavEnable}
            belongTopMenu={belongTopMenu}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            menuData={menuData}
          />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Left;
