<template>
  <div class="card-container">
    <div class="left">
      <div class="support" @click="support()">
        <div :class="['triangle', feedback.my_support ? 'red-triangle' : '']"></div>
        <span class="support-count">{{feedback.support}}</span>
      </div>
    </div>
    <div class="right" @click="goDetail()">
      <div class="title">{{feedback.title}}</div>
      <ul class="tags-container">
        <li class="tag" v-for="item in feedback.tags" :key="item">{{item}}</li>
      </ul>
      <div class="detail">
        <span class="name">{{feedback.name}}</span>
        <span class="time">{{feedback.time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/service/api'
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // 防止重复点击
      disableSupport: false,
    }
  },
  props: {
    feedback: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    ...mapActions([
      'updateSupport'
    ]),
    async support() {
      // 防重复点击
      if (this.disableSupport) return
      this.disableSupport = true
      const params = {
        fb_id: this.feedback.id,
        // todo: login
        userid: 1,
        mode: this.feedback.my_support ? 0 : 1
      }
      const res = await api.changeSupport(params)
      if (res.status == 1) {
        await this.updateSupport({ id: this.feedback.id })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      this.disableSupport = false
    },
    goDetail() {
      wx.navigateTo({
        url: `../detail/main?id=${this.feedback.id}`
      })
    }
  }
}
</script>

<style lang="less">
.card-container {
  // padding: 10px;
  display: flex;
  // align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid rgba(235, 235, 235, 0.5);
  .left {
    flex: 0 0 160rpx;
    display: flex;
    justify-content: space-around;
    margin: 0 10rpx;
    .support {
      width: 110rpx;
      height: 110rpx;
      border: 1px solid #ebebeb;
      border-radius: 8rpx;
      margin-top: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .triangle {
        margin: 10rpx 0;
        display: inline-block;
        content: '';
        border-bottom: 40rpx solid #ebebeb;
        border-left: 30rpx solid transparent;
        border-right: 30rpx solid transparent;
      }
      .red-triangle {
        border-bottom-color: #8C0000;
      }
    }
    .support-count {
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .right {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .title {
      font-size: 18px;
      font-weight: 400;
    }
    .tags-container {
      width: 100%;
      min-height: 40rpx;
      max-height: 100rpx;
      line-height: 40rpx;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      overflow: hidden;
      .tag {
        width: 25%;
        text-align: center;
        text-overflow: ellipsis;
        margin: 10rpx 15rpx 0 0;
        padding: 0 5rpx;
        background-color: #f0f0f0;
        border-radius: 10rpx;
      }
    }
    .detail {
      height: 50rpx;
      line-height: 50rpx;
      color: #999999;
      .name {
        margin-right: 25rpx;
        color: #8C0000;
      }
    }
  }
}
</style>
