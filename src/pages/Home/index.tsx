import { Suspense, lazy } from 'react';
import { Col, Row } from 'antd';

import PageLoading from '@/components/PageLoading';

const ArticleChartCard = lazy(() => import('./components/ArticleChartCard'));
const WorksChartCard = lazy(() => import('./components/WorksChartCard'));
const TopicsChartCard = lazy(() => import('./components/TopicsChartCard'));
const LinksChartCard = lazy(() => import('./components/LinksChartCard'));

const HotSearchCard = lazy(() => import('./components/HotSearchCard'));
const HotTagsCard = lazy(() => import('./components/HotTagsCard'));
const ArticleHitCard = lazy(() => import('./components/ArticleHitCard'));
const WorksHitCard = lazy(() => import('./components/WorksHitCard'));

const ChartColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
};

const TableColProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
};

function App() {
  return (
    <div className='layout-main-conent'>
      <Row gutter={24}>
        <Col {...ChartColProps}>
          <Suspense fallback={<PageLoading />}>
            <ArticleChartCard />
          </Suspense>
        </Col>
        <Col {...ChartColProps}>
          <Suspense fallback={<PageLoading />}>
            <WorksChartCard />
          </Suspense>
        </Col>
        <Col {...ChartColProps}>
          <Suspense fallback={<PageLoading />}>
            <TopicsChartCard />
          </Suspense>
        </Col>
        <Col {...ChartColProps}>
          <Suspense fallback={<PageLoading />}>
            <LinksChartCard />
          </Suspense>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...TableColProps}>
          <Suspense fallback={<PageLoading />}>
            <HotSearchCard />
          </Suspense>
        </Col>
        <Col {...TableColProps}>
          <Suspense fallback={<PageLoading />}>
            <HotTagsCard />
          </Suspense>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...TableColProps}>
          <Suspense fallback={<PageLoading />}>
            <ArticleHitCard />
          </Suspense>
        </Col>
        <Col {...TableColProps}>
          <Suspense fallback={<PageLoading />}>
            <WorksHitCard />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
}

export default App;
