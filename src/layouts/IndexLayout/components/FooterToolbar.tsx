import React from 'react';
import { connect } from 'umi';

import { GlobalModelState } from '@/models/global';

import styles from '../style.less';

interface FooterToolbarProps {
  collapsed: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FooterToolbar: React.FC<FooterToolbarProps> = props => {
  const { collapsed, className, children } = props;

  let classNames = `${className || ''} ${styles['indexlayout-footer-toolbar']}`;
  if (collapsed) {
    classNames = `${className || ''} ${styles['indexlayout-footer-toolbar']} ${
      styles['narrow']
    }`;
  }

  return <div className={classNames}>{children}</div>;
};

export default connect(({ global }: { global: GlobalModelState }) => ({
  collapsed: global.collapsed,
}))(FooterToolbar);
