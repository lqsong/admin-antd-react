import { useEffect, useState } from 'react';
import { Button, Card, FormInstance, Input, List, message, Modal, Radio, Tag } from 'antd';
import { ResponseData } from '@/utils/request';
import { createData, detailData, queryList, removeData, updateData as updateDataService } from './service';
import { PaginationConfig, TableListItem, IResponseData } from './data.d';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

function App() {
  // 获取数据
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<TableListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const getList = async (current: number): Promise<void> => {
    setLoading(true);

    const response: ResponseData<IResponseData> = await queryList({
      page: current,
      per: 10,
    });
    const data = response.data || { list: [], total: 0 };
    setList(data.list || []);
    setPagination({
      ...pagination,
      current,
      total: data.total || 0,
    });

    setLoading(false);
  };
  useEffect(() => {
    getList(1);
  }, []);

  // 删除
  const [deleteLoading, setDeleteLoading] = useState<number[]>([]);
  const deleteTableData = (id: number) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        setDeleteLoading([id]);

        await removeData(id);
        message.success('删除成功！');
        getList(pagination.current);

        setDeleteLoading([]);
      },
    });
  };

  // 编辑弹框 data - 详情
  const [updateSubmitLoading, setUpdateSubmitLoading] = useState<boolean>(false);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Partial<TableListItem>>({});
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);
  const detailUpdateData = async (id: number) => {
    setDetailUpdateLoading([id]);

    const response: ResponseData<TableListItem> = await detailData(id);
    const { data } = response;
    setUpdateData({
      ...data,
    });
    setUpdateFormVisible(true);

    setDetailUpdateLoading([]);
  };

  const updataFormCancel = async () => {
    setUpdateData({});
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: TableListItem) => {
    setUpdateSubmitLoading(true);

    const { id, ...params } = values;
    await updateDataService(id, { ...params });
    updataFormCancel();
    message.success('编辑成功！');
    getList(pagination.current);

    setUpdateSubmitLoading(false);
  };

  // 新增
  const [createSubmitLoading, setCreateSubmitLoading] = useState<boolean>(false);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createSubmit = async (values: Omit<TableListItem, 'id'>, form: FormInstance) => {
    setCreateSubmitLoading(true);

    await createData(values);
    form.resetFields();
    setCreateFormVisible(false);
    message.success('新增成功！');
    getList(1);

    setCreateSubmitLoading(false);
  };

  return (
    <div className='layout-main-conent'>
      <Card
        bordered={false}
        title='友情链接'
        extra={
          <div>
            <Radio.Group defaultValue='all'>
              <Radio.Button value='all'>全部</Radio.Button>
              <Radio.Button value='header'>头部</Radio.Button>
              <Radio.Button value='footer'>底部</Radio.Button>
            </Radio.Group>
            <Input.Search placeholder='请输入' style={{ width: '270px', marginLeft: '16px' }} onSearch={() => ({})} />
          </div>
        }
      >
        <Button type='dashed' style={{ width: '100%', marginBottom: 8 }} onClick={() => setCreateFormVisible(true)}>
          新增
        </Button>

        <List
          itemLayout='horizontal'
          rowKey='id'
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                // eslint-disable-next-line react/jsx-key
                <Button
                  type='link'
                  loading={detailUpdateLoading.includes(item.id)}
                  onClick={() => detailUpdateData(item.id)}
                >
                  编辑
                </Button>,

                // eslint-disable-next-line react/jsx-key
                <Button type='link' loading={deleteLoading.includes(item.id)} onClick={() => deleteTableData(item.id)}>
                  删除
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <a href={item.href} target='_blank' rel='noreferrer'>
                    {item.name}
                  </a>
                }
                description={item.desc}
              />
              <div>{item.type === 'header' ? <Tag color='green'>头部</Tag> : <Tag color='cyan'>底部</Tag>}</div>
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
}

export default App;
