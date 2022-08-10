import { memo, useCallback, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { useRecoilState } from 'recoil';
import { i18nLocaleState } from '@/store/i18n';
import { setLocale } from '@/utils/i18n';

import IconSvg from '@/components/IconSvg';

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { I18nKey } from '@/@types/i18n.d';

export interface SelectLangProps {
  className?: string;
}

export default memo(({ className }: SelectLangProps) => {
  const [i18nLocale, setI18nLocale] = useRecoilState(i18nLocaleState);

  const menuItems = useMemo<ItemType[]>(
    () => [
      {
        key: 'zh-CN',
        label: <> 简体中文</>,
        icon: <>🇨🇳 </>,
        disabled: i18nLocale === 'zh-CN',
      },
      {
        key: 'zh-TW',
        label: <> 繁体中文</>,
        icon: <>🇭🇰 </>,
        disabled: i18nLocale === 'zh-TW',
      },
      {
        key: 'en-US',
        label: <> English</>,
        icon: <>🇺🇸 </>,
        disabled: i18nLocale === 'en-US',
      },
    ],
    [i18nLocale],
  );

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      const lang = key as I18nKey;
      setI18nLocale(lang);
      setLocale(lang);
    },
    [i18nLocale, setI18nLocale],
  );
  return (
    <Dropdown className={className} overlay={<Menu onClick={onMenuClick} items={menuItems} />}>
      <span>
        <IconSvg name='language-outline' />
      </span>
    </Dropdown>
  );
});
