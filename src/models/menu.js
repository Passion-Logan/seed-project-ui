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
        type: 'menuList',
        payload: response,
      });
    },
  },

  reducers: {
    menuList(state, action) {
      return {
        ...state,
        list: action.payload
      }
    }
  }
};
