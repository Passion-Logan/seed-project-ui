import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority, clearAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setToken, clearToken } from '@/utils/token';
// import router from 'umi/router';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      // 登录成功以后更新权限，跳转页面
      if (response.token) {
        // reloadAuthorized();
        setToken(response.token)
        window.location.href = '/';
        // yield put(routerRedux.push('/'));
      }

      // if (response.status === 'ok') {
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params;

      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);

      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);

      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = '/';
      //       return;
      //     }
      //   }

      //   history.replace(redirect || '/');
      // }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      clearAuthority();
      clearToken();

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   setAuthority(payload.currentAuthority);
    //   return { ...state, status: payload.status, type: payload.type };
    // },
    // 登录
    changeLoginStatus(state, { payload }) {
      const statusCode = 'ok';
      const user = 'admin';
      // 设置权限
      setAuthority(user);
      return {
        ...state,
        status: statusCode,
        type: 'account',
      };
    },
  },
};
export default Model;
