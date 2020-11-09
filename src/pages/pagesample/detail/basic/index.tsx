import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Spin, Card, Descriptions, Divider, Table, Badge } from 'antd';

import { StateType } from './model';
import { DetailDataType } from './data.d';

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
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="processing" text="进行中" />;
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

interface DetailBasicPageProps {
  loading: boolean;
  visitData: DetailDataType;
  dispatch: Dispatch;
}

const DetailBasicPage: React.FC<DetailBasicPageProps> = props => {
  const { loading, visitData, dispatch } = props;
  const {
    userInfo,
    refundApplication,
    returnGoods,
    returnProgress,
  } = visitData;

  let goodsData: typeof returnGoods = [];
  if (returnGoods.length) {
    let num = 0;
    let amount = 0;
    returnGoods.forEach(item => {
      num += Number(item.num);
      amount += Number(item.amount);
    });
    goodsData = returnGoods.concat({
      id: '总计',
      num,
      amount,
    });
  }

  useEffect(() => {
    dispatch({ type: 'DetailBasic/queryDetail' });
  }, [1]);

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
          return <a href="">{text}</a>;
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

  return (
    <div className="indexlayout-main-conent">
      <Spin spinning={loading} size="large">
        <Card bordered={false}>
          <Descriptions title="退款申请">
            <Descriptions.Item label="取货单号">
              {refundApplication.ladingNo}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {refundApplication.state}
            </Descriptions.Item>
            <Descriptions.Item label="销售单号">
              {refundApplication.saleNo}
            </Descriptions.Item>
            <Descriptions.Item label="子订单">
              {refundApplication.childOrders}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Descriptions title="用户信息">
            <Descriptions.Item label="用户姓名">
              {userInfo.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系电话">
              {userInfo.tel}
            </Descriptions.Item>
            <Descriptions.Item label="常用快递">
              {userInfo.courier}
            </Descriptions.Item>
            <Descriptions.Item label="取货地址">
              {userInfo.address}
            </Descriptions.Item>
            <Descriptions.Item label="备注">
              {userInfo.remark}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <div className="ant-descriptions">
            <div className="ant-descriptions-header">
              <div className="ant-descriptions-title">退货商品</div>
            </div>
            <div className="ant-descriptions-view">
              <Table
                rowKey="id"
                pagination={false}
                dataSource={goodsData}
                columns={goodsColumns}
              />
            </div>
          </div>

          <Divider />

          <div className="ant-descriptions">
            <div className="ant-descriptions-header">
              <div className="ant-descriptions-title">退货进度</div>
            </div>
            <div className="ant-descriptions-view">
              <Table
                pagination={false}
                dataSource={returnProgress}
                columns={progressColumns}
              />
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default connect(
  ({
    DetailBasic,
    loading,
  }: {
    DetailBasic: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['DetailBasic/queryDetail'],
    visitData: DetailBasic.detail,
  }),
)(DetailBasicPage);
