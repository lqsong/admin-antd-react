/**
 * 去除两端空格
 * @author LiQingSong
 */
export const trim = (val: string): string => {
  return val.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 去除左边空格
 * @author LiQingSong
 */
export const ltrim = (val: string): string => {
  return val.replace(/(^\s*)/g, '');
};

/**
 * 去除右边边空格
 * @author LiQingSong
 */
export const rtrim = (val: string): string => {
  return val.replace(/(\s*$)/g, '');
};

/**
 * 去除两端 ,
 * @author LiQingSong
 */
export const trimComma = (val: string): string => {
  return val.replace(/(^,*)|(,*$)/g, '');
};

/**
 * 去除两端 |
 * @author LiQingSong
 */
export const trimVerticalBar = (val: string): string => {
  return val.replace(/(^\|*)|(\|*$)/g, '');
};
