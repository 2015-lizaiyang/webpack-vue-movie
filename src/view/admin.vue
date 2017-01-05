<template lang="html">
  <div class="">
    <header class="header">
      <router-link to='/admin/listsw' class="menu-btn">
        <i class="iconfont">&#xe67c;</i>
      </router-link>
      <router-link to='/foosw' class="send-btn">
        <i class="iconfont">&#xe674;</i>
      </router-link>
      <h2>{{ title }}</h2>
    </header>
    <transition>
      <keep-alive>
        <router-view name='part'></router-view>
      </keep-alive>
    </transition>
    <!-- <content-list></content-list> -->
  </div>

</template>

<script>
import ContentList from './ContnentList.vue'
export default {
  data: function () {
    return {
      title: '首页'
    }
  },
  components: {
    ContentList
  }
}
</script>

<style lang="sass">
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
