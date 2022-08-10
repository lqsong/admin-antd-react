import React from 'react';
import { Breadcrumb } from 'antd';

import ALink from '@/components/ALink';

import { BreadcrumbType } from '@/@types/router';

export interface BreadCrumbsProps {
  list?: BreadcrumbType[];
  className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ list = [], ...attr }) => (
  <Breadcrumb {...attr}>
    {list.map((item) => (
      <Breadcrumb.Item key={item.path}>
        <ALink to={item.path}>{item.title}</ALink>
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

export default BreadCrumbs;
