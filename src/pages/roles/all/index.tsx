import { Card, Alert, Descriptions, Button, Divider } from 'antd';
import Permission from '@/components/Permission';

function App() {
  return (
    <div className='layout-main-conent'>
      <Card>
        <Alert message='此栏目为权限功能做演示！' type='warning'></Alert>

        <Descriptions
          title='以下有三个账号,密码：123456，你可以登录不同的账号查看此栏目下的区别：'
          layout='vertical'
          size='small'
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label='admin'> 超级管理员（拥有所有权限）</Descriptions.Item>
          <Descriptions.Item label='user'>临时用户账号</Descriptions.Item>
          <Descriptions.Item label='test'>临时测试账号</Descriptions.Item>
        </Descriptions>

        <Alert
          message='注意：退出账号后登录其他账号，请刷新在查看效果。'
          type='error'
          style={{ marginTop: '20px' }}
        ></Alert>

        <Descriptions
          title='此页面所有用户都可以查看，以下只做操作按钮权限演示，页面权限请登录不同账号查看左侧栏目对应菜单区别。'
          layout='vertical'
          size='small'
          bordered
          column={1}
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label='不做验证的操作按钮'>
            <Button type='primary'>编辑</Button>
            <Button type='primary' danger>
              删除
            </Button>
          </Descriptions.Item>
          <Divider>
            <h3>Permission 组件使用方法：</h3>
          </Divider>
          <Descriptions.Item label='user账号可操作按钮'>
            <Permission role='user' noNode={<>无权操作，此参数可赋值为空！</>}>
              <Button type='primary'>编辑</Button>
              <Button type='primary' danger>
                删除
              </Button>
            </Permission>
          </Descriptions.Item>
          <Descriptions.Item label='test账号可操作按钮'>
            <Permission role='test' noNode={<>无权操作，此参数可赋值为空！</>}>
              <Button type='primary'>编辑</Button>
              <Button type='primary' danger>
                删除
              </Button>
            </Permission>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default App;
