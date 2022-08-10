import React from 'react';
import classnames from 'classnames';
import style from './index.module.less';

export interface FooterToolbarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const FooterToolbar: React.FC<FooterToolbarProps> = (props) => {
  const { children, className, ...attr } = props;

  return (
    <div className={classnames(style['form-footer-toolbar'], className)} {...attr}>
      {children}
    </div>
  );
};

export default FooterToolbar;
