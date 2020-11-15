import React from 'react';
import { Card, Alert, List } from 'antd';

interface IconFontPageProps {}

const IconFontPage: React.FC<IconFontPageProps> = () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Alert
          message="使用此组件需要配置 ‘@/config/settings.ts’ 中 ‘iconfontUrl’ 参数。"
          type="warning"
        />
        <List header={<h2>说明：</h2>}>
          <List.Item>
            组件位置： @/components/IconFont，此组件基于{' '}
            <a
              href="https://ant.design/components/icon-cn/#components-icon-demo-scriptUrl"
              target="_blank"
            >
              @ant-design/icons
            </a>{' '}
            封装
          </List.Item>
          <List.Item>
            创建原因：方便统一管理使用 iconfont.cn 上 js
            资源图标，不需要每次使用时都 ‘createFromIconfontCN’。{' '}
          </List.Item>
        </List>
        <List header={<h3>使用方法：</h3>}>
          <List.Item>1、iconfont.cn 上生成 js 资源。</List.Item>
          <List.Item>
            2、@/config/settings.ts 文件中配置 iconfont.cn 生成的js文件地址。
          </List.Item>
          <List.Item>
            3、使用Demo：
            <a
              href="https://ant.design/components/icon-cn/#自定义-font-图标"
              target="_blank"
            >
              @ant-design/icons 自定义 font 图标 文档
            </a>
          </List.Item>
          <List.Item>import IconFont from '@/components/IconFont';</List.Item>
          <List.Item>
            &lt;IconFont type="iconfont图标名称" className="" style=""/&gt;
          </List.Item>
        </List>
      </Card>
    </div>
  );
};

export default IconFontPage;
