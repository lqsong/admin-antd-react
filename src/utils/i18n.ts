import { I18nKey } from '@/@types/i18n.d';

// window.localStorage 存储key
export const localeKey = 'locale';

// 默认语言
export const defaultLang: I18nKey = 'zh-CN';

/**
 * 验证语言命名规则 zh-CN
 * @returns boolen
 * @author LiQingSong
 */
export const localeNameExp = (lang: string): boolean => {
  const localeExp = /^([a-z]{2})-?([A-Z]{2})?$/;
  return localeExp.test(lang);
};

/**
 * 设置 html lang 属性值
 * @param lang 语言的 I18nKey
 * @author LiQingSong
 */
export const setHtmlLang = (lang: I18nKey) => {
  /**
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  const htmlSelector = document.querySelector('html');
  if (htmlSelector) {
    htmlSelector.setAttribute('lang', lang);
  }
};

/**
 * 获取当前选择的语言
 * @returns string
 * @author LiQingSong
 */
export const getLocale = (): I18nKey => {
  const lang = typeof window.localStorage !== 'undefined' ? window.localStorage.getItem(localeKey) : '';
  const isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  const browserLang = isNavigatorLanguageValid ? navigator.language.split('-').join('-') : '';
  return (lang || browserLang || defaultLang) as I18nKey;
};

/**
 * 切换语言
 * @param lang 语言的 I18nKey
 * @param realReload 是否刷新页面，默认刷新
 * @author LiQingSong
 */
export const setLocale = (lang: I18nKey, realReload?: boolean, callback?: Function) => {
  if (lang !== undefined && !localeNameExp(lang)) {
    // for reset when lang === undefined
    throw new Error('setLocale lang format error');
  }
  if (getLocale() !== lang) {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(localeKey, lang || '');
    }

    if (realReload === true) {
      window.location.reload();
    } else {
      setHtmlLang(lang);

      if (typeof callback === 'function') {
        callback();
      }
    }
  }
};
