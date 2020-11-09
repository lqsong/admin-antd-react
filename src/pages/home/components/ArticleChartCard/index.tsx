import React, { useEffect } from 'react';
import { connect, useIntl, Dispatch } from 'umi';

import { Spin, Card, Divider, Row, Col, Tag } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import styles from '../../style.less';

import { StateType } from '../../model';
import { ArticleChartDataType } from '../../data.d';

interface ArticleChartCardProps {
  loading: boolean;
  visitData: ArticleChartDataType;
  dispatch: Dispatch;
}

const ArticleChartCard: React.FC<ArticleChartCardProps> = props => {
  const { formatMessage } = useIntl();

  const { loading, visitData, dispatch } = props;
  const { total, num, week, day } = visitData;

  useEffect(() => {
    dispatch({ type: 'Home/queryArticleChartData' });
  }, [1]);

  return (
    <Spin spinning={loading} size="large">
      <Card
        className={styles.homeBoxCard}
        title={formatMessage({ id: 'page.home.articlechartcard.card-title' })}
        extra={
          <Tag color="cyan">{formatMessage({ id: 'page.home.text-day' })}</Tag>
        }
      >
        <div className={styles.num}>{num.toLocaleString()}</div>
        <div className={styles.height40}>
          <div className={styles.articleText}>
            <span>
              {formatMessage({ id: 'page.home.text-daycompare' })}{' '}
              {Math.abs(day)}%
              {day > 0 ? (
                <CaretUpOutlined className={styles.colored4014} />
              ) : (
                <CaretDownOutlined className={styles.color19be6b} />
              )}
            </span>
            <span className="margin-l10">
              {formatMessage({ id: 'page.home.text-weekcompare' })}{' '}
              {Math.abs(week)}%
              {week > 0 ? (
                <CaretUpOutlined className={styles.colored4014} />
              ) : (
                <CaretDownOutlined className={styles.color19be6b} />
              )}
            </span>
          </div>
        </div>
        <Divider />
        <Row>
          <Col span={12}>{formatMessage({ id: 'page.home.text-total' })}</Col>
          <Col className="text-align-right" span={12}>
            {total.toLocaleString()}
          </Col>
        </Row>
      </Card>
    </Spin>
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
    loading: loading.effects['Home/queryArticleChartData'],
    visitData: Home.articleChartData,
  }),
)(ArticleChartCard);
