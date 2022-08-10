import { Card } from 'antd';
import { useRecoilValue } from 'recoil';
import { useI18n } from '@/store/i18n';
import locales from './locales';

function App() {
  const t = useRecoilValue(useI18n(locales));
  return (
    <div className='layout-main-conent'>
      <Card>
        <span style={{ fontSize: '35px', color: '#FF0000' }}>↑</span>
        {t('page.custom-breadcrumbs.msg')}
      </Card>
    </div>
  );
}

export default App;
