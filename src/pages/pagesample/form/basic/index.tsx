import React from 'react';
import { connect, Dispatch } from 'umi';
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
  Checkbox,
  message,
} from 'antd';

import { formDataType } from './data.d';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

interface FormBasicPageProps {
  loading: boolean;
  dispatch: Dispatch;
}

const FormBasicPage: React.FC<FormBasicPageProps> = props => {
  const { loading, dispatch } = props;

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: formDataType) => {
    const res: boolean = await dispatch({
      type: 'FormBasic/create',
      payload: values,
    });
    if (res === true) {
      message.success('提交成功');
      onReset();
    }
  };

  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Form
          /* hideRequiredMark */
          name="basic"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            {...formItemLayout}
            label="标题："
            name="title"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="起止日期"
            name="date"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              placeholder={['开始日期', '截止日期']}
              onChange={(value, string) => {
                console.log(value, string);
              }}
            />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="下拉选择"
            name="select"
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          >
            <Select placeholder="请选择" allowClear>
              <Select.Option value="1">select1</Select.Option>
              <Select.Option value="2">select2</Select.Option>
              <Select.Option value="3">select3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...formItemLayout} label="单选按钮1" name="radio1">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="单选按钮2"
            name="radio2"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Radio.Group>
              <Radio.Button value="a">item 1</Radio.Button>
              <Radio.Button value="b">item 2</Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label="复选框" name="checkbox">
            <Checkbox.Group>
              <Checkbox value="A" style={{ lineHeight: '32px' }}>
                A
              </Checkbox>

              <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                B
              </Checkbox>

              <Checkbox value="C" style={{ lineHeight: '32px' }}>
                C
              </Checkbox>

              <Checkbox value="D" style={{ lineHeight: '32px' }}>
                D
              </Checkbox>

              <Checkbox value="E" style={{ lineHeight: '32px' }}>
                E
              </Checkbox>

              <Checkbox value="F" style={{ lineHeight: '32px' }}>
                F
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label="备注" name="remark">
            <Input.TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入"
              rows={4}
            />
          </Form.Item>

          <Form.Item {...submitFormLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              style={{ marginLeft: 8 }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default connect(
  ({
    loading,
  }: {
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['FormBasic/create'],
  }),
)(FormBasicPage);
