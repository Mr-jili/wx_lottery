<template>
  <view class="login">
    <view class="content">
      <nut-input placeholder="请输入用户名" v-model="state.username" />
      <nut-input placeholder="请输入密码" v-model="state.password" type="password"/>
    </view>
    <nut-button class="btn" type="primary" @click="handleClick()">登录</nut-button>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro";
import { reactive } from "vue";
import { setLogin } from "../../common/api";
export default {
  name: "Index",
  components: {},
  setup() {
    const state = reactive({
      username: "admin",
      password: "admin123",
    });

    const handleClick = async () => {
      const { data } = await setLogin({
        username: "admin",
        password: "admin123",
      });
      if (data.code === 200) {
        Taro.setStorageSync("token", data.token);
        Taro.showToast({
          title: "登录成功",
          success: () => {
            Taro.switchTab({
              url: "/pages/home/index",
            });
          },
        });
      }
    };

    return {
      state,
      handleClick,
    };
  },
};
</script>

<style lang="scss">
.login {
  text-align: center;
  .btn {
    margin-top: 50px;
    width: 300px;
  }
}
</style>
