<template>
  <div class="page">
    <div class="input-section">
      <input class="title" type="text" placeholder="请输入标题" maxlength="100">
    </div>
    <div class="input-section">
      <textarea class="detail" placeholder="请输入问题描述，最多500字" maxlength="500"></textarea>
    </div>
    <div class="input-section">
      <div class="tip">上传图片（最大3M 可选）：</div>
      <img :src="uploadImg" class="upload-img" @click="chooseImg()">
    </div>
    <div class="input-section">
      <div class="tip">选择问题分类：</div>
      <div class="tags-container">
        <span :class="['tag', tag.selected ? 'selected' : '']" v-for="tag in tagsLocal" :key="tag.id" @click="toggleTag({ id: tag.id })">{{tag.name}}</span>
      </div>
    </div>
    <div class="input-section">
      <button class="submit-btn" @click="submit()">提 交</button>
    </div>
  </div>
</template>

<script>
import api from '@/service/api'
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      uploadImg: '../../assets/images/add_pic.png',
      hasUploadImg: false,
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ]),
    tagsLocal() {
      return this.tags.map(tag => {
        return {...tag}
      })
    }
  },
  created () {},
  onShow() {
    this.clearTags()
  },
  methods: {
    ...mapActions([
      'toggleTag',
      'clearTags'
    ]),
    chooseImg() {
      wx.chooseImage({
        count: 1, // 默认为9
        sizeType: ['compress'], // 指定原图或者压缩图
        sourceType: ['album', 'camera'], // 指定图片来源
        success: (res) => {
          var tempFilePaths = res.tempFilePaths
          this.uploadImg = tempFilePaths[0],
          this.hasUploadImg = true
        }
      })
    }
  },

  
  
}
</script>

<style lang="less" scoped>
.input-section {
  font-size: 16px;
  padding: 20rpx 40rpx;
  border-bottom: 1px solid rgba(235, 235, 235, 0.5);
  &:last-child {
    border-bottom: 0;
  }
  .detail {
    width: 100%;
  }
  .tip {
    font-size: 12px;
    color: #919191;
  }
  .upload-img {
    width: 200rpx;
    height: 200rpx;
    margin-top: 20rpx;
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
  .submit-btn {
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
