<template>
  <div>
    <div v-if="user.avatar" v-clickoutside="hideReplyBtn" class="my-reply" @click="inputFocus">
      <el-avatar class="header-img" :size="40" :src="myHeader" />
      <div class="reply-info">
        <div
          id="replyInput"
          tabindex="0"
          contenteditable="true"
          spellcheck="false"
          :placeholder="user.nickname+': 输入评论...'"
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
        />
      </div>
      <div v-show="btnShow" class="reply-btn-box">
        <el-button class="reply-btn" size="medium" type="primary" @click="sendComment">发表评论</el-button>
      </div>
    </div>
    <div v-else class="tip">
      <el-button type="text" class="font" @click="goToLogin"><a>登录后才可以评论及回复</a></el-button>
    </div>
    <div v-for="(item,i) in commentsList" :key="i" class="author-title reply-father">
      <!-- // TODO: 设置头像 -->
      <el-avatar class="header-img" :size="40" :src="defaultAvatar" />
      <div class="author-info">
        <span class="author-name">{{ item.nickname }}</span>
        <span class="author-time">{{ formatTime(item.date) }}</span>
      </div>
      <div v-show="user.avatar" class="icon-btn">
        <span @click="showReplyInput(i, item.nickname, item.comment_id)"><i class="iconfont el-icon-s-comment" />{{ item.replyList.length }}</span>
        <!-- <i class="iconfont el-icon-caret-top" />{{ item.like }} -->
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{ item.content }}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply,j) in item.replyList" :key="j" class="author-title">
          <!-- // TODO: 设置回复者头像 -->
          <el-avatar class="header-img" :size="40" :src="defaultAvatar" />
          <div class="author-info">
            <span class="author-name">{{ reply.from }}</span>
            <span class="author-time">{{ formatTime(reply.date) }}</span>
          </div>
          <!-- <div class="icon-btn">
            <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment" />{{ reply.commentNum }}</span>
            <i class="iconfont el-icon-caret-top" />{{ reply.like }}
          </div> -->
          <div class="talk-box">
            <p>
              <span>回复 {{ reply.nickname }}:</span>
              <span class="reply">{{ reply.content }}</span>
            </p>
          </div>
          <div class="reply-box" />
        </div>
      </div>
      <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="myHeader" />
        <div class="reply-info">
          <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..." class="reply-input reply-comment-input" @input="onDivInput($event)" />
        </div>
        <div class=" reply-btn-box">
          <el-button class="reply-btn" size="medium" type="primary" @click="sendCommentReply(i)">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCommentList, addComment, replayComment } from '@/api/comment'

const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside)
    delete el.vueClickOutside
  }
}

export default {
  name: 'Comment',
  directives: { clickoutside },
  // props: {
  //   bookId: {
  //     type: Number,
  //     default: 1
  //   }
  // },
  data() {
    return {
      bookId: 1,
      btnShow: false,
      index: '0',
      replyComment: '',
      myName: 'TOURIST',
      myHeader: 'https://z3.ax1x.com/2021/04/11/cwKLLj.png',
      defaultAvatar: 'https://z3.ax1x.com/2021/04/11/cwKLLj.png',
      myId: 19870621,
      to: '',
      reply_id: -1,
      showId: -1,
      commentsList: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.myHeader = this.user.avatar
    const _bookId = this.$route.params.bookId
    this.bookId = (_bookId && _bookId > 0) ? _bookId : (this.$route.path.split('/').slice(-2)[0] || 1)
    this.getAllComments()
  },
  methods: {
    inputFocus() {
      var replyInput = document.getElementById('replyInput')
      replyInput.style.padding = '8px 8px'
      replyInput.style.border = '2px solid blue'
      replyInput.focus()
    },
    showReplyBtn() {
      this.btnShow = true
    },
    hideReplyBtn() {
      this.btnShow = false
      replyInput.style.padding = '10px'
      replyInput.style.border = 'none'
    },
    showReplyInput(i, name, id) {
      this.index = i
      this.to = name
      this.showId = id
      this.reply_id = id
    },
    _inputShow(i) {
      return this.commentsList[i].comment_id === this.showId
    },
    sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        const input = document.getElementById('replyInput')
        addComment({
          book_id: this.bookId,
          content: this.replyComment
        })
          .then(res => {
            console.log('评论', res)
            this.getAllComments()
          })
          .catch(err => {
            console.log('评论失败', err)
          })
        this.replyComment = ''
        input.innerHTML = ''
      }
    },
    sendCommentReply(i) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论回复不能为空'
        })
      } else {
        replayComment({
          comment_id: this.commentsList[i].comment_id,
          content: this.replyComment
        })
          .then(res => {
            console.log('回复评论', res)
            this.getAllComments()
          })
          .catch(err => {
            console.log('回复评论失败', err)
          })
        this.replyComment = ''
        document.getElementsByClassName('reply-comment-input')[i].innerHTML = ''
      }
    },
    formatTime(date) {
      return this.$moment(date).format('llll')
    },
    onDivInput: function(e) {
      this.replyComment = e.target.innerHTML
    },
    dateStr(date) {
      // 获取js 时间戳
      var time = new Date().getTime()
      // 去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000)
      // 存储转换值
      var s
      if (time < 60 * 10) { // 十分钟内
        return '刚刚'
      } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        // 超过十分钟少于1小时
        s = Math.floor(time / 60)
        return s + '分钟前'
      } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        // 超过1小时少于24小时
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
      } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
        // 超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
      } else {
        // 超过30天ddd
        var date = new Date(parseInt(date))
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      }
    },
    goToLogin() {
      this.$router.push({ path: '/login?redirect=' + this.$route.path, params: { redirect: this.$route.path }})
    },
    getAllComments() {
      getCommentList({ book_id: this.bookId || this.$route.path.split('/').slice(-2)[0] || 1 })
        .then(res => {
          console.log('获取所有评论', res)
          this.commentsList = res.data
        })
        .catch(err => {
          console.log('获取评论失败', err)
          // this.$message.error('暂无评论')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  margin-top: 40px;
  text-align: center;
  .font {
    font-size: 20px
  }
}
.my-reply {
  padding: 10px;
  background-color: #fafbfc;
  .header-img {
    display: inline-block;
    vertical-align: top;
  }.reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 90%;
    @media screen and (max-width: 1200px) {
      width: 80%;
    }.reply-input {
      min-height: 20px;
      line-height: 22px;
      padding: 10px 10px;
      // color: #ccc;
      background-color: #fff;
      border-radius: 5px;&:empty:before {
        content: attr(placeholder);
      }&:focus:before {
        content: none;
      }&:focus {
        padding: 8px 8px;
        border: 2px solid blue;
        box-shadow: none;
        outline: none;
      }
    }
  }.reply-btn-box {
    height: 25px;
    margin: 10px 0;.reply-btn {
      position: relative;
      float: right;
      margin-right: 15px;
    }
  }
}.my-comment-reply {
  margin-left: 50px;.reply-input {
    width: flex;
  }
}.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}.author-title {
  padding: 10px;.header-img {
    display: inline-block;
    vertical-align: top;
  }.author-info {
    display: inline-block;
    margin-left: 5px;
    width: 60%;
    height: 40px;
    line-height: 20px;>span {
      display: block;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }.author-name {
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }.author-time {
      font-size: 14px;
    }
  }.icon-btn {
    width: 30%;
    padding: 0 !important;
    float: right;
    @media screen and (max-width: 1200px) {
      width: 20%;
      padding: 7px;
    }>span {
      cursor: pointer;
    }.iconfont {
      margin: 0 5px;
    }
  }.talk-box {
    margin: 0 50px;>p {
      margin: 0;
    }.reply {
      font-size: 16px;
      color: #000;
    }
  }.reply-box {
    margin: 10px 0 0 50px;
    background-color: #efefef;
  }
}
</style>
