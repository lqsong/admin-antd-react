import style from './index.module.less';

export interface IIconSvgProps {
  name: string;
  prefix?: string;
  [x: string]: any;
}

export default function IconSvg({ name, prefix = 'icon', ...props }: IIconSvgProps) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden='true' className={style.svgIcon}>
      <use href={symbolId} />
    </svg>
  );
}
