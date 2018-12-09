<template>
  <div class="page">
    <div>
      <card :feedback="feedback"></card>
    </div>
    <div class="feedback-section">
      <div class="title">问题描述：</div>
      <div class="detail">{{feedback.detail}}</div>
    </div>
    <div class="feedback-section" v-if="feedback.img_url">
      <div class="title">图片：</div>
      <img class="upload-img" :src="feedback.img_url" @click="showImg()">
    </div>
    <div class="feedback-section" v-if="feedback.reply">
      <div class="title">负责人回复：</div>
      <div class="detail">{{feedback.reply}}</div>
      <div class="time">{{feedback.reply_time}}</div>
    </div>
    <div class="feedback-section" v-if="comments.length">
      <div class="title">评论：</div>
      <div class="comment-container" v-for="item in comments" :key="item.id">
        <img class="avatar" :src="item.avatar_url">
        <div class="detail-container">
          <span class="name">{{item.wx_name}}</span>
          <span class="time">{{item.time}}</span>
          <div class="comment">{{item.comment}}</div>
        </div>
      </div>
    </div>
    <div class="feedback-section">
      <div class="title">填写评论：</div>
      <textarea class="input" maxlength="500" v-model="commentDetail"></textarea>
      <button class="btn" @click="addComment()">提 交</button>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import api from '@/service/api'

export default {
  components: {
    card
  },
  data () {
    return {
      btnDisabled: false,
      id: '',
      feedback: {},
      comments: [],
      commentDetail: ''
    }
  },
  computed: {
  },
  created () {},
  onShow() {
    this.id = this.$root.$mp.query.id
    this.feedback = this.$store.getters.getFeedbackById(this.id)
    this.getComments()
  },
  methods: {
    async getComments() {
      const res = await api.getComments({ id: this.id })
      if (res.status == 1) {
        this.comments = res.data
      } else {
        wx.showToast({
          title: '获取信息失败，请检查网络',
          icon: 'none'
        })
      }
    },
    async addComment() {
      if (this.btnDisabled || this.commentDetail === '') return
      this.btnDisabled = true
      const params = {
        fb_id: this.id,
        // todo: login
        userid: 1,
        comment: this.commentDetail
      }
      const res = await api.addComment(params)
      if (res.status == 1) {
        wx.showToast({
          title: "评论成功",
          icon: ""
        })
        this.commentDetail = ''
        this.getComments()
      } else {
        wx.showToast({
          title: "出错了",
          icon: "none"
        })
      }
      this.btnDisabled = false
    },
    showImg() {
      wx.previewImage({
        urls: [this.feedback.img_url],
        current: this.feedback.img_url
      })
    }
  },

  
  
}
</script>

<style lang="less" scoped>
.feedback-section {
  font-size: 16px;
  padding: 35rpx;
  border-bottom: 1px solid rgba(235, 235, 235, 0.5);
  .title {
    color: #999;
    margin-bottom: 15rpx;
  }
  .detail {
    margin: 15rpx 0;
    line-height: 1.4;
  }
  .upload-img {
    width: 200rpx;
    height: 200rpx;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
  .comment-container {
    display: flex;
    padding: 20rpx 10rpx;
    border-bottom: 1px solid rgba(235, 235, 235, 0.3);
    &:last-child {
      border-bottom: 0;
    }
    .avatar {
      // width: 68rpx;
      height: 68rpx;
      flex: 0 0 68rpx;
      border-radius: 50%;
      margin-right: 25rpx;
      margin-top: 10rpx;
    }
    .detail-container {
      flex: 1 1;
      .name {
        color: #8C0000;
        margin-right: 25rpx;
      }
      .comment {
        font-size: 14px;
      }
    }
  }
  .input {
    box-sizing: border-box;
    padding: 30rpx;
    width: 100%;
    height: 300rpx;
    border: 1px solid #c0c0c0;
    border-radius: 10rpx;
    box-shadow: 5rpx 5rpx 5rpx #888;
    margin-bottom: 40rpx;
  }
  .btn {
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
    background-color: #8C0000;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 10rpx;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
    &:active {
      opacity: 0.6;
    }
  }
}
</style>
