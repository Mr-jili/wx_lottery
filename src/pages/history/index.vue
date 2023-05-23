<template>
  <view class="index">
    个人中心
  </view>
</template>
  
<script setup>
import Taro from "@tarojs/taro";
import { ref, reactive, onMounted } from "vue";
import { Toast } from "@nutui/nutui";
import { getHistoryList } from "../../common/api";

const historyList = ref([])

const getHistoryData = async () => {
  const { data } = await getHistoryList({
    pageNum: 1,
    pageSize: 10,
    'params[beginTime]': '2023-05-22 00:00:00',
    'params[endTime]': '2023-05-23 00:00:00'
  })
  historyList.value = data.rows
}

onMounted(() => {
  getHistoryData()
})
</script>
  
<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
  