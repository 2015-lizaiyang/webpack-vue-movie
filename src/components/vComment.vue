<template lang="html">
  <div class="comment-list">
    <div class="header-box">
      <h3>评论 已有 <span>{{ replies.length }}</span>回复</h3>
    </div>
      <ul class="comment-box" v-if="replies.length > 0">
        <li v-for="(vo,index) in replies" :class="{'active-li':index==toggleVal}">
          <div class="user-box">
            <v-user-header :userImg="vo.author.avatar_url" :userName="vo.author.loginname" :userTime="vo.create_at | getLastTimeStr(true)">
              <div slot='two'>
                <div class="like-btn" @click="UpLike(index)">
                  <i class="iconfont">&#xe6ff;</i>{{ vo.ups.length }}
                </div>
                <div class="reply-btn" @click="ToggleReply(index,vo)">
                  <i class="iconfont">&#xe621;</i>
                </div>
              </div>
            </v-user-header>
          </div>
          <div class="reply-content" v-html="vo.content"></div>
          <div class="reply-form" :class="{'active-reply':index==toggleVal}">
            <form @submit.prevent="Replys(index,vo)">
              <textarea type="text" v-model="replyContents"></textarea>
              <button class="button button-glow button-rounded button-highlight" type="submit">确定</button>
            </form>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import vUserHeader from './vUserHeader.vue'
export default {
  data() {
    return {
      replyContent:'',
      toggleVal: null,
      replyContents:""
    }
  },
  props: {
    replies: {
      type: Array,
    },
    accesstoken: {
      type: String,
    },
    loginname: {
      type: String
    },
    userId: {
      type: String,
    },
    paramsId: {
      type: String,
    }
  },
  components: {
    vUserHeader
  },
  created(){
  },
  methods: {
    ToggleReply(index,vo){
      this.replyContents = "@"+vo.author.loginname;
      if (this.toggleVal==index) {
        this.toggleVal = null;
        return;
      };
      this.toggleVal =index
    },
    UpLike(index) {
      if (this.accesstoken==undefined) {
        this.$router.push({name:'login'});
        return;
      };
      console.log(this.userId);
      var reply = this.replies[index];
      if (this.loginname !=reply.author.loginname ) {
        var url = "https://cnodejs.org/api/v1/reply/"+reply.id+"/ups";
        this.$http.post(url,{accesstoken:this.accesstoken})
        .then((res) => {
          if (res.data.success) {
            if (res.data.action === "down") {
              var index = reply.ups.indexOf(this.userId);
              reply.ups.splice(index, 1);
            }else {
              reply.ups.push(this.userId);
            }
          }
        },Response => {
          console.log(Response.body.error_msg);
        })
      }else {
        alert("不能为自己点赞哦。^_^");
      }
    },
    Replys(index) {
      var replyId = this.replies[index].id
      var url = "https://cnodejs.org/api/v1/topic/"+this.paramsId+"/replies";
      var optionsReply = {
        accesstoken: this.accesstoken,
        content: this.replyContents,
        reply_id: replyId // 回复别人的评论
      };
      this.$http.post(url,optionsReply)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          this.$parent.getDataDetails();
          this.toggleVal=null
        }
      }, Response => {
        console.log(Response.body.error_msg);
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.header-box {
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 3px;

  h3 {
    font-size: 16px;
    line-height: 22px;
    color: #222;
    font-weight: normal;
  }
}
.comment-box {
  li {
    border-bottom: 1px solid #f0f0f0;
    overflow: hidden;
    padding: 6px;
    position: relative;
    transition: all .5s linear;

    &.active-li {
      padding-bottom:110px;
      transition: all .1s linear;
    }

    @at-root {
      .user-box {
        margin: 10px 0;
      }

      .like-btn {
        margin: 3px 0 0 0;
        i {
          font-size: 15px;
        }

      }
      .reply-btn {
        margin: 0 0 0 5px;
        i {
          font-size: 20px;
        }
      }
      .reply-form {
        position: absolute;
        bottom: -40px;
        left: 0;
        width: 100%;
        padding: 0 6px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        transform-style:preserve-3d;
        -moz-transform-style:preserve-3d;
        -webkit-transform-style:preserve-3d;
        transform-origin: 50% 0;
        -webkit-transform-origin: 50% 0;
        transition: all .2s linear;
        -webkit-transition: all .2s linear;
        transform:perspective(80px) rotateX(-90deg);
        -moz-transform:perspective(80px) rotateX(-90deg);
        -webkit-transform:perspective(80px) rotateX(-90deg);
        textarea {
          display: block;
          width: 100%;
          resize: none;
          margin: 12px 0 5px 0;
          border: 1px solid #d5dbdb;
          height: 60px;
          color: #666;
          border-radius: 3px;
          padding: 4px 6px;
        }

        button {
          padding: 0;
          width: 80px;
          color: #fff;
          border: 0;
          border-radius: 5px;
          font-size: 12px;
          height: 28px;
          line-height: 28px;
        }
      }
      .active-reply {
        bottom: 8px;
        -webkit-transition: all .3s linear;
        transform:perspective(80px) rotateX(0deg);
        -moz-transform:perspective(80px) rotateX(0deg);
        -webkit-transform:perspective(80px) rotateX(0deg);
      }
    }
  }
}
</style>
