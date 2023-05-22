<template>
  <view class="index">
    <view>
      <img src alt />
    </view>
    {{ msg }}
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)">登录</nut-button>
    </view>
    <nut-toast :msg="msg" :visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { reactive, toRefs } from "vue";
export default {
  name: "Index",
  components: {},
  setup() {
    const state = reactive({
      msg: "欢迎使用 NutUI3.0 开发小程序",
      msg2: "你成功了～",
      type: "text",
      show: false,
      cover: false
    });

    const handleClick = (type, msg, cover = false) => {
      Taro.switchTab({
        url: "/pages/home/index"
      });
    };

    return {
      ...toRefs(state),
      handleClick
    };
  }
};
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
