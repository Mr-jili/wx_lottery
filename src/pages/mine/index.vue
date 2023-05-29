<template>
  <view class="mine">
    <view class="mine-nav" :style="{ paddingTop: state.statusBarHeight + 'px' }">
      <view class="mine-nav-title" :style="{ lineHeight: state.barHeight + (state.top - state.statusBarHeight) + 'px' }">
        我的</view>
      <view class="mine-top">
        <nut-avatar style="width: 80px;height: 80px;" size="large">
          <img
            src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
        </nut-avatar>
        <view class="mine-top-title">系统管理员</view>
      </view>
    </view>

    <view class="mine-content">
      <view class="mine-content-item" @click="handleToHistory">
        <text>摇号记录</text>
        <nut-icon name="rect-right"></nut-icon>
      </view>
      <!-- <view class="mine-content-item" @click="handleToEstimate">
        <text>房产评估</text>
        <nut-icon name="rect-right"></nut-icon>
      </view> -->
    </view>
    <nut-button class="mine-footer" block type="primary"
      @click="handleExit">退出登录</nut-button>
  </view>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import Taro from "@tarojs/taro";

const arrowRight = reactive(require('../../assets/images/arrow-right.png'))
const state = reactive({
  statusBarHeight: 0,
  barHeight: 0,
  top: 0
})
const { top, height } = Taro.getMenuButtonBoundingClientRect()
const { statusBarHeight, platform } = Taro.getSystemInfoSync() //状态栏高度
state.top = top
state.statusBarHeight = statusBarHeight
if (top && height) {
  state.barHeight = (top - statusBarHeight) * 2 + height //navigationBar 距屏幕上方的距离
} else {
  if (platform === 'android') {
    state.barHeight = 48;
  } else {
    state.barHeight = 40;
  }
}

const handleToEstimate = () => {
  Taro.navigateTo({
    url: '/pages/estimate/index'
  })
}

const handleToHistory = () => {
  Taro.navigateTo({
    url: '/pages/history/index'
  })
}

const handleExit = () => {
  Taro.removeStorageSync('token')
  Taro.redirectTo({
    url: '/pages/login/index'
  })
}
</script>

<style lang="scss">
page {
  width: 100%;
  background-color: #f5f5f5;
}

.mine {
  text-align: mine;

  &-nav {
    width: 100%;
    height: 240px;
    text-align: center;
    background: linear-gradient(#ff5520, #ff9d4a);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    &-title {
      color: #ffffff;
      font-size: 20px;
    }
  }

  &-top {
    margin-top: 20px;

    &-title {
      padding: 10px 0;
      color: #ffffff;
      font-size: px;
    }
  }

  &-content {
    margin: 10px;
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    color: #333333;
    font-size: 16px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;

      &:nth-of-type(1) {
        border-bottom: 1px solid #f5f5f5;
      }

      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  &-footer {
    width: 335px;
    margin-left: 20px;
    position: absolute;
    bottom: 20px;
  }
}
</style>
