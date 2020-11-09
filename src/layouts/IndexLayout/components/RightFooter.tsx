import React from 'react';

import styles from '../style.less';

export interface RightFooterProps {}

const RightFooter: React.FC<RightFooterProps> = () => {
  return (
    <div className={styles['indexlayout-right-footer']}>
      <div className={styles['footer-links']}>
        <a
          href="http://demo.admin-antd-react.liqingsong.cc"
          target="_blank"
          rel="noreferrer"
        >
          DEMO
        </a>
        <a
          href="https://github.com/lqsong/admin-antd-react"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a href="http://liqingsong.cc" target="_blank" rel="noreferrer">
          博客
        </a>
        <a href="http://www.wyxgn.com" target="_blank" rel="noreferrer">
          网页小功能
        </a>
      </div>
      <div>Copyright © 2020 LIQINGSONG.CC, All Rights Reserved</div>
    </div>
  );
};

export default RightFooter;
