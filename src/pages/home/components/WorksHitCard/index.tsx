import React, { useEffect } from 'react';
import { connect, Dispatch, useIntl } from 'umi';
import { Card, Table } from 'antd';

import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

import { StateType } from '../../model';
import { WorksHitDataType } from '../../data.d';

import { TableListItem } from './data.d';

import styles from '../../style.less';

interface WorksHitCardProps {
  loading: boolean;
  visitData: WorksHitDataType;
  dispatch: Dispatch;
}

const WorksHitCard: React.FC<WorksHitCardProps> = props => {
  const { loading, visitData, dispatch } = props;
  const { list, pagination } = visitData;

  const { formatMessage } = useIntl();

  const getList = (current: number): void => {
    dispatch({
      type: 'Home/queryWorksHitData',
      payload: {
        per: pagination.pageSize,
        page: current,
      },
    });
  };

  useEffect(() => {
    getList(1);
  }, [1]);

  const columns: ColumnsType<TableListItem> = [
    {
      title: formatMessage({
        id: 'page.home.workshitcard.card.table-column-number',
      }),
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => (
        <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
      ),
    },
    {
      title: formatMessage({
        id: 'page.home.workshitcard.card.table-column-title',
      }),
      dataIndex: 'title',
    },
    {
      title: formatMessage({
        id: 'page.home.workshitcard.card.table-column-hit',
      }),
      dataIndex: 'hit',
    },
  ];

  return (
    <Card
      className={styles.homeBoxCard}
      title={formatMessage({ id: 'page.home.workshitcard.card-title' })}
    >
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={pagination}
        onChange={(p: TablePaginationConfig) => {
          getList(p.current || 1);
        }}
      />
    </Card>
  );
};

export default connect(
  ({
    Home,
    loading,
  }: {
    Home: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['Home/queryWorksHitData'],
    visitData: Home.worksHitData,
  }),
)(WorksHitCard);
