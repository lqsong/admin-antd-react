import React, { useEffect, useRef, useState } from 'react';
import { Table, Pagination } from 'antd';
import { TableProps } from 'antd/lib/table';
import debounce from 'lodash.debounce';

import styles from './style.less';

interface ScreenTableProps
  extends Omit<TableProps<any>, 'footer' | 'showHeader' | 'summary'> {
  header?: React.ReactNode;
}

const ScreenTable: React.FC<ScreenTableProps> = props => {
  const { header, pagination, className, ...table } = props;

  const conentRef = useRef<HTMLDivElement>(null);
  const [tableScrollY, setTableScrollY] = useState<number>(0);

  const resizeHandler = debounce(() => {
    if (conentRef.current) {
      setTableScrollY(
        conentRef.current.offsetHeight -
          conentRef.current.getElementsByClassName('ant-table-header')[0]
            .clientHeight -
          2,
      );
    }
  }, 100);

  useEffect(() => {
    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [1]);

  useEffect(() => {
    if (conentRef.current) {
      conentRef.current.getElementsByClassName(
        'ant-table-body',
      )[0].scrollTop = 0;
    }
  }, [table.dataSource]);

  return (
    <div className={`${styles['main-conent-screen']} ${className}`}>
      {header ? (
        <div className={`${styles['screen-header']}`}>{header}</div>
      ) : (
        <div className={styles['screen-padding']} />
      )}

      <div className={`${styles['screen-conent']}`} ref={conentRef}>
        <Table
          {...table}
          scroll={{ scrollToFirstRowOnChange: true, y: tableScrollY }}
          pagination={false}
        />
      </div>

      {pagination ? (
        <div className={`${styles['screen-footer']}`}>
          {' '}
          <Pagination {...pagination} />{' '}
        </div>
      ) : (
        <div className={styles['screen-padding']} />
      )}
    </div>
  );
};

export default ScreenTable;
