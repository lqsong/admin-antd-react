import { Effect, Reducer } from 'umi';
import { accountReg } from './service';

export interface StateType {
  errorMsg?: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
  };
  reducers: {
    changeErrorMsg: Reducer<StateType>;
  };
}

const initState: StateType = {
  errorMsg: undefined,
};

const Model: ModelType = {
  namespace: 'userregister',
  state: initState,
  effects: {
    *register({ payload }, { call, put }) {
      let msg = undefined;
      try {
        yield call(accountReg, payload);
        msg = '';
      } catch (error) {
        if (error.message && error.message === 'CustomError') {
          const { data } = error;
          const { res } = data;
          msg = res.msg || 'error';
        }
      }

      yield put({
        type: 'changeErrorMsg',
        payload: msg,
      });

      if (msg === '') {
        return true; // 成功
      } else if (typeof msg === 'undefined') {
        return undefined; // 服务器错误
      } else {
        return false; // 自定义错误
      }
    },
  },
  reducers: {
    changeErrorMsg(state, { payload }) {
      return {
        ...initState,
        ...state,
        errorMsg: payload,
      };
    },
  },
};

export default Model;
