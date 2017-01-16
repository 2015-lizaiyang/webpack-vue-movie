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
  </div>
</template>
<script type="text/javascript">
import VComment from '../components/vComment';
import vUserHeader from '../components/vUserHeader'
export default {
  data() {
    return {
      paramsId:this.$route.params.id,
      theme: {},
      replies: [],
      avatarUrl:"",
      loginname:"",
      replyContent: "",
      actives: true
    }
  },
  components: {
    VComment,
    vUserHeader
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
    var titlesw = this.tabToName(this.theme.tab);
    Bus.$emit('tite-er',titlesw)
  },
  watch: {
    '$route' (to, from) {
      this.paramsId = to.params.id;
      if (to.params.id!==undefined) {
        this.getDataDetails()
      }
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     var url = 'https://cnodejs.org/api/v1/topic/'+to.params.id;
  //     this.$http.get(url)
  //     .then((res) => {
  //         this.theme = res.data.data;
  //     },(err) => {
  //       console.log(err)
  //     })
  //   })
  // },
  methods: {
    getDataDetails () {
      var url = 'https://cnodejs.org/api/v1/topic/'+this.paramsId;
      this.$http.get(url)
      .then((res) => {
        this.theme = res.data.data;
        this.avatarUrl = this.theme.author.avatar_url;
        this.loginname = this.theme.author.loginname;
        this.replies = this.theme.replies;
      },(err) => {
        console.log(err)
      })
    },
    replyTheme () {
      var url = "https://cnodejs.org/api/v1/topic/"+this.paramsId+"/replies";
      this.$http.post(url,{accesstoken:this.accesstoken,content:this.replyContent,reply_id:this.paramsId})
      .then((res) => {
        if (res.data.success) {
          this.replyContent = "";
          this.getDataDetails();
        }
      }, err => {
        console.log(this.accesstoken);
        console.log(err);
      });
    },
    tabToName(tab){
      var name = "";
      switch(tab) {
        case "good": name = "置顶"; break;
        case "ask": name = "问答"; break;
        case "share": name = "分享"; break;
        case "job": name = "招聘"; break;
        default: name="未能识别"
      }
      return name;
    },
    Collect() {
      if (this.actives) {
      var url = "https://cnodejs.org/api/v1/topic_collect/collect";
        this.$http.post(url,
          {accesstoken:this.accesstoken,topic_id:this.theme.id})
        .then(res => {
          if (res.data.success) {
            alert('收藏成功')
          }
        });
        this.actives = false;

      }else {
        var urls = "https://cnodejs.org/api/v1/topic_collect/de_collect";
        this.$http.post(urls,
          {accesstoken:this.accesstoken,topic_id:this.theme.id})
        .then(res => {
          if (res.data.success) {
            alert('取消成功')
          }
        });
        this.actives = true;
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