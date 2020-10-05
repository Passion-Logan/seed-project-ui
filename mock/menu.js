export default {
  '/api/auth/user/nav': {
    menuData: [
      {
        path: '/',
        icon: 'SmileOutlined',
        redirect: '/welcome',
      },
      {
        path: '/user',
        icon: 'SmileOutlined',
        children: [
          {
            name: 'login',
            path: '/user/login'
          }
        ]
      },
      {
        path: '/welcome',
        hideInMenu: true,
        icon: 'SmileOutlined',
        name: 'welcome',
      },
      {
        path: '/admin',
        icon: 'SmileOutlined',
        name: 'admin',
        children: [
          {
            path: '/admin/sub-page',
            icon: 'SmileOutlined',
            name: 'sub-page',
          }
        ]
      },
      {
        name: 'list.table-list',
        icon: 'SmileOutlined',
        path: '/list',
      },
      {
        path: '/test',
        icon: 'smSmileOutlinedile',
        name: 'test',
        children: [
          {
            path: '/test/sub-test',
            icon: 'SmileOutlined',
            name: 'sub-test',
          }
        ]
      },
      {
        name: 'system',
        icon: 'SettingOutlined',
        path: '/system',
        children: [
          {
            path: '/system/user',
            name: 'system-user',
          },
          {
            path: '/system/role',
            name: 'system-role',
          },
          {
            path: '/system/menu',
            name: 'system-menu',
          },
          {
            path: '/system/globle',
            name: 'system-globle',
          },
        ],
      },
    ],
  },
};