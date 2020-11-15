import { Reducer /* , Effect */ } from 'umi';
import settings from '@/config/settings';

export interface GlobalModelState {
  // 左侧展开收起
  collapsed: boolean;
  // 顶部菜单开启
  topNavEnable: boolean;
  // 头部固定开启
  headFixed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    setTopNavEnable: Reducer<GlobalModelState>;
    setHeadFixed: Reducer<GlobalModelState>;
  };
}

const initState: GlobalModelState = {
  collapsed: false,
  topNavEnable: settings.topNavEnable,
  headFixed: settings.headFixed,
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initState,

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        collapsed: payload,
      };
    },
    setTopNavEnable(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        topNavEnable: payload,
      };
    },
    setHeadFixed(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        headFixed: payload,
      };
    },
  },
};

export default GlobalModel;
