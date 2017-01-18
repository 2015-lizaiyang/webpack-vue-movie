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
Vue.use(Vuex)
Vue.use(VueResource)
var router =  new VueRouter({
	// mode: 'history',
  base: __dirname,
  routes: RouterMap
});

var store = new Vuex.Store({
  state: {
    // 控制长期登录
    isLogin: localStorage.loginname ? true : false,
    // 解决路由到话题页面时，标题为这个话题的分类
    titleContent: null
  },
  mutations: {
    IsLogin: (state) => {
      state.isLogin = localStorage.loginname ? true : false;
    },
    titlesText: (state,tab) => {
      function tabToName(tab){
        var name = "";
        switch(tab) {
          case "good": name  = "置顶"; break;
          case "ask": name   = "问答"; break;
          case "share": name = "分享"; break;
          case "job": name   = "招聘"; break;
          default: name      = "未能识别"
        }
        return name;
      };
      state.titleContent = tabToName(tab);
    },
    NotitleeText: (state) => {
      state.titleContent = null;
    } 
  }
});

window.Bus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
});
