/**
 * IconFont 基于 @ant-design/icons 封装
 * @author LiQingSong
 * 使用说明：
 *   1、iconfont.cn 上生成 js 资源
 *   2、@/config/settings.ts 文件中配置 iconfont.cn 生成的js文件地址。
 *   3、使用Demo：
 *      import IconFont from '@/components/IconFont';
 *      <IconFont type="iconfont图标名称" className="" style=""/>
 */
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

import settings from '@/config/settings';

export interface IconFontProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconFontCN = createFromIconfontCN({
  scriptUrl: settings.iconfontUrl,
});

const IconFont: React.FC<IconFontProps> = props => {
  return <IconFontCN {...props} />;
};

export default IconFont;
