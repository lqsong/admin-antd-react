/**
 * 站点配置
 * @author LiQingSong
 */
import { SettingsType } from '@/@types/settings.d';

const settings: SettingsType = {
  siteTitle: 'ADMIN-ANTD-REACT',

  siteTokenKey: 'admin_antd_react_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // 用户登录
    '/user/info', // 获取用户信息
  ],

  /* 以下是针对所有 Layout 扩展字段 */
  headFixed: true,
  theme: 'dark',
  leftSiderFixed: true,

  /* 以下是针对 UniversalLayout 扩展字段 */
  tabNavEnable: true,
  tabNavHomePath: '/home/workplace',
  navMode: 'inline',
};

export default settings;
