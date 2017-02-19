import Vue from "vue";
import VueResource from 'vue-resource';
Vue.use(VueResource);
var url = "https://cnodejs.org/api/v1/";
export default {
  // 主题
  
  topic: {
    // 主题首页
    getTopicList(_this,opts,callback,callbacksError){
      _this.$http.get(url+'topics/?tab='+opts.tab+'&page='+opts.page+'&limit='+opts.limit).then( res => {
        callback(res.data)
      },Response => {
        callbacksError(Response.body.error_msg)
      })
    },
    // 主题详情
    getTopic(_this,opts,callback,callbacksError) {
      _this.$http.get(url+"topic/"+opts).then( res => {
        callback(res.data);
      },Response => {
        callbacksError(Response.body.error_msg)
      })
    },
    // 新建主题
    newTopic(_this,opts,callback,callbacksError){
      _this.$http.post(url+'topics').then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    // 编辑主题
    updateTopic(_this,opts,callback,callbacksError){
      _this.$http.post(url+'topics/update').then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    }
  },
  // 主题收藏
  topicCollect: {
    // 收藏主题
    collect(_this,querys,callback,callbacksError){
      _this.$http.post(url+'topic_collect/collect',querys).then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    //  取消主题
    deCollect(_this,querys,callback,callbacksError){
      _this.$http.post(url+'topic_collect/de_collect',querys).then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    // 用户所收藏的主题
    UserCollect(_this,opts,callback,callbacksError){
      _this.$http.get(url+'topic_collect/'+opts).then( res => {
        callback(res.data);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    }
  },
  // 评论
  replies:{
    // 新建评论
    reply(_this,opts,querys,callback,callbacksError){
      _this.$http.post(url+'topic/'+opts+'/replies',querys).then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    // 为评论点赞
    ups(_this,opts,querys,callback,callbacksError){
      _this.$http.post(url+'reply/'+opts+'/ups',querys).then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
  },
  // 用户
  user:{
    //  用户详情
    userDetails(_this,opts,callback,callbacksError){
      _this.$http.get(url+'user/'+opts).then( res => {
        callback(res.data);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    // 验证 accessToken 的正确性
    accessToken(_this,querys,callback,callbacksError){
      _this.$http.post(url+'accesstoken',querys).then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
  },
  // 消息通知
  message:{
    // 获取未读消息数
    messageCount(_this,querys,callback,callbacksError){
      _this.$http.get(url+'message/count?accesstoken=+'+querys).then( res => {
        callback(res.data);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    // 获取已读和未读消息
    messages(_this,opts,callback,callbacksError){
      _this.$http.get(url+'messages?accesstoken=+'+opts).then( res => {
        callback(res.data);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
    // 标记全部已读
    markAll(_this,opts,callback,callbacksError){
      _this.$http.post(url+'message/mark_all').then( res => {
        callback(res.body);
      }, Response => {
        callbacksError(Response.body.error_msg)
      });
    },
  }
}