import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, initialState } from '@/store/user';
import { useI18n } from '@/store/i18n';
import locales from '../locales';

import { removeToken } from '@/utils/localToken';

import IconSvg from '@/components/IconSvg';

export default memo(() => {
  const t = useRecoilValue(useI18n(locales));
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'logout') {
        setUser({
          ...user,
          ...initialState,
        });
        removeToken();
        navigate('/user/login', {
          replace: true,
        });
      }
    },
    [user, setUser],
  );
  return (
    <Dropdown
      overlay={
        <Menu
          onClick={onMenuClick}
          items={[
            {
              key: 'userinfo',
              label: <>{t('universal-layout.topmenu.userinfo')}</>,
            },
            {
              key: 'logout',
              label: <>{t('universal-layout.topmenu.logout')}</>,
            },
          ]}
        />
      }
    >
      <a className='universallayout-top-usermenu ant-dropdown-link' onClick={(e) => e.preventDefault()}>
        {user.name}
        <IconSvg name='arrow-down' />
      </a>
    </Dropdown>
  );
});
