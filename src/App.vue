<template>
  <div>
    <div id="app">
      <header class="header">
        <div class="menu-btn">
          <i class="iconfont">&#xe67c;</i>
        </div>
        <div class="send-btn">
          <i class="iconfont">&#xe674;</i>
        </div>
        <h2>{{ title }}</h2>
      </header>
      <Contnent-list></Contnent-list>
    </div>
  </div>
</template>

<script>
  import ContnentList from './components/ContnentList.vue'

  export default {
    name: 'app',
    data: function () {
      return {
        title: '首页'
      }
    },
    components: {
      ContnentList
    }
  }
</script>

<style lang="sass">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // overflow: hidden;
};
.header {
  display: block;
  width: 7.5rem;
  height: .8rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: hsla(0,0%,100%,.95);
  box-shadow: 0 0 4px rgba(0,0,0,.25);
  padding: .1rem 0 0 0;

  h2 {
    font-size: .249rem;
    text-align: center;
    line-height: .55rem;
    font-weight: 400;
  }
  i {
    padding: 14px;
    display: block;
    font-size: .35rem;
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
