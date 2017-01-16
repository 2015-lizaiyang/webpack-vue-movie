<template lang="html">
  <div class="new-topics">
    <form @submit.prevent.stop='NewPost'>
      <div class="selects-box">
        <label for="options">选择模块：
          <select id="options" v-model.lazy="tabSelect">
            <option v-for="vo in tabOption" :value="vo.value">{{ vo.text }}</option>
          </select>
        </label>
      </div>
      <input class="title-box" type="text" v-model="postTitle" name="title" placeholder="标题，字数10个字以上">
      <textarea v-model="postContent" placeholder="支持Markdown语法"></textarea>
      <button class="button button-glow button-rounded button-highlight" type="submit">发布</button>
    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabSelect: '请选择',
        postTitle: '',
        postContent: '',
        tabOption: [
          { text: "请选择", value: "请选择"},
          { text: "分享", value: "share"},
          { text: "问答", value: "ask"},
          { text: "招聘", value: "job"}
        ]
      }
    },
    props: {
      accesstoken: {
        type: String,
      }
    },
    methods: {
      NewPost() {
        if (this.tabSelect="") {
          alert("未选择主题类型");
        }else if (this.postTitle.trim().length < 10) {
          alert("标题小于10个字")
        }else if (this.postContent.trim().length <= 0) {
          alert("主题内容为空")
        }else {
          console.log(this.tabSelect);
          console.log(this.postTitle);
          console.log(this.postContent);
          var url = "https://cnodejs.org/api/v1/topics/";
          var postOptions = {
            tab:        this.tabSelect,
            title:      this.postTitle,
            content:    this.postContent,
            accesstoken: this.accesstoken,
          };
          this.$http.post(url,postOptions)
          .then((res) => {
          if (res.data.success) {
            // this.tabSelect   = "";
            // this.postTitle   = "";
            // this.postContent = "";
            this.$router.push({name:'list'});
          }
          }, Response => {
            console.log(Response.body.error_msg);
          });
        }
      }
    }
  }
</script>
<style lang="sass" scoped>
  .new-topics {
    margin: 55px 5px 10px 5px;

    @at-root {
      .selects-box {
        overflow: hidden;
        margin: 0 0 12px 0;

        label {
          font-size: 16px;
          vertical-align: middle;
        }
        select {
          height: 30px;
          padding: 4px 6px;
          border-radius: 4px;
          border: 1px solid #e5e5e5;
          color: #666;
          vertical-align: middle;
        }
      }
      .title-box {
        width: 100%;
        height: 30px;
        padding: 4px 6px;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
        color: #666;
        margin: 0 0 12px 0;
      }

      textarea {
        min-height: 260px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        color: #666;
        width: 100%;
        margin: 0 0 12px 0;
        padding: 6px;
      }

      .button {
        max-width: 160px;
        width: 100%;
        height: 28px;
        padding: 0 16px;
        color: #fff;
        border: 0;
        border-radius: 5px;
        font-size: 12px;
        line-height: 28px;
      }
    }
  }
</style>