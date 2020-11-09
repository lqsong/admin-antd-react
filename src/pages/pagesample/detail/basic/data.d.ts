export interface userInfoDataType {
  name: string;
  tel: string;
  courier: string;
  address: string;
  remark: string;
}

export interface refundApplicationDataType {
  ladingNo: string;
  saleNo: string;
  state: string;
  childOrders: string;
}

export interface returnGoodsDataType {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface returnProgressDataType {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface DetailDataType {
  userInfo: userInfoDataType;
  refundApplication: refundApplicationDataType;
  returnGoods: returnGoodsDataType[];
  returnProgress: returnProgressDataType[];
}
