/**
 * 自定义 svg icon
 * @author LiQingSong
 * 使用说明：
 *   1、下载或制作svg文件，存放到/src/assets/iconsvg目录下
 *   2、项目根据/src/assets/iconsvg/svgo.yml配置自动压缩精简svg，也可以独立运行 npm run svgo 压缩精简svg
 *   3、使用Demo：
 *      import IconSvg from '@/components/IconSvg';
 *      <IconSvg type="svg文件名" className="" style=""/>
 */
import React from 'react';
import style from './style.less';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../../assets/iconsvg', false, /\.svg$/));
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}

export interface IconSvgProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconSvg: React.FC<IconSvgProps> = props => {
  const { type, className, ...attr } = props;

  return (
    <svg className={`${style['icon-svg']} ${className || ''}`} {...attr}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

export default IconSvg;
