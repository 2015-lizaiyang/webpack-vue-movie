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
    path: '/',
    components: {
      global: resolve => require(['./view/login.vue'], resolve),
    }
  },
  {
    path:'/admin',
    components: {
      global: resolve => require(['./view/admin.vue'], resolve),
    },
    children: [
      {
        path:'/admin/listsw',
        components: {
          part: resolve => require(['./components/vSidebar.vue'],resolve)
        }
      }
    ]
  }

]
