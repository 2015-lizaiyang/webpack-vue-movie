<template lang="html">
  <div class="login-main">
    <div class="login-box">
      <p class="title-box">Welcome</p>
      <div class="form-box">
        <input type="text" v-model='ID' placeholder="请输入Access Token">
      </div>
      <a @click="SubmitBtn" class='button button-glow button-rounded button-raised button-primary'>立即登录</a>
    </div>
    <v-confirm :count="count">
      <h3 slot="one">{{ contents }}</h3>
      <div class="confirm-button" slot="footer">
        <button @click.stop.prevent="confirmHandler">确认</button>
      </div>
    </v-confirm>
  </div>
</template>

<script>
import vConfirm from '../components/vConfirm.vue';
import api from '../api.js'
export default {
  data () {
    return {
      ID: null,
      contents: null,
      count:null
    }
  },
  components: {
    vConfirm
  },
  methods:{
    SubmitBtn(){
      if (this.ID!==null) {
        // var vm = this;
        // vm.$http.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:vm.ID})
        // .then((res) => {
        //   //  b928803a-e2db-496f-aae5-462b78a31f3d
        //   if (res.body.success) {
        //       localStorage.loginname   = res.body.loginname;
        //       localStorage.avatar_url  = res.body.avatar_url;
        //       localStorage.id          = res.body.id;
        //       localStorage.accesstoken = vm.ID;
        //     Bus.$emit("LoginActive",res.body,this.ID);
        //     this.$store.commit('IsLogin');
        //     vm.$router.push({name:'list'});
        //   };
        // },Response => {
        //   this.contents = Response.body.error_msg+", 请到Cnode社区注册后去设置里找到Access Token";
        //   this.count = true;
        // });
        var _this = this;
        api.user.accessToken(_this,{accesstoken:this.ID},
        data => {
            if (data.success) {
              localStorage.loginname   = data.loginname;
              localStorage.avatar_url  = data.avatar_url;
              localStorage.id          = data.id;
              localStorage.accesstoken = this.ID;
              Bus.$emit("LoginActive",data,this.ID);
              this.$store.commit('IsLogin');
              this.$router.push({name:'list'});
            };
        },err => {
          this.contents = err+", 请到Cnode社区注册后去设置里找到Access Token";
          this.count = true;
          console.log(err);
        });
      }else {
        this.contents = "请输入Access Token";
        this.count = true;
      }
    },
    confirmHandler(){
       this.count = false
    }

  }
}
</script>

<style lang="sass" scoped>
  .login-main {
    // margin: 60px 0 0 0;
    // width: 100%;
    position:absolute;
    height:100% ; width:100%;
    background: url('../assets/img/login-backgeound.jpg') no-repeat center /cover;

    .login-box {
      height: 340px;
      width: 90%;
      margin: 80% auto 60px auto;
     transform: translateY(-50%);
    }

    .title-box {
      font-size: 50px;
      text-align: center;
      // line-height: 100px;
      margin: 0 0 50px 0;
      text-shadow: 1px 2px 4px #333;
      color: #fff;
    }
    .form-box input {
      font-size: 20px;
      color: #fff;
      text-shadow: 0px 1px 1px #333;
      display: block;
      height: 59px;
      width: 100%;
      margin: 20px auto;
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 30px;
      padding: 0 20px;
      outline: none;

      &::-webkit-input-placeholder {
        color: #fff;
      }
      &:-moz-placeholder {
        color: #fff;
      }
      &::-moz-placeholder {
        color: #fff;
      }
      &::-ms-input-placeholder {
        color: #fff;
      }
    }
    .button {
      font-family:'微软雅黑';
      display: block;
      width: 100%;
      margin: 30px  auto 0 auto;
      border-radius: 30px;
      height: 55px;
      line-height: 53px;
      font-size: 22px;
    }
  }

</style>
