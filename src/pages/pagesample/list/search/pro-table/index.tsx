import React from 'react';
import { Card, Alert, List } from 'antd';

interface ListSearchProTablePageProps {}

const ListSearchProTablePage: React.FC<ListSearchProTablePageProps> = props => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Alert
          message="ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。"
          type="success"
        />
        <List header={<h3>使用方法：</h3>}>
          <List.Item>
            Using npm: <br />
            $ npm install --save @ant-design/pro-table <br />
            or using yarn: <br />$ yarn add @ant-design/pro-table
          </List.Item>
          <List.Item>
            <a
              href="https://procomponents.ant.design/components/table"
              target="_blank"
            >
              在线文档
            </a>
          </List.Item>
        </List>
      </Card>
    </div>
  );
};

export default ListSearchProTablePage;
