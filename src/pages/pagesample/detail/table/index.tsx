import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, Descriptions, Spin, Table } from 'antd';

import { DetailDataType } from './data.d';
import { ResponseData } from '@/utils/request';
import { queryDetail } from './service';

import styles from './index.module.less';

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'success') {
        return <Badge status='success' text='成功' />;
      }
      return <Badge status='processing' text='进行中' />;
    },
  },

  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];
const initDetail: DetailDataType = {
  userInfo: {
    name: '',
    tel: '',
    courier: '',
    address: '',
    remark: '',
  },
  refundApplication: {
    ladingNo: '',
    saleNo: '',
    state: '',
    childOrders: '',
  },
  returnGoods: [],
  returnProgress: [],
};

function App() {
  const [loading, setLoading] = useState<boolean>();
  const [detail, setDetail] = useState<DetailDataType>({
    ...initDetail,
  });

  const userInfo = useMemo(
    () =>
      detail.userInfo || {
        name: '',
        tel: '',
        courier: '',
        address: '',
        remark: '',
      },
    [detail],
  );
  const refundApplication = useMemo(
    () =>
      detail.refundApplication || {
        ladingNo: '',
        saleNo: '',
        state: '',
        childOrders: '',
      },
    [detail],
  );
  const returnGoods = useMemo(() => detail.returnGoods || [], [detail]);
  const goodsData = useMemo(() => {
    if (returnGoods.length > 0) {
      let num = 0;
      let amount = 0;
      returnGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      return returnGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    return [];
  }, [returnGoods]);
  const returnProgress = useMemo(() => detail.returnProgress || [], [detail]);

  const renderContent = (value: any, row: any, index: any) => {
    const obj: {
      children: any;
      props: { colSpan?: number };
    } = {
      children: value,
      props: {},
    };
    if (index === returnGoods.length) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  const goodsColumns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return <a href=''>{text}</a>;
        }
        return {
          children: <span style={{ fontWeight: 600 }}>总计</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    },
    {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as 'left' | 'right' | 'center',
      render: renderContent,
    },
    {
      title: '数量（件）',
      dataIndex: 'num',
      key: 'num',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const response: ResponseData<DetailDataType> = await queryDetail();
      const { data } = response;
      setDetail({
        ...initDetail,
        ...data,
      });
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='layout-main-conent'>
      <Spin spinning={loading} size='large'>
        <Card bordered={false} title='退款申请' style={{ marginBottom: '20px' }}>
          <Descriptions bordered column={2} className={styles['cus-table']}>
            <Descriptions.Item label='取货单号'>{refundApplication.ladingNo}</Descriptions.Item>
            <Descriptions.Item label='状态'>{refundApplication.state}</Descriptions.Item>
            <Descriptions.Item label='销售单号'>{refundApplication.saleNo}</Descriptions.Item>
            <Descriptions.Item label='子订单'>{refundApplication.childOrders}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card bordered={false} title='用户信息' style={{ marginBottom: '20px' }}>
          <Descriptions bordered column={2} className={styles['cus-table']}>
            <Descriptions.Item label='用户姓名'>{userInfo.name}</Descriptions.Item>
            <Descriptions.Item label='联系电话'>{userInfo.tel}</Descriptions.Item>
            <Descriptions.Item label='常用快递'>{userInfo.courier}</Descriptions.Item>
            <Descriptions.Item label='取货地址'>{userInfo.address}</Descriptions.Item>
            <Descriptions.Item label='备注'>{userInfo.remark}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card bordered={false} title='退货商品' style={{ marginBottom: '20px' }}>
          <Table rowKey='id' pagination={false} dataSource={goodsData} columns={goodsColumns} />
        </Card>

        <Card bordered={false} title='退货进度'>
          <Table pagination={false} dataSource={returnProgress} columns={progressColumns} />
        </Card>
      </Spin>
    </div>
  );
}

export default App;
