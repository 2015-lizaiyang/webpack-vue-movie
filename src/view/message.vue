<template lang="html">
  <div class="tab-topic">
    <ul class="tab-list">
      <li v-for="(vo,index) in allMessages" :class="{'active':activeitem === index}" @click="changeItem(index)">{{ index === 0?'已读信息':'未读信息' }}<span v-if="index === 1 && unreadCount > 0">({{ unreadCount }})</span></li>
    </ul>
    <div v-for="(item,index) in allMessages" class="tabpanel" :class="{'actives': activeitem === index}">
      <ul class="tab-content">
        <li v-for="(vo,indexs) in item">
          <div class="header">
            <v-user-header :userImg="vo.author.avatar_url" :userName="vo.author.loginname" :userTime="text" :openUser="openUser" :contentId = "vo.id">
              <p class="time-content" slot="two">{{ vo.reply.create_at | getLastTimeStr(true)}}</p>
            </v-user-header>
          </div>
          <div class="content">
              <div class="" v-html="vo.reply.content">
              </div>
              <div class="related-topic" >
                <h4 @click="getDetails(vo)">{{vo.topic.title}}</h4>
              </div>
            </div>
        </li>
      </ul>
      <button v-if="index === 1 && unreadCount > 0" class="button button-glow button-rounded button-highlight" type="submit">标记为全读</button>
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
import vConfirm from '../components/vConfirm.vue';
import vUserHeader from '../components/vUserHeader.vue';
import api from '../api.js';
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        activeitem: 0,
        allMessages: [],
        contents: null,
        count: null,
        openUser:null,
        text: "在回复中@了你"
      }
    },
    props: {
      accesstoken:{
        type: String,
      },
    },
    computed: mapState({
      unreadCount: state => state.unreadCount,
    }),
    components: {
      vConfirm,
      vUserHeader
    },
    created () {
      this.getMessages()
    },
    methods: {
      getMessages () {
        // var url = 'https://cnodejs.org/api/v1/messages?accesstoken=+'+ this.accesstoken;
        // this.$http.get(url)
        // .then( res => {
        //   console.log(Object.keys(res.data.data));
        //   Object.keys(res.data.data).forEach((item, index)=>{
        //     this.$set(this.allMessages,index, res.data.data[item])
        //   })
        // }, Response => {
        //   this.contents = Response.body.error_msg;
        //   this.count = true;
        // });
        var _this = this;
        api.message.messages(_this,
          this.accesstoken, 
          data => {
            Object.keys(data.data).forEach((item, index)=>{
              this.$set(this.allMessages,index, data.data[item])
            });
            this.$store.commit('activeLoadings',false);
            alert(1);
            // console.log(this.allMessages);
          }, err => {
            this.contents = err;
            this.count = true;
        });
      },
      confirmHandler(){
        this.count = false
      },
      changeItem(index) {
        this.activeitem = index;
      },
      getDetails(obj){
        this.$router.push({path:'/topic/'+obj.topic.id});
      }
    }
  }
</script>
<style type="text/css" lang="sass" scoped>
.tab-topic {
    margin: 65px 0 20px 0;
}
 .tab-list {
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  margin: 0 0 15px 0;
  li {
    float: left;
    width: 50%;
    text-align: center;
    color: #333;
    font-size: 16px;
    line-height: 36px;
    height: 36px;
    box-sizing: border-box;
    padding: 0 0 2px 0;

    &:first-child {
      border-right: 1px solid #d4d4d4;
    }

    &.active {
      border-bottom: 2px solid #42b983;
      color: #42b983;
    }
  }
}

.tab-content {
  cursor: pointer;
  padding: 0 10px 10px 10px;
  li {
    border-bottom: 1px solid #d4d4d4;
    padding: 8px 0 8px 0;
  }

  @at-root {
    .time-content {
      float: right;
    }

    .name-box span{
      max-width: 170px;
     display:block;
     white-space:nowrap; 
     overflow:hidden; 
     text-overflow:ellipsis;
    }
  }
} 
.button {
  display: block;
  width: 50%;
  padding: 0;
  font-family: '微软雅黑';
  margin: 0 auto;
}

.tabpanel {
    display: none;

}
.actives {
  display: block;
}
</style>