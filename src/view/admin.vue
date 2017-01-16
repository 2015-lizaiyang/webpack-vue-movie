<template lang="html">
  <div class="">
    <div class="admin-animation" :class="{'animation':this.shows}">
      <header class="header">
        <div class="menu-btn" @click='ShowsBox'>
          <i class="iconfont">&#xe67c;</i>
        </div>
        <div class="send-btn" @click="LoginBtn">
          <i class="iconfont">&#xe674;</i>
        </div>
        <router-link to='/login' class="send-btn">
        </router-link>
        <h2>{{ titless || temTitle }}</h2>
        <h2>{{ titless }}</h2>
      </header>
      <transition name="fade">
        <keep-alive>
          <router-view name='part' :accesstoken="accesstoken" :loginname="loginname" :userId="userId"></router-view>
        </keep-alive>
      </transition>
    </div>
    <v-sidebar :shows='shows' :isLogin="isLogin" :loginname ="loginname" :avatarUrl ="avatarUrl"></v-sidebar>
    <v-comment :isShowConfirm="isShowConfirm"></v-comment>
  </div>

</template>

<script>
import vSidebar from '../components/vSidebar.vue';
import vComment from '../components/vConfirm.vue'
export default {
  data: function () {
    return {
      title: '',
      titless: null,
      shows: true,
      isLogin: localStorage.loginname ? true : false,
      loginname: localStorage.loginname,
      avatarUrl: localStorage.avatar_url,
      accesstoken: localStorage.accesstoken,
      userId: localStorage.id,
      isShowConfirm: false
    }
  },
   props: {
    temTitle: {
      type: String,
    }
  },
  components: {
    vSidebar,
    vComment
  },
  created () {
    this.shows = true;
    Bus.$on('test',this.swqqq);
    Bus.$on('LoginActive',this.LoginGo);
    Bus.$on('logout',this.logout);
    Bus.$on('tite-er',function(msg) {
      this.titless = msg
    });
    Bus.$on('confirms',function(msg) {
      this.isShowConfirm = msg
      console.log(msg);
    });
    
    this.$router.push({name:'list'});
  },
  methods: {
    ShowsBox() {
      this.shows = false
    },
    swqqq() {
      this.shows = true
    },
    LoginBtn () {
      if (this.isLogin) {
        this.$router.push({name:'topics'});
      } else {
        this.$router.push({name:'login'});
      }
    },
    LoginGo (msg,ID) {
      if (msg) {
        this.isLogin     = msg.success;
        this.loginname   = msg.loginname;
        this.avatarUrl   = msg.avatar_url;
        this.userId      = msg.id;
        this.accesstoken = ID;
      }
    },
    logout () {
      this.isLogin = false;
    }
  }
}
</script>

<style lang="sass" scoped>
.admin-animation {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  transition: all .3s ease-out;
  -webkit-transform: translateX(235px);
  transform: translateX(235px);
}
.animation {
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  transition: all .3s ease-out;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.header {
  display: block;
  width: 100%;
  height: 47px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: hsla(0,0%,100%,.5);
  box-shadow: 0 0 4px rgba(0,0,0,.25);

  h2 {
    font-size: 18px;
    text-align: center;
    line-height: 45px;
    font-weight: 400;
  }
  i {
    padding: 10px 10px 10px 10px;
    display: block;
    font-size: 24px;
  }
  .menu-btn {
    cursor: pointer;
    float: left;
  };
  .send-btn {
    cursor: pointer;
    float: right;
    color: #42b983;
  }
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
