import React, { useRef, useState, useMemo } from 'react';
import { Spin, Card, Tag, Divider, Row, Col } from 'antd';
import useEcharts, { EChartsOption } from '@/hooks/useEcharts';

import { useRecoilValue } from 'recoil';
import { useI18n } from '@/store/i18n';
import locales from '../../locales';

import styles from '../../index.module.less';
import { LinksChartDataType } from './data';
import { ResponseData } from '@/utils/request';
import { annualnewLinks } from './service';

const linksChartOption: EChartsOption = {
  tooltip: {},
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
      itemStyle: {
        color: '#48D8BF',
      },
    },
  ],
};

const WorksChartCard: React.FC = () => {
  const t = useRecoilValue(useI18n(locales));
  const [loading, setLoading] = useState<boolean>(false);
  const [visitData, setVisitData] = useState<LinksChartDataType>({
    total: 0,
    num: 0,
    chart: {
      day: [],
      num: [],
    },
  });

  const total = useMemo(() => visitData.total, [visitData]);
  const num = useMemo(() => visitData.num, [visitData]);

  const linksChartRef = useRef<HTMLDivElement>(null);

  useEcharts(linksChartRef, linksChartOption, async (chart) => {
    setLoading(true);
    try {
      const response: ResponseData<LinksChartDataType> = await annualnewLinks();
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
        title={t('page.home.linkschartcard.card-title')}
        extra={<Tag color='error'>{t('page.home.text-years')}</Tag>}
      >
        <div className={styles.num}>{num?.toLocaleString()}</div>
        <div className={styles.height40} ref={linksChartRef} />
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
