<template>
  <div class="App">
      <transition>
        <keep-alive>
          <router-view name='global' :temTitle="temTitle"></router-view>
        </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      temTitle: ''
    }
  },
  created() {
    var temTitle = "";
    this.$router.afterEach( router => {
      var routerTo = router;
      var routerName = routerTo.name.trim();
      if(routerName === "list"){
        switch (routerTo.query.tab){
          case "all": temTitle = "全部"; break;
          case "good": temTitle = "精华"; break;
          case "share": temTitle = "分享"; break;
          case "ask": temTitle = "问答"; break;
          case "job": temTitle = "招聘"; break;
          default: temTitle = "全部";
        }
      }else{
        if(routerName === "message") temTitle = "消息"
        else if(routerName === "about") temTitle = "关于"
        else if(routerName === "userDetails") temTitle = "个人信息"
        else if(routerName === "login") temTitle = "登录"
        else if(routerName === "newtopic") temTitle = "发帖"
      };
      this.temTitle = temTitle;
    });
  }
}
</script>

<style lang="sass">
.App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // overflow: hidden;
};
a {
  text-decoration: none;
}
</style>
