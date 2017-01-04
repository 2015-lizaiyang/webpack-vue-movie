<template>
  <div class="App">
      <header class="header">
        <router-link to='/foo' class="menu-btn">
          <i class="iconfont">&#xe67c;</i>
        </router-link>
        <router-link to='/foosw' class="send-btn">
          <i class="iconfont">&#xe674;</i>
        </router-link>
        <h2>{{ title }}</h2>
      </header>
      <div class="">
      </div>
      <router-view></router-view>
      <!-- <transition> -->
        <!-- <keep-alive> -->
        <!-- </keep-alive> -->
      <!-- </transition> -->
      <!-- <Contnent-list></Contnent-list> -->
  </div>
</template>

<script>
  // import ContnentList from './view/ContnentList.vue'

  export default {
    data: function () {
      return {
        title: '首页'
      }
    },
    // components: {
    //   ContnentList
    // }
  }
</script>

<style lang="sass">
.App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // overflow: hidden;
};
.header {
  display: block;
  width: 100%;
  height: 47px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: hsla(0,0%,100%,.95);
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
</style>
