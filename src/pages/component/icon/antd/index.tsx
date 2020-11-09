import React from 'react';
import { Card, Alert, List } from 'antd';

interface IconAntdPageProps {}

const IconAntdPage: React.FC<IconAntdPageProps> = () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Alert
          message={
            <div>
              注意：此组件不建议使用，此组件存在的原因只是为了做一个演示和样例。
              <br />
              缺点：导入了所有 ‘@ant-design/icons’
              字体图标，生成后文件过大，建议优先使用 IconFont 、IconSvg 组件。
            </div>
          }
          type="error"
        />
        <List header={<h2>说明：</h2>}>
          <List.Item>
            组件位置： @/components/IconAntd，此组件基于{' '}
            <a href="https://ant.design/components/icon-cn/" target="_blank">
              @ant-design/icons
            </a>{' '}
            封装，导入了所有的字体图标。
          </List.Item>
          <List.Item>
            创建原因：此组件只是为了方便IndexLayout菜单中的Icon多一种选择，可以引用
            ‘@ant-design/icons’ 并可自定义设置，开发的组件，但是
            <strong>不建议使用</strong>。{' '}
          </List.Item>
        </List>
        <List header={<h3>使用方法：</h3>}>
          <List.Item>
            1、
            <a href="https://ant.design/components/icon-cn/" target="_blank">
              @ant-design/icons 的所有图标
            </a>
            。
          </List.Item>
          <List.Item>
            2、使用Demo：
            <a
              href="https://ant.design/components/icon-cn/#API"
              target="_blank"
            >
              参数文档
            </a>
          </List.Item>
          <List.Item>import IconAntd from '@/components/IconAntd';</List.Item>
          <List.Item>&lt;IconAntd type="SmileTwoTone" spin /&gt;</List.Item>
        </List>
      </Card>
    </div>
  );
};

export default IconAntdPage;
