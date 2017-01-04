/**
* @Author: AuthorName
* @Date:   2016-12-29T16:05:50+08:00
* @Email:  Email
* @Project: projectName
* @Filename: router.js
* @Last modified by:   AuthorName
* @Last modified time: 2017-01-04T16:24:30+08:00
* @License: tree
*/

import vSidebar from './components/vSidebar.vue'
const Foo = { template: '<div>foo</div>' }
export default [
  // {
  //   path: '/',
  //   component: (resolve) => {
  //     require(['./App'],resolve)
  //   },
  // },
  {
    path:'/listsw',
    component: Foo
  }
]
