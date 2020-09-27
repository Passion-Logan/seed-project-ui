import { getUserNav } from '@/services/user';

export default {
  namespace: 'menu',

  state: {
    list: [],
    routerData: {},
  },

  effects: {
    *fetchUserNav(_, { call, put }) {
      const response = yield call(getUserNav);
      yield put({
        type: 'getData',
        payload: response.menuData,
      });
    },
  },

  reducers: {
    getData(state, action) {
      return {
        ...state,
        menuList: action.payload || [],
      }
    }
  }
};
