/**
* @Author: lizaiyang
* @Date:   2016-12-31T20:55:00+08:00
* @Email:  lizaiyangs@outlook.com
* @Project: vue-movie
* @Filename: main.js
* @Last modified by:   AuthorName
* @Last modified time: 2017-01-04T16:44:42+08:00
* @License: tree
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import filters from './assets/js/filters'
import './assets/css/button.css'
// import RouterMap from './router'
import App from './App.vue'
import vSidebar from './components/vSidebar.vue'
import list from './view/ContnentList.vue'
// import '../src/assets/js/rem.js'
Object.keys(filters).forEach((k) => {
  Vue.filter(k,filters[k])
})
Vue.config.debug = true;
Vue.use(VueRouter)
Vue.use(VueResource)
var router =  new VueRouter({
	// mode: 'history',
  base: __dirname,
  routers: [
  // {path:'/',component:App},
     { path: '/foo', component: vSidebar,beforeEnter: (to, from, next) => {
        console.log(to);
        next()
      } },
     { path: '/foosw', component: list },
  ]
});
router.beforeEach((to, from, next) => {
	next()
  // ...
})

new Vue({
  el: '#app',
	router,
  components: { App },
})
