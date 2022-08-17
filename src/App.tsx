import { memo, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { useRecoilValue } from 'recoil';
import { antdMessageState, i18nLocaleState } from '@/store/i18n';
import { setHtmlLang } from '@/utils/i18n';
import Routes from '@/config/routes';

export default memo(() => {
  const i18nLocale = useRecoilValue(i18nLocaleState);
  const antdMessage = useRecoilValue(antdMessageState);

  useEffect(() => {
    setHtmlLang(i18nLocale);
  }, []);

  return (
    <ConfigProvider locale={antdMessage}>
      <Routes />
    </ConfigProvider>
  );
});
