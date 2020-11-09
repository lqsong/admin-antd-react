import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Card, List, Radio, Input, Tag, Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

import { StateType } from './model';
import { TableDataType, TableListItem } from './data.d';
import styles from './style.less';
import { FormInstance } from 'antd/lib/form';

interface ListBasicPageProps {
  loading: boolean;
  visitData: TableDataType;
  createSubmitLoading: boolean;
  updateData: Partial<TableListItem>;
  updateSubmitLoading: boolean;
  dispatch: Dispatch;
}

const ListBasicPage: React.FC<ListBasicPageProps> = props => {
  const {
    loading,
    visitData,
    createSubmitLoading,
    updateData,
    updateSubmitLoading,
    dispatch,
  } = props;
  const { list, pagination } = visitData;

  const [deleteLoading, setDeleteLoading] = useState<number[]>([]);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);

  const getList = (current: number): void => {
    dispatch({
      type: 'ListBasic/queryTableData',
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
          type: 'ListBasic/deleteTableData',
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
      type: 'ListBasic/createTableData',
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
      type: 'ListBasic/queryUpdateData',
      payload: id,
    });
    if (res === true) {
      setUpdateFormVisible(true);
    }
    setDetailUpdateLoading([]);
  };

  const updataFormCancel = async () => {
    await dispatch({
      type: 'ListBasic/setUpdateData',
      payload: {},
    });
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: TableListItem) => {
    const res: boolean = await dispatch({
      type: 'ListBasic/updateTableData',
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

  return (
    <div className="indexlayout-main-conent">
      <Card
        bordered={false}
        title="友情链接"
        extra={
          <div>
            <Radio.Group defaultValue="all">
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="header">头部</Radio.Button>
              <Radio.Button value="footer">底部</Radio.Button>
            </Radio.Group>
            <Input.Search
              className={styles.extraContentSearch}
              placeholder="请输入"
              onSearch={() => ({})}
            />
          </div>
        }
      >
        <Button
          type="dashed"
          style={{ width: '100%', marginBottom: 8 }}
          onClick={() => setCreateFormVisible(true)}
        >
          <PlusOutlined />
          新增
        </Button>

        <List
          itemLayout="horizontal"
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  loading={detailUpdateLoading.includes(item.id)}
                  onClick={() => detailUpdateData(item.id)}
                >
                  编辑
                </Button>,
                <Button
                  type="link"
                  loading={deleteLoading.includes(item.id)}
                  onClick={() => deleteTableData(item.id)}
                >
                  删除
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <a href={item.href} target="_blank">
                    {item.name}
                  </a>
                }
                description={item.desc}
              />
              <div>
                {item.type === 'header' ? (
                  <Tag color="green">头部</Tag>
                ) : (
                  <Tag color="cyan">底部</Tag>
                )}
              </div>
            </List.Item>
          )}
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
    ListBasic,
    loading,
  }: {
    ListBasic: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['ListBasic/queryTableData'],
    visitData: ListBasic.tableData,
    createSubmitLoading: loading.effects['ListBasic/createTableData'],
    updateData: ListBasic.updateData,
    updateSubmitLoading: loading.effects['ListBasic/updateTableData'],
  }),
)(ListBasicPage);
