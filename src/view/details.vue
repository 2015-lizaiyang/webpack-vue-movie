<template>
  <div class="details-box">
    <div class="details-header">
      <h3 class="title-details">{{ theme.title }}</h3>
      <div class="right">
        <v-user-header :userImg="avatarUrl" :userName="loginname" :userTime="theme.create_at | getLastTimeStr(true)">
          <div slot='two'>
            <a class="share-btn" :class="{'actives':!actives}" @click="Collect">{{ actives?'收藏':'取消收藏' }}</a>
            <p class="vusit-count">{{ theme.visit_count }}次浏览</p>
          </div>
        </v-user-header>
      </div>
    </div>
    <div class="details-content" v-html="theme.content"></div>
    <v-comment :replies="replies" :accesstoken ="accesstoken" :userId="userId" :paramsId="paramsId"></v-comment>
    <div class="reply-form">
      <form @submit.prevent="replyTheme">
        <textarea v-model="replyContent"></textarea>
        <button class="button button-glow button-rounded button-highlight" type="submit">确定</button>
      </form>
    </div>
    <v-confirm :count="count">
      <h3 slot="one">{{ contents }}</h3>
      <div class="confirm-button" slot="footer">
        <button @click.stop.prevent="confirmHandler">确认</button>
      </div>
    </v-confirm>
  </div>
</template>
<script type="text/javascript">
import VComment from '../components/vComment';
import vUserHeader from '../components/vUserHeader';
import vConfirm from '../components/vConfirm.vue';
import api from '../api.js';
export default {
  data() {
    return {
      paramsId:this.$route.params.id,
      theme: {},
      replies: [],
      avatarUrl:"",
      loginname:"",
      replyContent: "",
      actives: true,
      contents: null,
      count: null
    }
  },
  components: {
    VComment,
    vUserHeader,
    vConfirm
  },
  props: {
    accesstoken: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  created() {
    if (this.paramsId!==undefined) {
      this.getDataDetails()
    };
  },
  beforeDestroy() {
  },
  watch: {
    '$route' (to, from) {
      this.paramsId = to.params.id;
      if (to.params.id!==undefined) {
        this.getDataDetails()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    // 当路由离开时候让标题为null
    if (this!==undefined) {
      this.$store.commit('NotitleeText');
      next();
    }
  },
  methods: {
    confirmHandler(){
      this.count = false;
    },
    getDataDetails () {
      // var url = 'https://cnodejs.org/api/v1/topic/'+this.paramsId;
      // this.$http.get(url)
      // .then((res) => {
      //   this.theme = res.data.data;
      //   if (this.theme.is_collect) {
      //     this.actives=false;
      //   }
      //   this.avatarUrl = this.theme.author.avatar_url;
      //   this.loginname = this.theme.author.loginname;
      //   this.replies = this.theme.replies;
      //   this.$store.commit('titlesText',this.theme.tab);
      // },Response => {
      //   this.contents = Response.body.error_msg;
      //   this.count = true;
      // });
      var _this = this;
      api.topic.getTopic(
        _this,
        this.paramsId, 
        data => {
        this.theme = data.data;
        if (data.success) {
          if (this.theme.is_collect) {
            this.actives=false;
          };
          this.avatarUrl = this.theme.author.avatar_url;
          this.loginname = this.theme.author.loginname;
          this.replies = this.theme.replies;
          this.$store.commit('titlesText',this.theme.tab);
        }
      }, err => {
        this.contents = Response.body.error_msg;
        this.count = true;
      });

    },
    replyTheme () {
      var url = "https://cnodejs.org/api/v1/topic/"+this.paramsId+"/replies";
      this.$http.post(url,{accesstoken:this.accesstoken,content:this.replyContent,reply_id:this.paramsId})
      .then((res) => {
        if (res.data.success) {
          this.replyContent = "";
          this.getDataDetails();
        }
      }, Response => {
        this.contents = Response.body.error_msg;
        this.count = true;
      });
    },
    Collect() {
      console.log(this.accesstoken);
      if (this.accesstoken!=="") {
        if (this.actives) {
        var url = "https://cnodejs.org/api/v1/topic_collect/collect";
          this.$http.post(url,
            {accesstoken:this.accesstoken,topic_id:this.theme.id})
          .then(res => {
            if (res.data.success) {
              // this.$store.commit('increment',"收藏成功",2);
              this.contents = "收藏成功";
              this.count = true;

            }
          }, Response => {
            this.contents = Response.body.error_msg;
            this.count = true;
          });
          this.actives = false;

        }else {
          var urls = "https://cnodejs.org/api/v1/topic_collect/de_collect";
          this.$http.post(urls,
            {accesstoken:this.accesstoken,topic_id:this.theme.id})
          .then(res => {
            if (res.data.success) {
              this.contents = "取消成功";
              this.count = true;
            }
          }, Response => {
            this.contents = Response.body.error_msg;
            this.count = true;
          });
          this.actives = true;
        }
      }else {
        this.contents = '你还未登录！'
        this.count = true;
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.details-box {
  margin: 55px 5px 10px 5px;

  @at-root {
    .details-header {
      padding: 6px 8px;
      border-bottom: 1px solid #e5e5e5;
    }

    .title-details {
      margin: 0 0 10px 0;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      text-align: left;
    }

    .details-content {
      overflow: hidden;
      padding: 20px 10px 10px 10px;
      margin: 0 10px;
    }
  }
}

.share-btn {
  display: block;
  background-color: #e74c3c;
  font-size: 14px;
  // line-height: 1.6;
  border-radius: 4px;
  padding: 4px 2px;
  margin: 0 6px 3px 0;
  text-align: center;
  color: #fff;
}
.vusit-count {
  font-size: 14px;
}

.reply-form {

  textarea {
    display: block;
    width: 100%;
    min-height: 80px;
    // resize: none;
    margin: 12px 0 5px 0;
    border: 1px solid #d5dbdb;
    color: #666;
    border-radius: 3px;
    padding: 4px 6px;
  }

  button {
    max-width: 160px;
    width: 100%;
    height: 28px;
    padding: 0 16px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 12px;
    line-height: 28px;
  }
}
.actives {
  color: #fff;
  background-color: #999;
}

</style>