import { Effect, Reducer } from 'umi';
import { ResponseData } from '@/utils/request';
import { queryDetail } from './service';
import { DetailDataType } from './data.d';

export interface StateType {
  detail: DetailDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryDetail: Effect;
  };
  reducers: {
    setDetail: Reducer<StateType>;
  };
}

const initState: StateType = {
  detail: {
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
  },
};

const Model: ModelType = {
  namespace: 'DetailTable',
  state: initState,
  effects: {
    *queryDetail(_, { call, put }) {
      try {
        const response: ResponseData = yield call(queryDetail);
        const { data } = response;
        yield put({
          type: 'setDetail',
          payload: {
            ...initState.detail,
            ...data,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  reducers: {
    setDetail(state, { payload }) {
      return {
        ...initState,
        ...state,
        detail: payload,
      };
    },
  },
};

export default Model;
