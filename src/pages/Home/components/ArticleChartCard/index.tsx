import React, { useEffect, useState } from 'react';
import { Spin, Card, Divider, Row, Col, Tag } from 'antd';

import { useRecoilValue } from 'recoil';
import { useI18n } from '@/store/i18n';
import locales from '../../locales';

import IconSvg from '@/components/IconSvg';

import styles from '../../index.module.less';
import { ArticleChartDataType } from './data';
import { ResponseData } from '@/utils/request';
import { dailynewArticles } from './service';

const ArticleChartCard: React.FC = () => {
  const t = useRecoilValue(useI18n(locales));

  const [loading, setLoading] = useState<boolean>(false);
  const [visitData, setVisitData] = useState<ArticleChartDataType>({
    total: 0,
    num: 0,
    week: 0,
    day: 0,
  });

  const getData = async () => {
    setLoading(true);
    try {
      const response: ResponseData<ArticleChartDataType> = await dailynewArticles();
      const { data } = response;
      setVisitData({
        total: data?.total || 0,
        num: data?.num || 0,
        week: data?.week || 0,
        day: data?.day || 0,
      });
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Spin spinning={loading} size='large'>
      <Card
        className={styles.homeBoxCard}
        title={t('page.home.articlechartcard.card-title')}
        extra={<Tag color='cyan'>{t('page.home.text-day')}</Tag>}
      >
        <div className={styles.num}>{visitData.num.toLocaleString()}</div>
        <div className={styles.height40}>
          <div className={styles.articleText}>
            <span>
              {t('page.home.text-daycompare')} {Math.abs(visitData.day)}%
              {visitData.day > 0 ? (
                <span className={styles.colored4014}>
                  <IconSvg name='arrow-down' style={{ transform: 'rotate(180deg)' }} />
                </span>
              ) : (
                <span className={styles.color19be6b}>
                  <IconSvg name='arrow-down' />
                </span>
              )}
            </span>
            <span className='margin-l10'>
              {t('page.home.text-weekcompare')} {Math.abs(visitData.week)}%
              {visitData.week > 0 ? (
                <span className={styles.colored4014}>
                  <IconSvg name='arrow-down' style={{ transform: 'rotate(180deg)' }} />
                </span>
              ) : (
                <span className={styles.color19be6b}>
                  <IconSvg name='arrow-down' />
                </span>
              )}
            </span>
          </div>
        </div>
        <Divider />
        <Row>
          <Col span={12}>{t('page.home.text-total')}</Col>
          <Col className='text-align-right' span={12}>
            {visitData.total.toLocaleString()}
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default ArticleChartCard;
