<template>
  <view class="index">
    首页1111

    <ul>
      <li v-for="item in lotteryList">
        {{ item.companyName }}
      </li>
    </ul>

    <nut-button class="btn" type="primary" @click="handleLottery">摇号</nut-button>


    <nut-button class="btn" type="primary" @click="handleHistory">历史记录</nut-button>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref, reactive, onMounted } from "vue";
import { Toast } from "@nutui/nutui";
import { getCompanyList, setLottery } from "../../common/api";

const companyList = ref([])
const lotteryList = ref([])

const init = () => {
  // 如果未获取到token，退回登录页
  if (!Taro.getStorageSync('token')) {
    Taro.redirectTo({
      url: '/pages/login/index'
    })
  }
}

// 获取公司列表
const getCompanyData = async () => {
  const { data } = await getCompanyList({})
  companyList.value = data
}

// 摇号
const handleLottery = async () => {
  const { data } = await setLottery({
    type: 1,
    num: 1
  })
  lotteryList.value = data.data
}

// 历史记录
const handleHistory = () => {
  Taro.navigateTo({
    url: '/pages/history/index'
  })
}

onMounted(() => {
  init()
  getCompanyData()
})
</script>

<style lang="scss">
.index {
  color: red;
}
</style>
