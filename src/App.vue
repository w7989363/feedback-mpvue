<script>
import api from '@/service/api'
// import store from '@/store'
import { mapActions } from "vuex";

export default {
  created () {
    console.log('app created')
    // 获取问题分类
    api.getTags().then(res => {
      if (res.status == 1) {
        this.updateTags(res.tags)
      }
    })
    
  },
  methods: {
    ...mapActions([
      'updateTags'
    ]),
  }
}
</script>

<style lang="less">
.page {
  font-size: 12px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
      padding: 0 20rpx;
    }
  }
}
</style>
