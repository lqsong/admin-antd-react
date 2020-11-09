import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Row, Col, Input, Tag, Button, Divider, message, Modal } from 'antd';

import ScreenTable from '@/components/ScreenTable';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import SearchDrawer from './components/SearchDrawer';

import { StateType } from './model';
import { TableDataType, TableListItem } from './data.d';
import styles from './style.less';
import { FormInstance } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';

interface HighlyAdaptiveTablePageProps {
  loading: boolean;
  visitData: TableDataType;
  createSubmitLoading: boolean;
  updateData: Partial<TableListItem>;
  updateSubmitLoading: boolean;
  dispatch: Dispatch;
}

const HighlyAdaptiveTablePage: React.FC<HighlyAdaptiveTablePageProps> = props => {
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

  const [searchDrawerVisible, setSearchDrawerVisible] = useState<boolean>(
    false,
  );

  const getList = (current: number): void => {
    dispatch({
      type: 'ListHighlyAdaptiveTable/queryTableData',
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
          type: 'ListHighlyAdaptiveTable/deleteTableData',
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
      type: 'ListHighlyAdaptiveTable/createTableData',
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
      type: 'ListHighlyAdaptiveTable/queryUpdateData',
      payload: id,
    });
    if (res === true) {
      setUpdateFormVisible(true);
    }
    setDetailUpdateLoading([]);
  };

  const updataFormCancel = async () => {
    await dispatch({
      type: 'ListHighlyAdaptiveTable/setUpdateData',
      payload: {},
    });
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: TableListItem) => {
    const res: boolean = await dispatch({
      type: 'ListHighlyAdaptiveTable/updateTableData',
      payload: values,
    });
    if (res === true) {
      updataFormCancel();
      message.success('编辑成功！');
      getList(pagination.current);
    }
  };

  const searchDrawerSubmit = (values: Omit<TableListItem, 'id'>) => {
    /* console.log('searchVal', values); */
    message.warning('进行了高级搜索!');
    setSearchDrawerVisible(false);
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
    <>
      <ScreenTable
        className="indexlayout-main-conent"
        header={
          <Row>
            <Col span={8}>
              <Button type="primary" onClick={() => setCreateFormVisible(true)}>
                新增
              </Button>
            </Col>
            <Col span={16} className="text-align-right">
              <Input.Search
                className={styles.extraContentSearch}
                placeholder="请输入名称"
                onSearch={() => ({})}
              />
              <Button
                style={{ marginLeft: '8px' }}
                onClick={() => setSearchDrawerVisible(true)}
              >
                高级搜索
              </Button>
            </Col>
          </Row>
        }
        pagination={{
          ...pagination,
          onChange: (page: number) => {
            getList(page);
          },
        }}
        bordered
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={list}
      />

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

      <SearchDrawer
        visible={searchDrawerVisible}
        onClose={() => setSearchDrawerVisible(false)}
        onSubmit={searchDrawerSubmit}
      />
    </>
  );
};

export default connect(
  ({
    ListHighlyAdaptiveTable,
    loading,
  }: {
    ListHighlyAdaptiveTable: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['ListHighlyAdaptiveTable/queryTableData'],
    visitData: ListHighlyAdaptiveTable.tableData,
    createSubmitLoading:
      loading.effects['ListHighlyAdaptiveTable/createTableData'],
    updateData: ListHighlyAdaptiveTable.updateData,
    updateSubmitLoading:
      loading.effects['ListHighlyAdaptiveTable/updateTableData'],
  }),
)(HighlyAdaptiveTablePage);
