<template>
  <view class="index">
    <ul>
      <li v-for="item in lotteryList">
        {{ item.companyName }}
      </li>
    </ul>
    <CustomLottery></CustomLottery>
    <nut-button class="btn" type="primary" @click="handleLottery">摇号</nut-button>
    <nut-button class="btn" type="primary" @click="handleHistory">历史记录</nut-button>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref, reactive, onMounted } from "vue";
import { Toast } from "@nutui/nutui";
import { getCompanyList, setLottery } from "../../common/api";
import CustomLottery from '../../components/customLottery'

const companyList = ref([])
const lotteryList = ref([])

const init = () => {
  // 如果未获取到token，退回登录页
  if (!Taro.getStorageSync('token')) {
    Taro.redirectTo({
      url: '/pages/login/index'
    })
    return false
  }
  getCompanyData()
}

// 获取公司列表 companyType 1商业 2住宅
const getCompanyData = async () => {
  const { data } = await getCompanyList({ companyType: 2 })
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
})
</script>

<style lang="scss">
.index {
  color: red;
}
</style>
