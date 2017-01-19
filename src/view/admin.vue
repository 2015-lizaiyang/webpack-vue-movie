<template lang="html">
  <div class="">
    <v-loading></v-loading>
    <header class="header admin-animation" :class="{'animation':this.shows}">
      <div class="menu-btn" @click='ShowsBox'>
        <i class="iconfont">&#xe67c;</i>
      </div>
      <div class="send-btn" @click="LoginBtn">
        <i class="iconfont">&#xe674;</i>
      </div>
      <router-link to='/login' class="send-btn">
      </router-link>
      <h2>{{ titleContent || temTitle }}</h2>
    </header>
    <main class="admin-animation" :class="{'animation':this.shows}">
      <transition name="fade">
        <keep-alive>
          <router-view name='part' :accesstoken="accesstoken" :loginname="loginname" :userId="userId"></router-view>
        </keep-alive>
      </transition>
    </main>
    <v-sidebar :shows='shows' :isLogin="isLogin" :loginname ="loginname" :avatarUrl ="avatarUrl" :accesstoken="accesstoken"></v-sidebar>
  </div>

</template>

<script>
import vSidebar from '../components/vSidebar.vue';
import vLoading from '../components/vLoading.vue';
import { mapState } from 'vuex';
import api from '../api.js';
export default {
  data: function () {
    return {
      title: '',
      shows: true,
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
  computed: mapState({
    isLogin: state => state.isLogin,
    titleContent: state => state.titleContent
  }),
  components: {
    vSidebar,
    vLoading
  },
  created () {
    this.shows = true;
    Bus.$on('test',this.swqqq);
    Bus.$on('LoginActive',this.LoginGo);
    this.$router.push({name:'list'});
  },
  watch:{
    shows: function(){
      if(!this.shows){
        this.scrollTop = document.body.scrollTop
        document.body.style.marginTop = -this.scrollTop + "px"
        document.querySelector("header").style.marginTop = this.scrollTop + "px"
        document.body.style.position = "fixed"
      }else{

        setTimeout(() => {
          document.body.style.position = "static"
          document.querySelector("header").style.marginTop = 0 + "px"
          document.body.style.marginTop = 0 + "px"
          document.body.scrollTop = this.scrollTop

        },300)
      }
    }
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
        console.log(this.accesstoken)
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.admin-animation {
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
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 47px;
  z-index: 999;
  overflow: hidden;
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
