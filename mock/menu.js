export default {
  '/api/auth/user/nav': {
    menuData: [
      {
        path: '/',
        icon: 'smile',
        redirect: '/welcome',
      },
      {
        path: '/user',
        icon: 'smile',
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
        icon: 'smile',
        name: 'welcome',
      },
      {
        path: '/admin',
        icon: 'smile',
        name: 'admin',
        children: [
          {
            path: '/admin/sub-page',
            icon: 'smile',
            name: 'sub-page',
          }
        ]
      },
      {
        name: 'list.table-list',
        icon: 'smile',
        path: '/list',
      },
      {
        path: '/test',
        icon: 'smile',
        name: 'test',
        children: [
          {
            path: '/test/sub-test',
            icon: 'smile',
            name: 'sub-test',
          }
        ]
      },
      {
        name: 'system',
        icon: 'setting',
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