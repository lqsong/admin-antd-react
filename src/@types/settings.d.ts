/**
 * 站点配置 ts定义
 * @author LiQingSong
 */

export type Theme = 'dark' | 'light';

export type NavMode = 'inline' | 'horizontal';

export interface SettingsType {
  /**
   * 站点名称
   */
  siteTitle: string;

  /**
   * 站点本地存储Token 的 Key值
   */
  siteTokenKey: string;

  /**
   * Ajax请求头发送Token 的 Key值
   */
  ajaxHeadersTokenKey: string;

  /**
   * Ajax返回值不参加统一验证的api地址
   */
  ajaxResponseNoVerifyUrl: string[];

  /**
   * Layout 头部固定开启
   */
  headFixed: boolean;

  /**
   * Layout 模板主题
   */
  theme: Theme;

  /**
   * Layout 左侧侧边固定开启
   */
  leftSiderFixed: boolean;

  /**
   * UniversalLayout tab菜单开启
   */
  tabNavEnable: boolean;

  /**
   * UniversalLayout tab菜单首页锁定的path
   */
  tabNavHomePath: string;

  /**
   * UniversalLayout 菜单导航模式
   */
  navMode: NavMode;
}
