import { useState } from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Radio, Row, Select } from 'antd';
import { FormDataType } from './data.d';
import { createData } from './service';
import TableForm from './components/TableForm';
import FooterToolbar from '@/components/FooterToolbar';

function App() {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: FormDataType) => {
    setLoading(true);
    try {
      await createData(values);
      message.success('提交成功');
      onReset();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className='layout-main-conent'>
      <Form
        /* hideRequiredMark */
        layout='vertical'
        name='basic'
        form={form}
        onFinish={onFinish}
      >
        <Card bordered={false} title='基础信息' style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label='标题：'
                name='title'
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label='起止日期'
                name='date'
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
              >
                <DatePicker.RangePicker style={{ width: '100%' }} placeholder={['开始日期', '截止日期']} />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label='下拉选择'
                name='select'
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
              >
                <Select placeholder='请选择' allowClear>
                  <Select.Option value='1'>select1</Select.Option>
                  <Select.Option value='2'>select2</Select.Option>
                  <Select.Option value='3'>select3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='单选按钮1' name='radio-group'>
                <Radio.Group>
                  <Radio value='a'>item 1</Radio>
                  <Radio value='b'>item 2</Radio>
                  <Radio value='c'>item 3</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='拓展信息' style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='单选按钮2' name='radio-button' rules={[{ required: true, message: '请选择' }]}>
                <Radio.Group>
                  <Radio.Button value='a'>item 1</Radio.Button>
                  <Radio.Button value='b'>item 2</Radio.Button>
                  <Radio.Button value='c'>item 3</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='复选框' name='checkbox-group'>
                <Checkbox.Group>
                  <Checkbox value='A' style={{ lineHeight: '32px' }}>
                    A
                  </Checkbox>

                  <Checkbox value='B' style={{ lineHeight: '32px' }} disabled>
                    B
                  </Checkbox>

                  <Checkbox value='C' style={{ lineHeight: '32px' }}>
                    C
                  </Checkbox>

                  <Checkbox value='D' style={{ lineHeight: '32px' }}>
                    D
                  </Checkbox>

                  <Checkbox value='E' style={{ lineHeight: '32px' }}>
                    E
                  </Checkbox>

                  <Checkbox value='F' style={{ lineHeight: '32px' }}>
                    F
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='备注' name='remark'>
                <Input.TextArea placeholder='请输入' rows={1} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='表格信息'>
          <Form.Item name='users'>
            <TableForm />
          </Form.Item>
        </Card>

        <FooterToolbar className='text-align-right'>
          <Button type='primary' htmlType='submit' loading={loading}>
            提交
          </Button>
          <Button htmlType='button' onClick={onReset} style={{ marginLeft: 8 }}>
            重置
          </Button>
        </FooterToolbar>
      </Form>
    </div>
  );
}

export default App;
