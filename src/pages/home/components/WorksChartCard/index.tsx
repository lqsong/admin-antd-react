import React, { useRef, useEffect } from 'react';
import { connect, useIntl, Dispatch } from 'umi';
import { Spin, Card, Tag, Divider, Row, Col } from 'antd';
import { EChartOption } from 'echarts';
import useEcharts from '@/hooks/useEcharts';

import styles from '../../style.less';

import { StateType } from '../../model';
import { WorksChartDataType } from '../../data.d';

const worksChartOption: EChartOption = {
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
    boundaryGap: false,
    data: [
      /* '03-01','03-02','03-03','03-04','03-05','03-06','03-07' */
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
        /* 23,60,20,36,23,85,23 */
      ],
      areaStyle: {
        color: {
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
      },
      lineStyle: {
        width: 0,
      },
      itemStyle: {
        borderWidth: 2,
      },
    },
  ],
};

interface WorksChartCardProps {
  loading: boolean;
  visitData: WorksChartDataType;
  dispatch: Dispatch;
}

const WorksChartCard: React.FC<WorksChartCardProps> = props => {
  const { loading, visitData, dispatch } = props;
  const { total, num, chart } = visitData;

  const { formatMessage } = useIntl();

  const worksChartRef = useRef<HTMLDivElement>(null);

  const echarts = useEcharts(worksChartRef, worksChartOption);

  useEffect(() => {
    dispatch({ type: 'Home/queryWorksChartData' });
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
        title={formatMessage({ id: 'page.home.workschartcard.card-title' })}
        extra={
          <Tag color="success">
            {formatMessage({ id: 'page.home.text-week' })}
          </Tag>
        }
      >
        <div className={styles.num}>{num?.toLocaleString()}</div>
        <div className={styles.height40} ref={worksChartRef} />
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
    loading: loading.effects['Home/queryWorksChartData'],
    visitData: Home.worksChartData,
  }),
)(WorksChartCard);
