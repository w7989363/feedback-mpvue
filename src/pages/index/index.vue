<template>
  <div class="page">
    <div class="header">
      <img class="header-icon" src="../../assets/images/search.png">
      <div :class="['tab', order === NEW ? 'selected-tab' : '']" @click="order = NEW">最 新</div>
      <div :class="['tab', order === HOT ? 'selected-tab' : '']" @click="order = HOT">最 热</div>
      <img class="header-icon" src="../../assets/images/plus.png">
    </div>
    <div class="content">
      <Card v-for="item in order ? newFeedbackArray : hotFeedbackArray" :key="item.id" :problem="item"></Card>
    </div>
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import api from '@/service/api'
import Card from '@/components/card'
// import { mapGetters } from 'vuex'
const NEW = 1
const HOT = 0

export default {
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
    // ...mapGetters([
    //   'problemTags'
    // ]),
  },
  components: {
    Card
  },

  methods: {
    async getFeedback() {
      const params = {
        order: this.order,
        start: this.order === NEW ? this.newStart : this.hotStart,
        // TODO: login
        userid: 1
      }
      console.log(123);
      const res = await api.getFeedback(params)
      if (res.status == 1) {
        this.order === NEW ? this.newFeedbackArray.push(...res.data) : this.hotFeedbackArray.push(...res.data)
      } else {
        wx.showToast({
        title: '请检查网络',
        icon: 'none'
      })
      }
      
    },
    changeTab(order) {
      this.order = order
    },
  },

  created () {
    // const res = 
    this.getFeedback()
  },
  
}
</script>

<style lang="less" scoped>
.header {
  height: 80rpx;
  flex: 0 0 80rpx;
  width: 100%;
  background-color: #8C0000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-icon {
    width: 50rpx;
    height: 50rpx;
    padding: 0 10rpx;
  }
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
}
.content {
  width: 100%;
  flex: 1 1;
  overflow-y: scroll;
}
</style>
