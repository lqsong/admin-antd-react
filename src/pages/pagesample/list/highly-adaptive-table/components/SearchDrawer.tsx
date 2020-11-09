import React from 'react';
import { Drawer, Button, Form, Input } from 'antd';

import TypeSelect from './TypeSelect';

import { FormInstance } from 'antd/lib/form';
import { TableListItem } from '../data.d';

interface SearchDrawerProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (values: Omit<TableListItem, 'id'>, form: FormInstance) => void;
  title?: string;
}

const SearchDrawer: React.FC<SearchDrawerProps> = props => {
  const { visible, onClose, onSubmit, title = '高级搜索' } = props;

  const [form] = Form.useForm();

  const onSearch = async () => {
    try {
      const fieldsValue = await form.validateFields();
      if (onSubmit) {
        onSubmit(fieldsValue as Omit<TableListItem, 'id'>, form);
      }
    } catch (error) {}
  };

  return (
    <Drawer
      placement="right"
      width={360}
      title={title}
      closable={false}
      onClose={onClose}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            取消
          </Button>
          <Button type="primary" onClick={onSearch}>
            搜索
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} name="searchform" hideRequiredMark>
        <Form.Item label="位置" name="type">
          <TypeSelect placeholder="请选择" />
        </Form.Item>
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="网址" name="href">
          <Input placeholder="请输入网址" />
        </Form.Item>

        <Form.Item label="备注" name="desc">
          <Input placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SearchDrawer;
