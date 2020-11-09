/**
 * IconAntd 基于 @ant-design/icons 字体全部导入封装
 * @author LiQingSong
 * 使用说明：
 *   1、此组件只是为了方便IndexLayout菜单引用开发的组件
 *   2、缺点：导入了所有字体图片，生成后文件过大，建议优先使用 IconFont 、IconSvg 组件。
 *   3、使用Demo：
 *      import IconAntd from '@/components/IconAntd';
 *      <IconAntd type="SmileTwoTone" spin/>
 *      参数文档：https://ant.design/components/icon-cn/#API
 */
import React from 'react';
import * as Icons from '@ant-design/icons';

export interface IconAntdProps {
  type: string;
  rotate?: number;
  spin?: boolean;
  twoToneColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconAntd: React.FC<IconAntdProps> = props => {
  const { type, ...attr } = props;

  return Icons[type] ? React.createElement(Icons[type], { ...attr }) : null;
};

export default IconAntd;
