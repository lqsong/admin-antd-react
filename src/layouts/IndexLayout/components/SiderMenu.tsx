import React, { useState, useEffect } from 'react';
import { useIntl } from 'umi';
import { Menu } from 'antd';

import ALink from '@/components/ALink';

import {
  RoutesDataItem,
  getRouteBelongTopMenu,
  setRoutePathForParent,
} from '@/utils/routes';

import Icon from './Icon';

// 判断是否有子集
const hasChild = (children: RoutesDataItem[]): boolean => {
  const showChildren = children.filter(item => {
    if (item.hidden) {
      return false;
    }
    return true;
  });
  if (showChildren.length > 0) {
    return true;
  }
  return false;
};

// 返回菜单
const getMenuItems = (
  menuData: RoutesDataItem[],
  topNavEnable: boolean,
): RoutesDataItem[] => {
  let MenuItems: RoutesDataItem[] = menuData;
  if (topNavEnable) {
    MenuItems = [];
    for (let index = 0, len = menuData.length; index < len; index += 1) {
      const element = menuData[index];
      if (element.routes) {
        MenuItems.push(
          ...element.routes.map(item => {
            const newItem = item;
            newItem.path = setRoutePathForParent(item.path, element.path);
            return newItem;
          }),
        );
      }
    }
  }

  return MenuItems;
};

export interface SiderMenuProps {
  collapsed?: boolean;
  topNavEnable?: boolean;
  belongTopMenu?: string;
  selectedKeys?: string[];
  openKeys?: string[];
  onOpenChange?: (key: any) => void;
  menuData?: RoutesDataItem[];
}

const SiderMenu: React.FC<SiderMenuProps> = ({
  collapsed = false,
  topNavEnable = true,
  belongTopMenu = '',
  selectedKeys = [],
  openKeys = [],
  onOpenChange,
  menuData = [],
}) => {
  const { formatMessage } = useIntl();

  const getSubMenuOrItem = (
    routeItem: RoutesDataItem,
    parentPath: string = '',
  ): React.ReactNode => {
    const item = routeItem;

    if (item.hidden) {
      return null;
    }
    item.path = setRoutePathForParent(item.path, parentPath);

    const topMenuPath: string = getRouteBelongTopMenu(item);
    if (belongTopMenu !== topMenuPath && topNavEnable === true) {
      return null;
    }

    if (item.routes && Array.isArray(item.routes) && hasChild(item.routes)) {
      return (
        <Menu.SubMenu
          key={item.path}
          title={
            <span>
              {item.icon && <Icon type={item.icon} className="anticon" />}
              <span>
                {item.title && item.title !== ''
                  ? formatMessage({ id: item.title })
                  : '--'}
              </span>
            </span>
          }
        >
          {item.routes.map(node => {
            return getSubMenuOrItem(node, item.path);
          })}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.path}>
        <ALink to={item.path}>
          {item.icon && <Icon type={item.icon} className="anticon" />}
          <span>
            {item.title && item.title !== ''
              ? formatMessage({ id: item.title })
              : '--'}
          </span>
        </ALink>
      </Menu.Item>
    );
  };

  const [MenuItems, setMenuItems] = useState<RoutesDataItem[]>([]);

  // 设置菜单
  useEffect(() => {
    setMenuItems(getMenuItems(menuData, topNavEnable));
  }, [menuData, topNavEnable]);

  return (
    <Menu
      inlineCollapsed={collapsed}
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={key => {
        if (onOpenChange) {
          onOpenChange(key);
        }
      }}
    >
      {MenuItems.map(item => {
        return getSubMenuOrItem(item, '/');
      })}
    </Menu>
  );
};

export default SiderMenu;
