export type I18nKey = 'zh-CN' | 'zh-TW' | 'en-US';

export interface I18nVal {
  [key: string]: string;
}

export type I18n = {
  [key in I18nKey]?: I18nVal;
};
