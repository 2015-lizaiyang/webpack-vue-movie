<template>
  <div class="ContnentList" @ready='doThis'>
    <ul class="content-list" v-for="vo in this.list" >
      <li class="share-box">
        <span>{{tabToName(vo)}}</span>
        <h3>{{vo.title}}</h3>
      </li>
      <li class="user-conent">
        <div>
          <img class="user-img" :src="vo.author.avatar_url" alt="">
          <div class="name-box">
            <span>{{vo.author.loginname}}</span>
            <span>{{vo.create_at | getLastTimeStr(true)}}</span>
          </div>
        </div>
        <div>
          <p class="number"><span title="回复数">{{vo.reply_count}}</span>/<span title="阅读数">{{vo.visit_count}}</span></p>
          <p>{{vo.last_reply_at | getLastTimeStr(true)}}</p>
        </div>
      </li>
    </ul>
    <button class="loading-btn button button-glow button-rounded button-caution" @click='GetListData'>{{ isLoading ? "正在加载..." : "加载更多" }}</button>
  </div>
</template>

<script>
// import serverData from '../server-address.js'
export default {
  data () {
    return {
      list: [],
      isLoading: false,
      page: 1,
    }
  },
   route:{

   },
    mounted () {
      this.GetData();
    },
  methods: {
    GetData () {
      var params = ``;
    this.$http.get('https://cnodejs.org/api/v1/topics',[]).then((res) => {
      console.log(res.data);
      this.list = res.data.data;
    },(err) => {
      console.log(err)
    })
    },
    doThis () {
      this.GetData();
    },
    tabToName(topic){
      var name = "";
      if(topic.good == true){
        name = "精华"
      }else{
        switch(topic.tab) {
          case "ask": name = "问答"; break;
          case "share": name = "分享"; break;
          case "job": name = "招聘"; break;
          default: name="未知"
        }
      }
      return name;
    },
    GetListData() {
      this.GetData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ContnentList {
  color:#222;
  margin: .7rem 0 0 0;
}
.content-list {
  padding: .2rem .2rem;
  border-bottom: 1px solid #d5dbdb;
}
.share-box {

 span {
  display: inline-block;
  padding: .02rem .1rem;
  background-color: #1abc9c;
  border-radius: .1rem;
  color: #fff;
  // margin: 0 .05rem 0 0;
  font-size: .2rem;
 }

 h3 {
  display: inline-block;
  font-size: .24rem;
  font-weight: 400;
 }
}

.user-conent {
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
  width: .65rem;
  height: .65rem;
  border-radius: .1rem;
  margin: .1rem .1rem 0 0;
}
.name-box {
  float: left;

  span {
    display: block;
  }
}

.number {
  span:first-child {
    color: #42b983;
  }
}

// 加载按钮
.loading-btn {
  display: block;
  width: 5rem;
  margin: .3rem auto;
}
</style>
