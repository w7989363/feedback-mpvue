<script>
import api from '@/service/api'
// import store from '@/store'
import { mapActions } from "vuex";

export default {
  async created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    console.log('app created')
    // 获取问题分类
    const res = await api.getTags()
    if (res.status == 1) {
      this.updateTags(res.tags)
    } else {
      wx.showToast({
        title: '获取配置失败，请检查网络',
        icon: 'none'
      })
    }
    
  },
  methods: {
    ...mapActions([
      'updateTags'
    ])
  }
}
</script>

<style>
.page {
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  /* padding: 200rpx 0; */
  box-sizing: border-box;
}
/* this rule will be remove */
/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */
</style>
