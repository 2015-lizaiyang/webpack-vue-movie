<template>
  <div class="App">
      <transition>
        <keep-alive>
          <router-view name='global'></router-view>
        </keep-alive>
      </transition>
  </div>
</template>

<script>

  export default {
  }
</script>

<style lang="sass">
.App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // overflow: hidden;
};
</style>
