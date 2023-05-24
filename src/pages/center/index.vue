<template>
  <view class="index">
    <view class="index-top">
      <nut-avatar size="large">
        <img
          src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
      </nut-avatar>
      <view class="index-top-title">admin</view>
    </view>
    <view class="index-bottom">
      <nut-cell title="历史记录" size="large"></nut-cell>
      <nut-cell title="房产评估" size="large" style="margin-top: 20px;" @click="handleToEstimate"></nut-cell>
    </view>
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Taro from "@tarojs/taro";
export default {
  name: 'Index',
  components: {

  },
  setup() {
    const state = reactive({
      msg: '欢迎使用 NutUI3.0 开发小程序',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false
    });

    const handleClick = (type, msg, cover = false) => {
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };

    const handleToEstimate = () => {
      Taro.navigateTo({
        url: '/pages/estimate/index'
      })
    } 

    return {
      ...toRefs(state),
      handleClick,
      handleToEstimate
    }
  }
}
</script>

<style lang="scss">
.index {
  text-align: center;

  &-top {
    margin-top: 40px;

    &-title {
      color: #999999;
    }
  }

  &-bottom {
    margin: 20px;
  }
}
</style>
