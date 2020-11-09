import { Effect, Reducer } from 'umi';
import { ResponseData } from '@/utils/request';
import {
  dailynewArticles,
  weeknewWorks,
  monthnewTopics,
  annualnewLinks,
  hotSearchQueryList,
  hotTagsQueryList,
  articleHitQueryList,
  worksHitQueryList,
} from './service';
import {
  ArticleChartDataType,
  WorksChartDataType,
  TopicsChartDataType,
  LinksChartDataType,
  HotSearchDataType,
  HotTagsDataType,
  ArticleHitDataType,
  WorksHitDataType,
} from './data.d';

export interface StateType {
  articleChartData: ArticleChartDataType;
  worksChartData: WorksChartDataType;
  topicsChartData: TopicsChartDataType;
  linksChartData: LinksChartDataType;
  hotSearchData: HotSearchDataType;
  hotTagsData: HotTagsDataType;
  articleHitData: ArticleHitDataType;
  worksHitData: WorksHitDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryArticleChartData: Effect;
    queryWorksChartData: Effect;
    queryTopicsChartData: Effect;
    queryLinksChartData: Effect;
    queryHotSearchData: Effect;
    queryHotTagsData: Effect;
    queryArticleHitData: Effect;
    queryWorksHitData: Effect;
  };
  reducers: {
    setArticleChartData: Reducer<StateType>;
    setWorksChartData: Reducer<StateType>;
    setTopicsChartData: Reducer<StateType>;
    setLinksChartData: Reducer<StateType>;
    setHotSearchData: Reducer<StateType>;
    setHotTagsData: Reducer<StateType>;
    setArticleHitData: Reducer<StateType>;
    setWorksHitData: Reducer<StateType>;
  };
}

const initState: StateType = {
  articleChartData: {
    total: 0,
    num: 0,
    week: 0,
    day: 0,
  },
  worksChartData: {
    total: 0,
    num: 0,
    chart: {
      day: [],
      num: [],
    },
  },
  topicsChartData: {
    total: 0,
    num: 0,
    chart: {
      day: [],
      num: [],
    },
  },
  linksChartData: {
    total: 0,
    num: 0,
    chart: {
      day: [],
      num: [],
    },
  },
  hotSearchData: {
    list: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  },
  hotTagsData: {
    list: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  },
  articleHitData: {
    list: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  },
  worksHitData: {
    list: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  },
};

const Model: ModelType = {
  namespace: 'Home',
  state: initState,
  effects: {
    *queryArticleChartData(_, { call, put }) {
      try {
        const response: ResponseData = yield call(dailynewArticles);
        const { data } = response;
        yield put({
          type: 'setArticleChartData',
          payload: {
            ...initState.articleChartData,
            ...data,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *queryWorksChartData(_, { call, put }) {
      try {
        const response: ResponseData = yield call(weeknewWorks);
        const { data } = response;
        yield put({
          type: 'setWorksChartData',
          payload: {
            ...initState.worksChartData,
            ...data,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *queryTopicsChartData(_, { call, put }) {
      try {
        const response: ResponseData = yield call(monthnewTopics);
        const { data } = response;
        yield put({
          type: 'setTopicsChartData',
          payload: {
            ...initState.topicsChartData,
            ...data,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *queryLinksChartData(_, { call, put }) {
      try {
        const response: ResponseData = yield call(annualnewLinks);
        const { data } = response;
        yield put({
          type: 'setLinksChartData',
          payload: {
            ...initState.linksChartData,
            ...data,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *queryHotSearchData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(hotSearchQueryList, payload);
        const { data } = response;
        yield put({
          type: 'setHotSearchData',
          payload: {
            ...initState.hotSearchData,
            list: data.list || [],
            pagination: {
              ...initState.hotSearchData.pagination,
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
    *queryHotTagsData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(hotTagsQueryList, payload);
        const { data } = response;
        yield put({
          type: 'setHotTagsData',
          payload: {
            ...initState.hotTagsData,
            list: data.list || [],
            pagination: {
              ...initState.hotTagsData.pagination,
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
    *queryArticleHitData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(articleHitQueryList, payload);
        const { data } = response;
        yield put({
          type: 'setArticleHitData',
          payload: {
            ...initState.articleHitData,
            list: data.list || [],
            pagination: {
              ...initState.articleHitData.pagination,
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
    *queryWorksHitData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(worksHitQueryList, payload);
        const { data } = response;
        yield put({
          type: 'setWorksHitData',
          payload: {
            ...initState.worksHitData,
            list: data.list || [],
            pagination: {
              ...initState.worksHitData.pagination,
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
  },
  reducers: {
    setArticleChartData(state, { payload }) {
      return {
        ...initState,
        ...state,
        articleChartData: payload,
      };
    },
    setWorksChartData(state, { payload }) {
      return {
        ...initState,
        ...state,
        worksChartData: payload,
      };
    },
    setTopicsChartData(state, { payload }) {
      return {
        ...initState,
        ...state,
        topicsChartData: payload,
      };
    },
    setLinksChartData(state, { payload }) {
      return {
        ...initState,
        ...state,
        linksChartData: payload,
      };
    },
    setHotSearchData(state, { payload }) {
      return {
        ...initState,
        ...state,
        hotSearchData: payload,
      };
    },
    setHotTagsData(state, { payload }) {
      return {
        ...initState,
        ...state,
        hotTagsData: payload,
      };
    },
    setArticleHitData(state, { payload }) {
      return {
        ...initState,
        ...state,
        articleHitData: payload,
      };
    },
    setWorksHitData(state, { payload }) {
      return {
        ...initState,
        ...state,
        worksHitData: payload,
      };
    },
  },
};

export default Model;
