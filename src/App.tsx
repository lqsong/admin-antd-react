import { memo, Suspense, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { useRecoilValue } from 'recoil';
import { antdMessageState, i18nLocaleState } from '@/store/i18n';
import { setHtmlLang } from '@/utils/i18n';
import PageLoading from '@/components/PageLoading';
import useRoutes from '@/config/routes';

export default memo(() => {
  const i18nLocale = useRecoilValue(i18nLocaleState);
  const antdMessage = useRecoilValue(antdMessageState);
  const element = useRoutes();

  useEffect(() => {
    setHtmlLang(i18nLocale);
  }, []);

  return (
    <ConfigProvider locale={antdMessage}>
      <Suspense fallback={<PageLoading />}>{element}</Suspense>
    </ConfigProvider>
  );
});
