<template>
  <div class="user-header">
    <div>
      <img class="user-img" :src="userImg" @click.stop.prevent="GetUserDetails" alt="">
      <div class="name-box">
        <span class="userName" @click.stop.prevent="GetUserDetails">{{userName}}</span>
        <!-- <span @click.stop.prevent="GetContent">{{userTime}}</span> -->
      </div>
    </div>
    <slot name='two'></slot>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      userImg: {
        type:String,
      },
      userName: {
        type:String,
      },
      userTime: {
        type:String,
      },
      pathUserDetails: {
        type: String,
      },
      // 只有用户详情页面里点击时才出发的代码块;
      openUser: {
        type: Boolean,
      },
      // 话题内容id
      contentId: {
        type: String,
      }
    },
    methods: {
      GetUserDetails() {
        if (this.openUser) {
          if (this.$route.params.username!==this.userName) {
            this.$route.params.username = this.userName
            this.$router.push({name:'userDetails'});
          }
        }
      },
      GetContent() {
        this.$router.push({path:'/topic/'+this.contentId});
      }
    }
  }
</script>
<style lang="sass" scoped>
.user-header {
  width: 100%;
  overflow: hidden;

  div:first-child {
    float: left;
  }

  div:last-child {
    float: right;
  }
}

.user-img {
  float: left;
  width: 44px;
  height: 44px;
  border-radius: 5px;
  margin: 5px 10px 0 0;
}
.name-box {
  line-height: 20px;
  float: left;
  font-size: 16px;
  margin: 5px 0 0 0;

  span {
    display: block;
  }
}
.userName {
  line-height: 44px;
}
</style>