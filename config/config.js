// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: 'test',
              icon: 'smile',
              path: '/test',
              routes: [
                {
                  path: '/test/sub-test',
                  name: 'sub-test',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              name: 'system',
              icon: 'SettingOutlined',
              path: '/system',
              routes: [
                {
                  path: '/system/user',
                  name: 'system-user',
                  component: './system/user',
                },
                {
                  path: '/system/role',
                  name: 'system-role',
                  component: './system/role',
                },
                {
                  path: '/system/menu',
                  name: 'system-menu',
                  component: './system/menu',
                },
                {
                  path: '/system/globle',
                  name: 'system-globle',
                  component: './system/globle',
                },
                {
                  path: '/system/log',
                  name: 'system-log',
                  component: './system/log',
                },
                {
                  path: '/system/settings',
                  name: 'system-setting',
                  component: './user/setting',
                },
              ],
            },
            // {
            //   name: 'account',
            //   path: '/account',
            //   routes: [
            //     {
            //       path: '/account/settings',
            //       name: '个人设置',
            //       component: './user/setting',
            //     },
            //   ],
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
