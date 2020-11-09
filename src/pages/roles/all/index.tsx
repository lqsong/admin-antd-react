import React from 'react';
import { connect } from 'umi';
import { Card, Alert, Descriptions, Button } from 'antd';

import { UserModelState } from '@/models/user';
import Permission from '@/components/Permission';

interface RolesAllProps {
  userRoles: string[];
}

const RolesAll: React.FC<RolesAllProps> = props => {
  const { userRoles } = props;

  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Alert message="此栏目为权限功能做演示！" type="warning" />

        <Descriptions
          title="以下有三个账号,密码：123456，你可以登录不同的账号查看此栏目下的区别："
          layout="vertical"
          bordered
          style={{ marginTop: '20px' }}
          size="small"
        >
          <Descriptions.Item label="admin">
            超级管理员（拥有所有权限）
          </Descriptions.Item>
          <Descriptions.Item label="user">临时用户账号</Descriptions.Item>
          <Descriptions.Item label="test">临时测试账号</Descriptions.Item>
        </Descriptions>

        <Alert
          message="注意：退出账号后登录其他账号，请刷新在查看效果。"
          type="error"
          style={{ marginTop: '20px' }}
        />

        <Descriptions
          title="此页面所有用户都可以查看，以下只做操作按钮权限演示，页面权限请登录不同账号查看左侧栏目对应菜单区别。"
          layout="vertical"
          bordered
          column={1}
          style={{ marginTop: '20px' }}
          size="small"
        >
          <Descriptions.Item label="不做验证的操作按钮">
            <Button type="primary">编辑</Button>
            &nbsp;
            <Button type="primary" danger>
              删除
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="user账号可操作按钮">
            <Permission
              userRoles={userRoles}
              routeOrRole="user"
              noNode="无权操作，此参数可赋值为空！"
            >
              <Button type="primary">编辑</Button>
              &nbsp;
              <Button type="primary" danger>
                删除
              </Button>
            </Permission>
          </Descriptions.Item>
          <Descriptions.Item label="test账号可操作按钮">
            <Permission
              userRoles={userRoles}
              routeOrRole="test"
              noNode="无权操作，此参数可赋值为空！"
            >
              <Button type="primary">编辑</Button>
              &nbsp;
              <Button type="primary" danger>
                删除
              </Button>
            </Permission>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  userRoles: user.currentUser.roles,
}))(RolesAll);
