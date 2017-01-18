<template lang="html">
  <div class="tab-topic">
    <ul class="tab-list">
      <li v-for="(vo,index) in allMessages" :class="{'active':this.activeitem === index}" @click="changeItem(index)">{{ index === 0?'创建的话题':'参与的话题' }}</li>
    </ul>
    <div v-for="(item,index) in allMessages" class="tabpanel" :class="{'active':this.activeitem === index}">
      <ul class="tab-content">
        <li v-for="vo in item">
          <div class="header">
            <v-user-header :userImg="vo.author.avatar_url" :userName="vo.author.loginname" :userTime="vo.title" :openUser="openUser" :contentId = "vo.id">
              <p class="time-content" slot="two">{{ vo.last_reply_at | getLastTimeStr(true)}}</p>
            </v-user-header>
          </div>
        </li>
      </ul>
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
  export default {
    data() {
      return {
        activeItem: 0,
        allMessages: [],
        contents: null,
        count: null,
        openUser:null
      }
    },
    props: {
      accesstoken:{
        type: String,
      }
    },
    components: {
      vConfirm
    },
    created () {
      this.getMessages()
    },
    methods: {
      getMessages () {
        console.log(this.accesstoken)
        var url = 'https://cnodejs.org/api/v1/messages?accesstoken=+'+ this.accesstoken;
        this.$http.get(url)
        .then( res => {
          console.log(res.data.data)
          console.log(Object.keys(res.data.data));
          Object.keys(res.data.data).forEach((item, index)=>{
            this.$set(this.allMessages,index, res.data.data[item])
          })
        }, Response => {
          this.contents = Response.body.error_msg;
          this.count = true;
        })
      },
      confirmHandler(){
        this.count = false
      }
    }
  }
</script>
<style type="text/css">
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
</style>