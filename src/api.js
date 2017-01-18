import Vue from "vue";
import VueResource from 'vue-resource';
Vue.use(VueResource);
var url = "https://cnodejs.org/api/v1/";
export default {
  topic: {
    getTopicList(_this,opts,callback){
      _this.$http.get(url+'topics',opts).then( res => {
        callback(res.data)
      },Response => {
        callback(Response.body.error_msg)
      })
    },
    getTopic(_this,opts,callback) {
      _this.$http.get(url+"topic/"+opts).then( res => {
        callback(res.data);
      },Response => {
        callback(Response.body.error_msg)
      })
    }
  }
}
