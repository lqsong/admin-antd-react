import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import {
  Card,
  Table,
  Radio,
  Input,
  Tag,
  Button,
  Divider,
  message,
  Modal,
  Row,
  Col,
  Form,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import TypeSelect from './components/TypeSelect';

import { StateType } from './model';
import { TableDataType, TableListItem } from './data.d';
import { FormInstance } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';

const searchFormItemLayout = {
  labelCol: { span: 3, offset: 0 },
};

interface ListSearchTablePageProps {
  loading: boolean;
  visitData: TableDataType;
  createSubmitLoading: boolean;
  updateData: Partial<TableListItem>;
  updateSubmitLoading: boolean;
  dispatch: Dispatch;
}

const ListSearchTablePage: React.FC<ListSearchTablePageProps> = props => {
  const {
    loading,
    visitData,
    createSubmitLoading,
    updateData,
    updateSubmitLoading,
    dispatch,
  } = props;
  const { list, pagination } = visitData;

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchForm] = Form.useForm();

  const [deleteLoading, setDeleteLoading] = useState<number[]>([]);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);

  const searchFormSubmit = async () => {
    try {
      // const fieldsValue = await searchForm.validateFields();
      // console.log('search', fieldsValue);
      message.warning('进行了搜索!');
    } catch (error) {}
  };

  const getList = (current: number): void => {
    dispatch({
      type: 'ListSearchTable/queryTableData',
      payload: {
        per: pagination.pageSize,
        page: current,
      },
    });
  };

  const deleteTableData = (id: number): void => {
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        setDeleteLoading([id]);
        const res: boolean = await dispatch({
          type: 'ListSearchTable/deleteTableData',
          payload: id,
        });
        if (res === true) {
          message.success('删除成功！');
          getList(1);
        }
        setDeleteLoading([]);
      },
    });
  };

  const createSubmit = async (
    values: Omit<TableListItem, 'id'>,
    form: FormInstance,
  ) => {
    const res: boolean = await dispatch({
      type: 'ListSearchTable/createTableData',
      payload: values,
    });

    if (res === true) {
      form.resetFields();
      setCreateFormVisible(false);
      message.success('新增成功！');
      getList(1);
    }
  };

  const detailUpdateData = async (id: number) => {
    setDetailUpdateLoading([id]);
    const res: boolean = await dispatch({
      type: 'ListSearchTable/queryUpdateData',
      payload: id,
    });
    if (res === true) {
      setUpdateFormVisible(true);
    }
    setDetailUpdateLoading([]);
  };

  const updataFormCancel = async () => {
    await dispatch({
      type: 'ListSearchTable/setUpdateData',
      payload: {},
    });
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: TableListItem) => {
    const res: boolean = await dispatch({
      type: 'ListSearchTable/updateTableData',
      payload: values,
    });
    if (res === true) {
      updataFormCancel();
      message.success('编辑成功！');
      getList(pagination.current);
    }
  };

  useEffect(() => {
    getList(1);
  }, [1]);

  const columns: ColumnsType<TableListItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => (
        <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
      ),
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record, index) => (
        <a href={record.href} target="_blank">
          {' '}
          {record.name}
        </a>
      ),
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
    {
      title: '位置',
      dataIndex: 'type',
      render: (_, record, index) => {
        return record.type === 'header' ? (
          <Tag color="green">头部</Tag>
        ) : (
          <Tag color="cyan">底部</Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record, index) => {
        return (
          <>
            <Button
              type="link"
              loading={detailUpdateLoading.includes(record.id)}
              onClick={() => detailUpdateData(record.id)}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              loading={deleteLoading.includes(record.id)}
              onClick={() => deleteTableData(record.id)}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="indexlayout-main-conent">
      <Card
        bordered={false}
        style={{ marginBottom: '15px' }}
        bodyStyle={{ paddingBottom: '0' }}
      >
        <Form form={searchForm} name="search">
          <Row gutter={16} justify="end">
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label="名称：" name="name">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label="链接：" name="herf">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label="位置：" name="type">
                <TypeSelect placeholder="请选择" />
              </Form.Item>
            </Col>
            {searchOpen ? (
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <Form.Item
                  {...searchFormItemLayout}
                  label="备注："
                  name="remark"
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
            ) : null}
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div
                className="text-align-right"
                style={{ paddingBottom: '24px' }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={searchFormSubmit}
                >
                  查询
                </Button>
                <Button
                  htmlType="button"
                  style={{ marginLeft: 8 }}
                  onClick={() => searchForm.resetFields()}
                >
                  重置
                </Button>
                <Button
                  type="link"
                  style={{ marginLeft: 8 }}
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  {searchOpen ? (
                    <>
                      收起
                      <UpOutlined />
                    </>
                  ) : (
                    <>
                      展开
                      <DownOutlined />
                    </>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bordered={false}
        title={
          <Button type="primary" onClick={() => setCreateFormVisible(true)}>
            新增
          </Button>
        }
        extra={
          <div>
            <Radio.Group defaultValue="all">
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="header">头部</Radio.Button>
              <Radio.Button value="footer">底部</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
        />
      </Card>

      <CreateForm
        onCancel={() => setCreateFormVisible(false)}
        visible={createFormVisible}
        onSubmit={createSubmit}
        onSubmitLoading={createSubmitLoading}
      />

      {updateFormVisible && Object.keys(updateData).length > 0 ? (
        <UpdateForm
          values={updateData}
          onCancel={() => updataFormCancel()}
          visible={updateFormVisible}
          onSubmit={updateSubmit}
          onSubmitLoading={updateSubmitLoading}
        />
      ) : null}
    </div>
  );
};

export default connect(
  ({
    ListSearchTable,
    loading,
  }: {
    ListSearchTable: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['ListSearchTable/queryTableData'],
    visitData: ListSearchTable.tableData,
    createSubmitLoading: loading.effects['ListSearchTable/createTableData'],
    updateData: ListSearchTable.updateData,
    updateSubmitLoading: loading.effects['ListSearchTable/updateTableData'],
  }),
)(ListSearchTablePage);
