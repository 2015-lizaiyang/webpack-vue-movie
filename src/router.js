/**
* @Author: AuthorName
* @Date:   2016-12-29T16:05:50+08:00
* @Email:  Email
* @Project: projectName
* @Filename: router.js
* @Last modified by:   AuthorName
* @Last modified time: 2017-01-05T14:09:14+08:00
* @License: tree
*/

export default [
  {
    path: '/', // 主入口
    name: 'admin',
    components: {
      global: resolve => require(['./view/admin.vue'],resolve) 
    },
    children: [
      {
        path: '/list',
        name: 'list',
        components: {
          part: resolve => require(['./view/ContnentList.vue'],resolve)
        }
      },
      {
        path: '/topic/:id',
        name: 'topic',
        components: {
           part: resolve => require(['./view/details.vue'],resolve)
        }
      },
      {
        path:'/login',// 退出登录
        name:'login',
        components: {
           part: resolve => require(['./view/login.vue'],resolve)
        }
      },
      {
        path: '/topics',
        name: 'topics',
        components: {
          part: resolve => require(['./view/topics.vue'],resolve)
        }
      },
      {
        path: '/userDetails/:username',
        name: 'userDetails',
        components: {
          part: resolve => require(['./view/userDetails.vue'],resolve)
        }
      },
      {
        path: '/message',
        name: 'message',
        components: {
          part: resolve => require(['./view/message.vue'],resolve)
        }
      }
    ]
  }
]
