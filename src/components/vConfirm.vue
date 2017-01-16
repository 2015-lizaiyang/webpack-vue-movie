<template lang="html">
  <div class="confirm-box" v-show='isShowConfirm' transition="">
    <div class="confirm-dialog">
      <div class="confirm-body">
        <slot name="body"></slot>
      </div>
      <div class="confirm-footer">
        <slot name="footer">
          <div @click="hide">取消</div>
          <div @click="confirmHandler">确认</div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      isShowConfirm: {
        type: Boolean,
      }
    },
    methods: {
      hide () {
        this.$emit('confirms',false);
      },
      confirmHandler(){
        localStorage.loginname = localStorage.avatar_url = localStorage.user_id = localStorage.accesstoken = "";
        Bus.$emit("logout",false);
        Bus.$emit('test');
        this.$router.push({path: "/list"})
      }
    }
  }
</script>
<style lang="sass" scoped>
  
</style>