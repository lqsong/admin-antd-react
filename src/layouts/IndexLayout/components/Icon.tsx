/**
 * IndexLayout icon , 主要用于菜单
 * @author LiQingSong
 * 使用说明：
 *   >>> 在这里可以对以下三种字体图标进行引入替换，达到 IndexLayout icon 统一效果：
 *     import Icons from '@/components/IconSvg';
 *     import Icons from '@/components/IconFont';
 *     import Icons from '@/components/IconAntd';
 */
import React from 'react';
import Icons from '@/components/IconSvg';

export interface IconProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const Icon: React.FC<IconProps> = props => {
  return <Icons {...props} />;
};

export default Icon;
