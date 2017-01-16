<template lang="html">
  <div>
    <nav class="vSidebar" :class="{'active':shows}">
      <div v-if="isLogin" @click="goUser" class="headers-user-img">
        <img :src="avatarUrl" alt="">
        <p>{{ loginname }}</p>
      </div>
      <div v-else class="title-box" @click="GoLogin">
        <i class="iconfont">&#xe657;</i>
        <h2>登录</h2>
      </div>
      <ul v-for="(items,index) in NavList" class="nav-list">
        <li v-for="vo in items" @click="Choose(vo,vo.tab)"><i class="iconfont" v-html='vo.icon'></i><span>{{ vo.name }}</span></li>
        <li v-if="isLogin && index==NavList.length -1" @click="logout"><i class="iconfont">&#xe772;</i><span>注销</span></li>
      </ul>
      <img class="logo" src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="vue-logo">
    </nav>
    <div class="shade-box" :class="{'hide':this.shows}" @click="shade"></div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        NavList: [
          [{
            icon: "&#xe657;",
            name: "全部",
            view: "list",
            tab: "all"
          },{
            icon: "&#xe708;",
            name: "精华",
            view: "list",
            tab: "good"
          },{
            icon: "&#xe654;",
            name:"分享",
            view: "list",
            tab: "share"
          },{
            icon: "&#xe6d6;",
            name: "问答",
            view: "list",
            tab: "ask"
          },{
            icon: "&#xe72f;",
            name: "招聘",
            view: "list",
            tab: "job"
          }],[{
            icon: "&#xe6f1;",
            name: "消息",
            view: "message"
          },{
            icon: "&#xe61e;",
            name: "关于",
            view: "about"
          }]
        ],
      }
    },
    methods: {
      Choose (vo, tab) {
        Bus.$emit('test');
        this.$router.push({path:'/'+vo.view,query:{tab: vo.tab}});
      },
      shade() {
        Bus.$emit('test');
      },
      logout() {
        Bus.$emit('confirms',true);
      },
      GoLogin() {
        Bus.$emit('test');
        this.$router.push({name:'login'});
      },
      goUser () {
        Bus.$emit('test');
        this.$route.params.username = this.loginname
        this.$router.push({name:'userDetails'});
      }
    },
    props: {
      shows: {
        type: Boolean,
        default: true
      },
      isLogin: {
        type: Boolean,
        default: false
      },
      avatarUrl: {
        type: String,
      },
      loginname: {
        type: String,
      },
    }
}
</script>

<style lang="sass" scoped>
.shade-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .67);
  transition: all .2s ease-in-out;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  @at-root {
    .hide {
      transition: all .4s ease-in-out;
      -webkit-transform: translateX(-100%);
    }
  }

}

.headers-user-img {
  padding: 20px 0 0 0;
  img {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 1px 5px #3d4a5d;
  }
  p {
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
}
.vSidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 235px;
  background-color: #24344b;
  transition: all .3s ease-out;
  -webkit-transition: all .3s ease-out;
  transform: translateX(0);
  -moz-transform: translateX(0);
  -webkit-transform: translateX(0);

  @at-root {
    .active {
      transition: all .3s ease-out;
      -webkit-transition: all .3s ease-out;
      transform: translateX(-100%);
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }

    .title-box {
      font-weight: none;
      width: 55px;
      overflow: hidden;
      color: #7f8c8d;
      margin: 12px auto;

      i {
        font-size: 20px;
        float: left;
        margin: 0 4px 0 0;
      }

      h2 {
        font-weight: normal;
        float: left;
        line-height: 25px;
      }
    }

    .nav-list {
      overflow: hidden;
      margin: 0 0 20px 0;
      color: #7f8c8d;
      background-color: #2b3c58;

      li {
        padding: 10px 0 10px 20px;
      }

      i {
        font-size: 17px;
      }

      span {
        font-size: 14px;
        margin: 0 0 0 8px;
      }
    }

    .logo {
      position: absolute;
      bottom: 0;
      left: 50%;
      height: 25px;
      margin: 0 0 10px -53px;
    }
  }
}
</style>
