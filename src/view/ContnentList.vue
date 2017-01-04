<template>
  <div class="ContnentList" @ready='doThis'>
    <ul class="content-list" v-for="vo in this.list" >
      <li class="share-box">
        <h3><span>{{tabToName(vo)}}</span>{{vo.title}}</h3>
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
      page: 3,
      limit:30
    }
  },
   route:{

   },
    mounted () {
      this.GetData();
    },
  methods: {
    GetData () {
      // var params = `?tab=${(type === 'all' ? 'good' : good)}&page=${page}&limit=${limit}`
    this.$http.get('https://cnodejs.org/api/v1/topics/?tab=good&'+'page='+this.page+'&limit='+this.limit).then((res) => {
      console.log(res.data);
      this.list = res.data.data;
      this.isLoading =  false;
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
      this.isLoading = true;
      this.limit +=30;
      this.GetData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ContnentList {
  color:#222;
  margin: 45px 0 0 0;
}
.content-list {
  padding: 10px;
  border-bottom: 1px solid #d5dbdb;
}
.share-box {
  overflow: hidden;

 span {
  // float: left;
  display: inline-block;
  padding: 2px 4px;
  background-color: #1abc9c;
  border-radius: 4px;
  color: #fff;
  margin: 0 10px 0 0;
  font-size: 14px;
 }

 h3 {
  // width: 351px;
  // float: left;
  font-size: 16px;
  font-weight: 400;
  white-space: pre-line;
  word-break:normal;
  word-wrap: break-word;
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
  width: 44px;
  height: 44px;
  border-radius: 5px;
  margin: 5px 10px 0 0;
}
.name-box {
  line-height: 20px;
  float: left;
  font-size: 14px;
  margin: 5px 0 0 0;

  span {
    display: block;
  }
}

.number {
  line-height: 20px;
  font-size: 14px;
  margin: 5px 0 0 0;
  span:first-child {
    color: #42b983;
  }
}

// 加载按钮
.loading-btn {
  display: block;
  width: 50%;
  margin: 30px auto;
}
</style>
