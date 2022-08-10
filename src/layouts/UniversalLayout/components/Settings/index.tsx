import { memo } from 'react';
import { Popover, Divider, Switch } from 'antd';
import classnames from 'classnames';

import { useRecoilState } from 'recoil';
import { globalState } from '@/store/global';

import IconSvg from '@/components/IconSvg';

import { Theme, NavMode } from '@/@types/settings';

import style from './index.module.less';

export default memo(() => {
  const [global, setGlobal] = useRecoilState(globalState);

  // 模板主题
  const setTheme = (theme: Theme) => {
    setGlobal({ ...global, theme });
  };

  // 导航模式
  const setNavMode = (navMode: NavMode) => {
    setGlobal({ ...global, navMode });
  };

  // 固定头部
  const onChangeHeadFixed = () => {
    setGlobal({ ...global, headFixed: !global.headFixed });
  };

  // tabNavEnable
  const onChangeTabNavEnable = () => {
    setGlobal({ ...global, tabNavEnable: !global.tabNavEnable });
  };

  // 固定左侧
  const onChangeLeftSiderFixed = () => {
    setGlobal({ ...global, leftSiderFixed: !global.leftSiderFixed });
  };
  return (
    <Popover
      content={
        <div className={style.setting}>
          <div className={style['setting-title']}>页面风格</div>

          <div className={style['setting-radio']}>
            <div
              className={classnames(style['setting-radio-item'], style['style-dark'])}
              title='dark'
              onClick={() => {
                setTheme('dark');
              }}
            >
              {global.theme === 'dark' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
            <div
              className={classnames(style['setting-radio-item'], style['style-light'])}
              title='light'
              onClick={() => {
                setTheme('light');
              }}
            >
              {global.theme === 'light' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
          </div>

          <Divider style={{ margin: '10px 0' }} />

          <div className={style['setting-title']}>导航模式</div>
          <div className={style['setting-radio']}>
            <div
              className={classnames(style['setting-radio-item'], style['nav-inline'])}
              title='inline'
              onClick={() => {
                setNavMode('inline');
              }}
            >
              {global.navMode === 'inline' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
            <div
              className={classnames(style['setting-radio-item'], style['nav-horizontal'])}
              title='horizontal'
              onClick={() => {
                setNavMode('horizontal');
              }}
            >
              {global.navMode === 'horizontal' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
          </div>

          <Divider style={{ margin: '10px 0' }} />

          <div className={style['setting-list']}>
            <div className={style['setting-list-item']}>
              <span>固定头部</span>
              <span className={style['setting-list-item-action']}>
                <Switch
                  checkedChildren='开启'
                  unCheckedChildren='关闭'
                  checked={global.headFixed}
                  onChange={onChangeHeadFixed}
                />
              </span>
            </div>
            <div className={style['setting-list-item']}>
              <span>TabNav</span>
              <span className={style['setting-list-item-action']}>
                <Switch
                  checkedChildren='开启'
                  unCheckedChildren='关闭'
                  checked={global.tabNavEnable}
                  onChange={onChangeTabNavEnable}
                />
              </span>
            </div>
            <div className={style['setting-list-item']}>
              <span>固定侧边</span>
              <span className={style['setting-list-item-action']}>
                <Switch
                  checkedChildren='开启'
                  unCheckedChildren='关闭'
                  checked={global.leftSiderFixed}
                  onChange={onChangeLeftSiderFixed}
                />
              </span>
            </div>
          </div>
        </div>
      }
      trigger='hover'
      placement='bottomRight'
    >
      <span className='universallayout-top-settings'>
        <IconSvg name='theme' />
      </span>
    </Popover>
  );
});
