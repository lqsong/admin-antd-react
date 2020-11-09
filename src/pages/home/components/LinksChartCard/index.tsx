import React, { useRef, useEffect } from 'react';
import { connect, Dispatch, useIntl } from 'umi';
import { Spin, Card, Tag, Divider, Row, Col } from 'antd';
import { EChartOption } from 'echarts';
import useEcharts from '@/hooks/useEcharts';

import { StateType } from '../../model';
import { LinksChartDataType } from '../../data.d';

import styles from '../../style.less';

const linksChartOption: EChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
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
      /* '2019-04', '2019-05', '2019-06','2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03' */
    ],
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: '新增',
      type: 'bar',
      data: [
        /* 5888, 3838, 15880, 12888, 18888, 16888,5888, 3838, 15880, 12888, 18888, 16888 */
      ],
    },
  ],
};

interface LinksChartCardPorps {
  loading: boolean;
  visitData: LinksChartDataType;
  dispatch: Dispatch;
}

const LinksChartCard: React.FC<LinksChartCardPorps> = props => {
  const { loading, visitData, dispatch } = props;
  const { total, num, chart } = visitData;

  const { formatMessage } = useIntl();

  const linksChartRef = useRef<HTMLDivElement>(null);

  const echarts = useEcharts(linksChartRef, linksChartOption);

  useEffect(() => {
    dispatch({ type: 'Home/queryLinksChartData' });
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
        title={formatMessage({ id: 'page.home.linkschartcard.card-title' })}
        extra={
          <Tag color="error">
            {formatMessage({ id: 'page.home.text-years' })}
          </Tag>
        }
      >
        <div className={styles.num}>{num?.toLocaleString()}</div>
        <div className={styles.height40} ref={linksChartRef} />
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
    loading: loading.effects['Home/queryLinksChartData'],
    visitData: Home.linksChartData,
  }),
)(LinksChartCard);
