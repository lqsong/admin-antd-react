import React from 'react';
import { Breadcrumb } from 'antd';
import { RoutesDataItem } from '@/utils/routes';

import ALink from '@/components/ALink';

export interface BreadCrumbsProps {
  list?: RoutesDataItem[];
  style?: React.CSSProperties;
  className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = props => {
  const { list = [], ...attr } = props;

  return (
    <Breadcrumb {...attr}>
      {list.map(item => {
        return (
          <Breadcrumb.Item key={item.path}>
            <ALink to={item.path}>{item.title}</ALink>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
