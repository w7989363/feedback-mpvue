<template>
<div class="page">
  <div class="header">
    <img class="header-icon" src="../../assets/images/search.png" @click="goSearch()">
    <input type="text" class="input" v-model.lazy="searchInput" placeholder="搜索">
    <img class="header-icon" src="../../assets/images/xx.png" @click="searchInput = ''">
  </div>
  <div class="content">
    <div class="tags">
      <div class="title">分类查找：</div>
      <div class="tags-container">
        <span :class="['tag', tag.selected ? 'selected' : '']" v-for="tag in tags" :key="tag.id" @click="toggleTag({ id: tag.id })">{{tag.name}}</span>
      </div>
    </div>
    <div>
      <card v-for="item in searchResult" :key="item.id" :feedback="item"></card>
    </div>
  </div>
  
</div>
</template>

<script>
import api from '@/service/api'
import card from '@/components/card'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    card
  },
  data () {
    return {
      searchInput: '',
    }
  },
  computed: {
    ...mapGetters([
      'tags',
      'searchResult'
    ]),
    searchParams() {
      const tags = this.tags.filter(item => item.selected).map(item => item.id).join(',')
      const search = this.searchInput.split(' ').filter(item => item).join(',')
      return {
        tags: tags,
        search: search,
        userid: 1
      }
    }
  },
  watch: {
    async searchParams() {
      const res = await api.search(this.searchParams)
      if (res.status == 1) {
        this.updateSearchResult(res.data)
      } else {
        wx.showToast({
          title: '获取信息失败，请检查网络',
          icon: 'none'
        })
      }
    },
  },
  async onShow(){
    this.searchInput = ''
    // 没有tags则重新获取
    if (!this.tags.length) {
      console.log('fetch tags again');
      const res = await api.getTags()
      if (res.status == 1) {
        this.updateTags(res.tags)
      } else {
        wx.showToast({
          title: '获取信息失败，请检查网络',
          icon: 'none'
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleTag',
      'updateSearchResult'
    ]),
  },

  
  
}
</script>

<style lang="less" scoped>
.input {
  font-size: 14px;
  flex: 1 1;
  background-color: #FFF;
  padding: 0 20rpx;
}
.tags {
  padding: 20rpx 25rpx;
  border-bottom: 1px solid rgba(235, 235, 235, 0.5);
  .title {
    font-size: 12px;
    color: #919191;
  }
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    align-items: center;
    line-height: 80rpx;
    .tag {
      font-size: 12px;
      height: 55rpx;
      line-height: 55rpx;
      margin: 20rpx 20rpx 0 0;
      width: 22%;
      text-align: center;
      background-color: #bdbdbdde;
      color: #FFF;
      border-radius: 18rpx;
    }
    .selected {
      background-color: #8C0000;
    }
  }
}
.content {
  width: 100%;
  flex: 1 1;
  overflow-y: scroll;
  padding: 20rpx 0;
}
</style>
