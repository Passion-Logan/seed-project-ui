// import { queryCurrent, query as queryUsers, getUserNav, getUserInfo } from '@/services/user';
import { query as queryUsers, getUserInfo } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch (_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },

    // *fetchUserNav(_, { call, put }) {
    //   const response = yield call(getUserNav);
    //   yield put({
    //     type: 'getUserNav',
    //     payload: response,
    //   });
    // },

    *fetchUserInfo (_, { call, put }) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'getUserInfo',
        payload: response,
      });
    },
  },
  reducers: {
    // saveCurrentUser(state, action) {
    //   return { ...state, currentUser: action.payload || {} };
    // },

    fetchUserNav (state) {
      return { ...state };
    },

    getUserInfo (state, action) {
      return { ...state, currentUser: action.payload || {}, menu: { "key": "setting"} };
    },

    changeNotifyCount (
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
