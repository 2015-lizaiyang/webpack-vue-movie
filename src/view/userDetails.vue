<template lang="html">
  <div class="details-boxs">
    <div>
      <img :src="userDetails.avatar_url" alt="">
      <p>{{ userDetails.loginname }}</p>
    </div>
    <div class="rests-details">
      <ul>
        <li>
          <span>{{ userDetails.create_at | getLastTimeStr(true)}}</span>
          <span>{{ userDetails.score }}</span>
        </li>
        <li>
          <span>注册时间：</span>
          <span>积分：</span>
        </li>
      </ul>
    </div>
    <div class="tab-topic">
      <ul class="tab-list">
        <li v-for="(vo,index) in detailsTitle" :class="{'active':activeitem === index}" @click="changeItem(index)">{{ index === 0?'创建的话题':'参与的话题' }}</li>
      </ul>
      <div v-for="(item,index) in detailsTitle" class="tabpanel" :class="{'active':activeitem === index}">
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
    </div>
  </div>
</template>
<script type="text/javascript">
import vUserHeader from '../components/vUserHeader.vue';
  export default {
    data() {
      return {
        activeitem: 0,
        userDetails: {},
        detailsTitle: [],
        userName: null,
        openUser: true
      }
    },
    components: {
      vUserHeader,
    },
    watch: {
    '$route' (to, from) {
      this.userName = to.params.username;
      this.getUserDetails();
      }
    },
    created(){
      this.userName = localStorage.loginname;
      this.getUserDetails(localStorage.loginname);
    },
    methods: {
      getUserDetails(names){
        var userName = this.userName || localStorage.loginname;
        var url = "https://cnodejs.org/api/v1/user/" + userName;
        this.$http.get(url).then((res) => {
          this.userDetails = res.data.data;
          this.$set(this.detailsTitle,0,this.userDetails.recent_topics);
          this.$set(this.detailsTitle,1,this.userDetails.recent_replies);
        })
      },
      changeItem(index) {
        this.activeitem = index;
      }
    }
  }
</script>
<style type="text/css" lang="sass">
.details-boxs {
  margin: 65px 0 0 0;

  img {
    display: block;
    width: 96px;
    height: 96px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0,0,0,.5);
  }
  p {
    text-align: center;
    line-height: 40px;
    color: #333;
  }
}

.rests-details {
  width: 100%;
  overflow: hidden;

  > ul {
    float: right;
    margin: 0 10px 0 0;
    line-height: 20px;

    li {
      float: right;
    }

    li:first-child {
      span {
        display: block;
        text-align: left;
      }
    }

    li:last-child {
      span {
        display: block;
        text-align: right;
      }
    }
  }
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

.tabpanel {
  display: none;
  &.active {
    display: block;
  }
}
</style>