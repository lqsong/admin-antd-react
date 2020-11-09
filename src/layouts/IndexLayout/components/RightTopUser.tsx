import React from 'react';
import { connect, useIntl, Dispatch } from 'umi';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { UserModelState, CurrentUser } from '@/models/user';
import styles from '../style.less';

interface RightTopUserProps {
  currentUser?: CurrentUser;
  dispatch: Dispatch;
}

const RightTopUser: React.FC<RightTopUserProps> = props => {
  const { currentUser, dispatch } = props;

  const { formatMessage } = useIntl();

  const onMenuClick = (event: MenuInfo) => {
    const { key } = event;

    if (key === 'logout') {
      dispatch({ type: 'user/logout' });
      return;
    }
  };

  const UserDropdownMenu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="userinfo">
        {formatMessage({ id: 'index-layout.topmenu.userinfo' })}
      </Menu.Item>
      <Menu.Item key="logout">
        {formatMessage({ id: 'index-layout.topmenu.logout' })}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={UserDropdownMenu}>
      <a
        className={`${styles['indexlayout-top-usermenu']} ant-dropdown-link`}
        onClick={e => e.preventDefault()}
      >
        {currentUser?.name} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(RightTopUser);
