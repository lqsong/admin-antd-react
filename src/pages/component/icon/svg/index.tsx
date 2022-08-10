import { Card, Divider, Popover, List, Tag } from 'antd';
import IconSvg from '@/components/IconSvg';
import styles from './index.module.less';

const svgIcons: any = [
  'home',
  'set',
  'user',
  'pwd',
  'permissions',
  'message',
  'tick',
  'theme',
  'refresh',
  'more',
  'language-outline',
  'icon',
  'editor',
  'edit',
  'detail',
  'control',
  'close',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-left2',
  'arrow-right2',
  'page',
  'list',
];

function App() {
  return (
    <div className='layout-main-conent'>
      <Card bordered={false}>
        <div>
          {svgIcons.map((item: any) => (
            <div className={styles.list} key={item}>
              <Popover content={`<IconSvg type="${item}" />`}>
                <div>
                  <IconSvg name={item} style={{ fontSize: '30px' }} />
                  <span>{item}</span>
                </div>
              </Popover>
            </div>
          ))}
        </div>
        <Divider />
        <List header={<h2>说明：</h2>}>
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
            独立运行 <Tag>pnpm run svgo</Tag> 压缩精简svg
          </List.Item>
          <List.Item>3、使用Demo：</List.Item>
          <List.Item>import IconSvg from &apos;@/components/IconSvg&apos;;</List.Item>
          <List.Item>&lt;IconSvg name=&apos;svg文件名&apos; /&gt;</List.Item>
        </List>
      </Card>
    </div>
  );
}

export default App;
