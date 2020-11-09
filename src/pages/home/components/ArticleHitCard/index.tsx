import React, { useEffect } from 'react';
import { connect, Dispatch, useIntl } from 'umi';
import { Card, Table } from 'antd';

import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

import { StateType } from '../../model';
import { ArticleHitDataType } from '../../data.d';

import { TableListItem } from './data.d';

import styles from '../../style.less';

interface ArticleHitCardProps {
  loading: boolean;
  visitData: ArticleHitDataType;
  dispatch: Dispatch;
}

const ArticleHitCard: React.FC<ArticleHitCardProps> = props => {
  const { loading, visitData, dispatch } = props;
  const { list, pagination } = visitData;

  const { formatMessage } = useIntl();

  const getList = (current: number): void => {
    dispatch({
      type: 'Home/queryArticleHitData',
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
        id: 'page.home.articlehitcard.card.table-column-number',
      }),
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => (
        <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
      ),
    },
    {
      title: formatMessage({
        id: 'page.home.articlehitcard.card.table-column-title',
      }),
      dataIndex: 'title',
    },
    {
      title: formatMessage({
        id: 'page.home.articlehitcard.card.table-column-hit',
      }),
      dataIndex: 'hit',
    },
  ];

  return (
    <Card
      className={styles.homeBoxCard}
      title={formatMessage({ id: 'page.home.articlehitcard.card-title' })}
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
    loading: loading.effects['Home/queryArticleHitData'],
    visitData: Home.articleHitData,
  }),
)(ArticleHitCard);
