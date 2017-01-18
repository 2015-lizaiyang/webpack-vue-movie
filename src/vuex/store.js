import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(vuex);
var state = {
  notes: [],
  activeNote: {}
}
var mutations = {

}
export default new Vuex.Store({
  state,
  mutations
});