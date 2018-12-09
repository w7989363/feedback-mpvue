<template>
  <div class="page">
    <div class="header">
      <img class="header-icon" src="../../assets/images/search.png" @click="goSearch()">
      <div :class="['tab', order === NEW ? 'selected-tab' : '']" @click="order = NEW">最 新</div>
      <div :class="['tab', order === HOT ? 'selected-tab' : '']" @click="order = HOT">最 热</div>
      <img class="header-icon" src="../../assets/images/plus.png" @click="goAdd()">
    </div>
    <div class="content">
      <card v-for="item in order ? newOrder : hotOrder" :key="item.id" :feedback="item"></card>
    </div>
  </div>
</template>

<script>
import api from '@/service/api'
import card from '@/components/card'
import { mapGetters, mapActions } from 'vuex'
const NEW = 1
const HOT = 0

export default {
  components: {
    card
  },
  data () {
    return {
      NEW,
      HOT,
      hideBottomLoading: false,
      // 1为最新，0为最热
      order: NEW,
      // 下次请求开始的index
      newStart: 0,
      hotStart: 0,
      // 渲染模板用数组
      feedbackArray: [],
      // “最新”数组
      newFeedbackArray: [],
      // “最热”数组
      hotFeedbackArray: []
    }
  },
  computed: {
    ...mapGetters([
      'feedbacks'
    ]),
    newOrder() {
      let temp = [...this.feedbacks]
      temp.sort((a, b) => a.time < b.time)
      return temp
    },
    hotOrder() {
      let temp = [...this.feedbacks]
      temp.sort((a, b) => a.support < b.support)
      return temp
    }
  },
  created () {
    // const res = 
    this.getFeedback()
  },
  methods: {
    ...mapActions([
      'updateFeedbacks'
    ]),
    async getFeedback() {
      const params = {
        order: this.order,
        start: this.order === NEW ? this.newStart : this.hotStart,
        // TODO: login
        userid: 1
      }
      const res = await api.getFeedback(params)
      if (res.status == 1) {
        // this.order === NEW ? this.newFeedbackArray.push(...res.data) : this.hotFeedbackArray.push(...res.data)
        this.updateFeedbacks(res.data)
      } else {
        wx.showToast({
          title: '获取信息失败，请检查网络',
          icon: 'none'
        })
      }
      
    },
    // changeTab(order) {
    //   this.order = order
    // },
    goSearch() {
      wx.navigateTo({
        url: '../search/main'
      })
    },
    goAdd() {
      wx.navigateTo({
        url: '../add/main'
      })
    },
  },

  
  
}
</script>

<style lang="less" scoped>
.tab {
  font-size: 16px;
  width: 100rpx;
  text-align: center;
  color: #FFF;
  font-weight: 400;
  height: 65rpx;
  line-height: 65rpx;
}
.selected-tab {
  font-weight: 600;
  border-bottom: 1px solid #FFF;
}
.content {
  width: 100%;
  flex: 1 1;
  overflow-y: scroll;
  padding: 20rpx 0;
}
</style>
