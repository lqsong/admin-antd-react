import settings from '../config/settings';
import { isExternal } from './validate';

/**
 * 路由类型
 */
export interface RoutesDataItem {
  // 菜单中是否隐藏
  hidden?: boolean;
  // 图标的名称，显示在菜单标题前
  icon?: string;
  // 权限控制，页面角色(您可以设置多个角色)
  roles?: string[];
  // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字，目前可以使用locales
  title: string;
  // 路由地址或外链
  path: string;
  // 跳转地址
  redirect?: string;
  // 组件页面
  component?: string;
  // 子集
  routes?: RoutesDataItem[];
  /**
   * 面包屑自定义内容：
   *     1、默认不配置按照路由自动读取；
   *     2、设置为 false , 按照路由自动读取并不读当前自己；
   *     3、配置对应的面包屑格式如下：
   */
  breadcrumb?: RoutesDataItem[] | false;
  /**
   * 左侧菜单选中，如果设置路径，侧栏将突出显示你设置的路径对应的侧栏导航
   *   1、（默认 route.path），此参数是为了满足特殊页面特殊需求，
   *   2、如：详情页等选中侧栏导航或在模块A下面的页面，想选模块B为导航选中状态
   */
  selectLeftMenu?: string;
  /**
   * 所属顶级菜单,当顶级菜单存在时，用于选中顶部菜单，与侧栏菜单切换
   *   1、三级路由此参数的作用是选中顶级菜单
   *   2、二级路由此参数的作用是所属某个顶级菜单的下面，两个层级的必须同时填写一致，如果path设置的是外链，此参数必填
   *   3、(默认不设置 path.split('/')[0])，此参数是为了满足特殊页面特殊需求
   */
  belongTopMenu?: string;
}

/**
 * 获取 route
 * @param pathname path
 * @param routesData routes
 */
export const getRouteItem = (
  pathname: string,
  routesData: RoutesDataItem[],
): RoutesDataItem => {
  let item: RoutesDataItem = { title: '', path: '' };
  for (let index = 0, len = routesData.length; index < len; index += 1) {
    const element = routesData[index];
    if (element.path === pathname) {
      item = element;
      break;
    }

    if (element.routes) {
      item = getRouteItem(pathname, element.routes);
      if (item.path !== '') {
        break;
      }
    }
  }

  return item;
};

/**
 * 获取 父 route
 * @param pathname path
 * @param routesData routes
 */
export const getRouteParentItem = (
  pathname: string,
  routesData: RoutesDataItem[],
  defaultParentItem: Partial<RoutesDataItem>,
): Partial<RoutesDataItem> => {
  let item: Partial<RoutesDataItem> = {};
  for (let index = 0, len = routesData.length; index < len; index += 1) {
    const element = routesData[index];
    if (element.path === pathname) {
      item = defaultParentItem;
      break;
    }

    if (element.routes) {
      item = getRouteParentItem(pathname, element.routes, element);
      if (Object.keys(item).length) {
        break;
      }
    }
  }

  return item;
};

/**
 * 根据路由 path 格式化 - 获取 父path
 * @param pathname path
 * @param separator 路由分割符- 默认 /
 */
export const formatRoutePathTheParents = (
  pathname: string,
  separator: string = '/',
): string[] => {
  const arr: string[] = [];
  if (!pathname || pathname === '') {
    return arr;
  }

  const pathArr = pathname.split(separator);
  for (let index = 1, len = pathArr.length - 1; index < len; index += 1) {
    arr.push(pathArr.slice(0, index + 1).join(separator));
  }

  return arr;
};

/**
 * 根据路由 pathname 数组 - 返回对应的 route 数组
 * @param pathname path[]
 * @param routesData routes
 */
export const getPathsTheRoutes = (
  pathname: string[],
  routesData: RoutesDataItem[],
): RoutesDataItem[] => {
  const routeItem: RoutesDataItem[] = [];

  for (let index = 0, len = pathname.length; index < len; index += 1) {
    const element = pathname[index];
    const item = getRouteItem(element, routesData);
    if (item.path !== '') {
      routeItem.push(item);
    }
  }

  return routeItem;
};

/**
 * 获取面包屑对应的 route 数组
 * @param route route 当前routeItem
 * @param pathname path[]
 * @param routesData routes
 */
export const getBreadcrumbRoutes = (
  route: RoutesDataItem,
  pathname: string[],
  routesData: RoutesDataItem[],
  formatMessage?: (
    descriptor: any,
    values?: any,
  ) => string | React.ReactNodeArray,
): RoutesDataItem[] => {
  if (!route.breadcrumb) {
    const routePaths = getPathsTheRoutes(pathname, routesData);

    return route.breadcrumb === false ? routePaths : [...routePaths, route];
  }

  if (formatMessage) {
    if (route['breadcrumbFormatMessage'] === true) {
      return route.breadcrumb;
    } else {
      route['breadcrumbFormatMessage'] = true;
      return route.breadcrumb.map(item => {
        item.title = formatMessage({ id: item.title }) as string;
        return item;
      });
    }
  }

  return route.breadcrumb;
};

/**
 * 获取当前路由选中的侧边栏菜单path
 * @param route route
 */
export const getSelectLeftMenuPath = (route: RoutesDataItem): string => {
  return route.selectLeftMenu || route.path;
};

/**
 * 获取当前路由对应的顶部菜单path
 * @param route route
 */
export const getRouteBelongTopMenu = (route: RoutesDataItem): string => {
  if (route.belongTopMenu) {
    return route.belongTopMenu;
  }
  return `/${route.path.split('/')[1]}`;
};

/**
 * 获取当前路由对应的顶部菜单path
 * @param pathname path
 * @param routes routes
 */
export const getRouteBelongTopMenuForRoutes = (
  pathname: string,
  routes: RoutesDataItem[],
): string => {
  const routeItem: RoutesDataItem = getRouteItem(pathname, routes);
  return getRouteBelongTopMenu(routeItem);
};

/**
 * 根据父path 设置当前项 path
 * @param pathname path
 * @param parentPath 父path - 默认 /
 * @param headStart 路由起始头 - 默认 /
 */
export const setRoutePathForParent = (
  pathname: string,
  parentPath: string = '/',
  headStart: string = '/',
): string => {
  if (isExternal(pathname)) {
    return pathname;
  }

  return pathname.substr(0, headStart.length) === headStart
    ? pathname
    : `${parentPath}/${pathname}`;
};

/**
 * 返回404路由
 */
export const getNotFoundRoute = (): RoutesDataItem => {
  return {
    hidden: true,
    title: '',
    path: '*',
    component: settings.notFoundComponent,
  };
};

/**
 * 格式化返回 umijs 路由, 主要处理特殊情况
 * @param routesData routes
 * @param parentPath 父path - 默认 /
 * @param headStart 路由起始头 - 默认 /
 */
export const umiRoutes = (
  routesData: RoutesDataItem[],
  parentPath: string = '/',
  headStart: string = '/',
): RoutesDataItem[] => {
  return routesData.map(item => {
    const { redirect, routes, ...other } = item;
    const itemRoutes = routes || [];
    const newItem: RoutesDataItem = { ...other };
    newItem.path = setRoutePathForParent(newItem.path, parentPath, headStart);

    /**
     * 处理跳转[redirect]
     * 因为 react 路由 如果父级有 redirect 后，子集路由不再好使
     * 这里把处理成有效
     */
    if (item.redirect && item.routes) {
      newItem.routes = [
        ...umiRoutes(itemRoutes, newItem.path, headStart),
        {
          hidden: true,
          title: newItem.title,
          path: newItem.path,
          redirect: item.redirect,
        },
        getNotFoundRoute(),
      ];
    } else if (item.redirect && !item.routes) {
      newItem.redirect = redirect;
    } else if (!item.redirect && item.routes) {
      newItem.routes = [
        ...umiRoutes(itemRoutes, newItem.path, headStart),
        getNotFoundRoute(),
      ];
    } /*  else {

    } */

    return newItem;
  });
};

/**
 * 根据 自定义传入权限名 判断当前用户是否有权限
 * @param userRoles 用户的权限
 * @param role 自定义权限名
 */
export const hasPermissionRouteRoles = (
  userRoles: string[],
  role: string,
): boolean => {
  if (userRoles.includes('admin')) {
    return true;
  }

  return userRoles.includes(role);
};

/**
 * 根据 route.roles 判断当前用户是否有权限
 * @param roles 用户的权限
 * @param route 当前路由
 */
export const hasPermission = (
  roles: string[],
  route: RoutesDataItem,
): boolean => {
  if (roles.includes('admin')) {
    return true;
  }

  if (route.roles) {
    return route.roles.some(role => roles.includes(role));
    //return roles.some(role => route.roles?.includes(role));
  }

  return true;
};

/**
 * 根据用户权限 获取 对应权限菜单
 * @param roles 用户的权限
 * @param routes 框架对应路由
 */
export const getPermissionMenuData = (
  roles: string[],
  routes: RoutesDataItem[],
): RoutesDataItem[] => {
  const menu: RoutesDataItem[] = [];
  for (let index = 0, len = routes.length; index < len; index += 1) {
    const element = routes[index];
    if (hasPermission(roles, element)) {
      if (element.routes) {
        element.routes = getPermissionMenuData(roles, element.routes);
      }
      menu.push(element);
    }
  }

  return menu;
};
