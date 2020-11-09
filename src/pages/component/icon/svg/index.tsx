import React from 'react';
import { useIntl } from 'umi';
import { Card, Divider, Popover, List, Tag } from 'antd';
import IconSvg from '@/components/IconSvg';

import styles from './style.less';

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys();
const svgIcons = requireAll(
  require.context('../../../../assets/iconsvg', false, /\.svg$/),
).map(i => {
  const item = i.match(/\.\/(.*)\.svg/);
  return item && item[1];
});

interface IconSvgPageProps {}

const IconSvgPage: React.FC<IconSvgPageProps> = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <div>
          {svgIcons.map(item => {
            return (
              <div className={styles.list} key={item}>
                <Popover content={'<IconSvg type="' + item + '" />'}>
                  <div>
                    <IconSvg
                      type={item as string}
                      style={{ fontSize: '30px' }}
                    />
                    <span>{item}</span>
                  </div>
                </Popover>
              </div>
            );
          })}
        </div>
        <Divider />
        <List
          header={
            <h2>{formatMessage({ id: 'page.icon.svg.remark.title' })}</h2>
          }
        >
          <List.Item> 组件位置： @/components/IconSvg</List.Item>
          <List.Item> 创建原因：方便自定义使用svg图标 </List.Item>
        </List>
        <List header={<h3>使用方法：</h3>}>
          <List.Item>
            1、下载或制作svg文件，存放到 <Tag>/src/assets/iconsvg</Tag>
            目录下，自己可以对此目录下svg进行删减。
          </List.Item>
          <List.Item>
            2、项目会根据 <Tag>/src/assets/iconsvg/svgo.yml</Tag>
            配置自动压缩精简svg，也可以独立运行 <Tag>yarn svgo</Tag> 或{' '}
            <Tag>npm run svgo</Tag>压缩精简svg
          </List.Item>
          <List.Item>3、使用Demo：</List.Item>
          <List.Item>import IconSvg from '@/components/IconSvg';</List.Item>
          <List.Item>
            &lt;IconSvg type="svg文件名" className="" style=""/&gt;
          </List.Item>
        </List>
      </Card>
    </div>
  );
};

export default IconSvgPage;
