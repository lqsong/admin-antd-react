import { Effect } from 'umi';
import { createData } from './service';

export interface StateType {}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    create: Effect;
  };
  reducers: {};
}
const initState: StateType = {};

const Model: ModelType = {
  namespace: 'FormBasic',
  state: initState,
  effects: {
    *create({ payload }, { call, put }) {
      try {
        yield call(createData, payload);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  reducers: {},
};

export default Model;
