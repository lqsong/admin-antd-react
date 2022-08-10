import React, { useState } from 'react';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';

export interface TableFormDataType {
  key: string;
  name?: string;
  workId?: string;
  edit?: boolean;
  isNew?: boolean;
}

interface TableFormProps {
  value?: TableFormDataType[];
  onChange?: (value: TableFormDataType[]) => void;
}

const TableForm: React.FC<TableFormProps> = (props) => {
  const { value, onChange } = props;

  const [index, setIndex] = useState<number>(0);
  const [cacheOriginData, setCacheOriginData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TableFormDataType[] | undefined>(value);

  const getRowByKey = (key: string, newData?: TableFormDataType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.edit) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.edit = !target.edit;
      setData(newData);
    }
  };

  const newTableData = () => {
    const newData = data?.map((item) => ({ ...item })) || [];

    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      edit: true,
      isNew: true,
    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as TableFormDataType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);

    const target = getRowByKey(key) || ({} as any);
    if (!target.workId || !target.name) {
      message.error('请填写完整信息。');
      (e.target as HTMLInputElement).focus();
      setLoading(false);
      return;
    }
    delete target.isNew;
    toggleEditable(e, key);
    if (onChange) {
      onChange(data as TableFormDataType[]);
    }
    setLoading(false);
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setLoading(true);
    e.preventDefault();
    const newData = [...(data as TableFormDataType[])];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            edit: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setLoading(false);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, key: string) => {
    const newData = [...(data as TableFormDataType[])];
    const target = getRowByKey(key, newData) || ({} as any);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      render: (text: string, record: TableFormDataType) => {
        if (record.edit) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder='姓名'
            />
          );
        }
        return text;
      },
    },
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '35%',
      render: (text: string, record: TableFormDataType) => {
        if (record.edit) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'workId', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder='工号'
            />
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDataType) => {
        if (!!record.edit && loading) {
          return null;
        }
        if (record.edit) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                <Divider type='vertical' />
                <Popconfirm title='是否要删除此行？' onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={(e) => saveRow(e, record.key)}>保存</a>
              <Divider type='vertical' />
              <a onClick={(e) => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={(e) => toggleEditable(e, record.key)}>编辑</a>
            <Divider type='vertical' />
            <Popconfirm title='是否要删除此行？' onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table<TableFormDataType> loading={loading} columns={columns} dataSource={data} pagination={false} />
      <Button style={{ width: '100%', marginTop: 16, marginBottom: 8 }} type='dashed' onClick={newTableData}>
        新增内容
      </Button>
    </>
  );
};

export default TableForm;
