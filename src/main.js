

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import filters from './assets/js/filters'
import './assets/css/button.css'
import App from './App.vue'
import '../src/assets/js/rem.js'
Object.keys(filters).forEach((k) => {
  Vue.filter(k,filters[k])
})
Vue.use(VueRouter)
Vue.use(VueResource)
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
