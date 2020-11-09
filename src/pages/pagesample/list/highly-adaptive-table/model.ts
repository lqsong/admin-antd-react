import { Effect, Reducer } from 'umi';
import { ResponseData } from '@/utils/request';

import {
  queryList,
  removeData,
  createData,
  detailData,
  updateData,
} from './service';

import { TableDataType, TableListItem } from './data.d';

export interface StateType {
  tableData: TableDataType;
  updateData: Partial<TableListItem>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryTableData: Effect;
    deleteTableData: Effect;
    createTableData: Effect;
    queryUpdateData: Effect;
    updateTableData: Effect;
  };
  reducers: {
    setTableData: Reducer<StateType>;
    setUpdateData: Reducer<StateType>;
  };
}

const initState: StateType = {
  tableData: {
    list: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  },
  updateData: {},
};

const Model: ModelType = {
  namespace: 'ListHighlyAdaptiveTable',
  state: initState,
  effects: {
    *queryTableData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(queryList, payload);
        const { data } = response;
        yield put({
          type: 'setTableData',
          payload: {
            ...initState.tableData,
            list: data.list || [],
            pagination: {
              ...initState.tableData.pagination,
              current: payload.page,
              total: data.total || 0,
            },
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *deleteTableData({ payload }, { call, put }) {
      try {
        yield call(removeData, payload);
        return true;
      } catch (error) {
        return false;
      }
    },
    *createTableData({ payload }, { call, put }) {
      try {
        yield call(createData, payload);
        return true;
      } catch (error) {
        return false;
      }
    },
    *queryUpdateData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(detailData, payload);
        const { data } = response;
        yield put({
          type: 'setUpdateData',
          payload: {
            ...initState.updateData,
            ...data,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *updateTableData({ payload }, { call, put }) {
      try {
        const { id, ...params } = payload;
        yield call(updateData, id, { ...params });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  reducers: {
    setTableData(state, { payload }) {
      return {
        ...initState,
        ...state,
        tableData: payload,
      };
    },
    setUpdateData(state, { payload }) {
      return {
        ...initState,
        ...state,
        updateData: payload,
      };
    },
  },
};

export default Model;
