import React, { useRef, useState, useMemo } from 'react';
import { Spin, Card, Tag, Divider, Row, Col } from 'antd';
import useEcharts, { EChartsOption } from '@/hooks/useEcharts';

import { useRecoilValue } from 'recoil';
import { useI18n } from '@/store/i18n';
import locales from '../../locales';

import styles from '../../index.module.less';
import { WorksChartDataType } from './data';
import { ResponseData } from '@/utils/request';
import { weeknewWorks } from './service';

const worksChartOption: EChartsOption = {
  tooltip: {},
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
      // '03-01','03-02','03-03','03-04','03-05','03-06','03-07'
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
        // 23,60,20,36,23,85,23
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
        color: '#48D8BF',
      },
    },
  ],
};

const WorksChartCard: React.FC = () => {
  const t = useRecoilValue(useI18n(locales));
  const [loading, setLoading] = useState<boolean>(false);
  const [visitData, setVisitData] = useState<WorksChartDataType>({
    total: 0,
    num: 0,
    chart: {
      day: [],
      num: [],
    },
  });

  const total = useMemo(() => visitData.total, [visitData]);
  const num = useMemo(() => visitData.num, [visitData]);

  const worksChartRef = useRef<HTMLDivElement>(null);

  useEcharts(worksChartRef, worksChartOption, async (chart) => {
    setLoading(true);
    try {
      const response: ResponseData<WorksChartDataType> = await weeknewWorks();
      const { data } = response;
      const vData = {
        total: data?.total || 0,
        num: data?.num || 0,
        chart: data?.chart || {
          day: [],
          num: [],
        },
      };
      setVisitData(vData);

      const option: EChartsOption = {
        xAxis: {
          data: vData.chart.day,
        },
        series: [
          {
            name: '新增',
            data: vData.chart.num,
          },
        ],
      };
      chart.setOption(option);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  });

  return (
    <Spin spinning={loading} size='large'>
      <Card
        className={styles.homeBoxCard}
        title={t('page.home.workschartcard.card-title')}
        extra={<Tag color='success'>{t('page.home.text-week')}</Tag>}
      >
        <div className={styles.num}>{num?.toLocaleString()}</div>
        <div className={styles.height40} ref={worksChartRef} />
        <Divider />
        <Row>
          <Col span={12}>{t('page.home.text-total')}</Col>
          <Col className='text-align-right' span={12}>
            {total?.toLocaleString()}
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default WorksChartCard;
