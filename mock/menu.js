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




// export default {
//   '/api/auth/user/nav': {
//     menuData: [
//       {
//         path: '/user',
//         component: '../layouts/UserLayout',
//         routes: [
//           {
//             name: 'login',
//             path: '/user/login',
//             component: './user/login',
//           },
//         ],
//       },
//       {
//         path: '/',
//         component: '../layouts/SecurityLayout',
//         routes: [
//           {
//             path: '/',
//             component: '../layouts/BasicLayout',
//             authority: ['admin', 'user'],
//             routes: [
//               {
//                 path: '/',
//                 redirect: '/welcome',
//               },
//               {
//                 path: '/welcome',
//                 name: 'welcome',
//                 icon: 'smile',
//                 component: './Welcome',
//               },
//               {
//                 path: '/admin',
//                 name: 'admin',
//                 icon: 'crown',
//                 component: './Admin',
//                 authority: ['admin'],
//                 routes: [
//                   {
//                     path: '/admin/sub-page',
//                     name: 'sub-page',
//                     icon: 'smile',
//                     component: './Welcome',
//                     authority: ['admin'],
//                   },
//                 ],
//               },
//               {
//                 name: 'list.table-list',
//                 icon: 'table',
//                 path: '/list',
//                 component: './ListTableList',
//               },
//               {
//                 name: 'test',
//                 icon: 'smile',
//                 path: '/test',
//                 routes: [
//                   {
//                     path: '/test/sub-test',
//                     name: 'sub-test',
//                     icon: 'smile',
//                     component: './Welcome',
//                   },
//                 ],
//               },
//               {
//                 name: 'system',
//                 icon: 'SettingOutlined',
//                 path: '/system',
//                 routes: [
//                   {
//                     path: '/system/user',
//                     name: 'system-user',
//                     component: './system/user',
//                   },
//                   {
//                     path: '/system/role',
//                     name: 'system-role',
//                     component: './system/role',
//                   },
//                   {
//                     path: '/system/menu',
//                     name: 'system-menu',
//                     component: './system/menu',
//                   },
//                   {
//                     path: '/system/globle',
//                     name: 'system-globle',
//                     component: './system/globle',
//                   },
//                 ],
//               },
//               {
//                 component: './404',
//               },
//             ],
//           },
//           {
//             component: './404',
//           },
//         ],
//       },
//       {
//         component: './404',
//       },
//     ],
//   },
// };
