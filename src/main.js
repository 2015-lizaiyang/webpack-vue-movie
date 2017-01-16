/**
* @Author: lizaiyang
* @Date:   2016-12-31T20:55:00+08:00
* @Email:  lizaiyangs@outlook.com
* @Project: vue-movie
* @Filename: main.js
* @Last modified by:   AuthorName
* @Last modified time: 2017-01-05T14:17:08+08:00
* @License: tree
*/

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import filters from './assets/js/filters'
import './assets/css/button.css'
import RouterMap from './router'
import App from './App.vue'
Object.keys(filters).forEach((k) => {
  Vue.filter(k,filters[k])
});
Vue.config.debug = true;
Vue.use(VueRouter)
Vue.use(VueResource)
var router =  new VueRouter({
	// mode: 'history',
  base: __dirname,
  routes: RouterMap
});
window.Bus = new Vue();
new Vue({
  el: '#app',
	router,
  components: { App },
})
