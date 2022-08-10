import React from 'react';
import { Link } from 'react-router-dom';

import { isExternal } from '@/utils/validate';

export interface ALinkProps {
  children: React.ReactNode;
  to: any;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
  style?: React.CSSProperties;
  className?: string;
}

const ALink: React.FC<ALinkProps> = (props) => {
  const { children, to, ...attr } = props;

  return isExternal(to) ? (
    <a href={to} {...attr} target='_blank' rel='noreferrer'>
      {children}
    </a>
  ) : (
    <Link to={to} {...attr}>
      {children}
    </Link>
  );
};

export default ALink;
