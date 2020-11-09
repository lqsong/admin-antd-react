import React, { useRef, useEffect } from 'react';
import { connect, Dispatch, useIntl } from 'umi';
import { Spin, Card, Tag, Divider, Row, Col } from 'antd';
import { EChartOption } from 'echarts';
import useEcharts from '@/hooks/useEcharts';
import { StateType } from '../../model';
import { TopicsChartDataType } from '../../data.d';

import styles from '../../style.less';

const topicsChartOption: EChartOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
  },
  xAxis: {
    show: false,
    data: [
      /* '03-01','03-02','03-03','03-04','03-05','03-06','03-07','03-08','03-09','03-10','03-11','03-12','03-13','03-15','03-15','03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30' */
    ],
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: '新增',
      type: 'line',
      data: [
        /* 23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85 */
      ],
      lineStyle: {
        width: 3,
        color: {
          type: 'linear',
          colorStops: [
            {
              offset: 0,
              color: '#A9F387', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#48D8BF', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        } as any,
        shadowColor: 'rgba(72,216,191, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        borderWidth: 6,
        borderColor: '#A9F387',
      },
      smooth: true,
    },
  ],
};

interface TopicsChartCardProps {
  loading: boolean;
  visitData: TopicsChartDataType;
  dispatch: Dispatch;
}

const TopicsChartCard: React.FC<TopicsChartCardProps> = props => {
  const { loading, visitData, dispatch } = props;
  const { total, num, chart } = visitData;

  const { formatMessage } = useIntl();

  const topicsChartRef = useRef<HTMLDivElement>(null);

  const echarts = useEcharts(topicsChartRef, topicsChartOption);

  useEffect(() => {
    dispatch({ type: 'Home/queryTopicsChartData' });
  }, [1]);

  useEffect(() => {
    if (echarts) {
      const option: EChartOption = {
        xAxis: {
          // data: ["03-01", "03-01", "03-01", "03-01", "03-01", "03-01", "03-01"]
          data: chart.day,
        },
        series: [
          {
            name: '新增',
            // data: [3, 1, 1, 2, 2, 2, 2]
            data: chart.num,
          },
        ],
      };
      echarts.setOption(option);
    }
  }, [echarts, chart]);

  return (
    <Spin spinning={loading} size="large">
      <Card
        className={styles.homeBoxCard}
        title={formatMessage({ id: 'page.home.topicschartcard.card-title' })}
        extra={
          <Tag color="warning">
            {formatMessage({ id: 'page.home.text-month' })}
          </Tag>
        }
      >
        <div className={styles.num}>{num?.toLocaleString()}</div>
        <div className={styles.height40} ref={topicsChartRef} />
        <Divider />
        <Row>
          <Col span={12}>{formatMessage({ id: 'page.home.text-total' })}</Col>
          <Col className="text-align-right" span={12}>
            {total?.toLocaleString()}
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
    loading: loading.effects['Home/queryTopicsChartData'],
    visitData: Home.topicsChartData,
  }),
)(TopicsChartCard);
