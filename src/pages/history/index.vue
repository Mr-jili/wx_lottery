<template>
  <view class="history">
    <view class="history-search">
      <nut-cell :showIcon="true" title="时间" :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择时间'"
        @click="openSwitch('isVisible')">
      </nut-cell>
      <nut-calendar v-model:visible="isVisible" :default-value="date" type="range" :start-date="`2019-12-22`"
        :end-date="`2021-01-08`" @close="closeSwitch('isVisible')" @choose="setChooseValue" @select="select">
      </nut-calendar>
    </view>
    <view class="history-content">
      <view>
        时间：
      </view>
      <view>
        选中公司：1、A公司 2、B公司
      </view>
      <view>
        参与摇号公司：
        xxx
      </view>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getHistoryList } from '../../common/api'
const state = reactive({
  date: [],
  isVisible: false
});
const historyList = ref([])

const openSwitch = param => {
  state[`${param}`] = true;
};
const closeSwitch = param => {
  state[`${param}`] = false;
};
const setChooseValue = param => {
  state.date = [...[param[0][3], param[1][3]]];
};
const select = (param) => {
  console.log(param);
};

// lotteryType 1商业 2住宅
const getHistoryData = async () => {
  const { data } = await getHistoryList({
    lotteryType: 1,
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
.nut-cell__value {
  flex: initial;
}
</style>


<!-- <template>
  <view class="history">
    <view class="history-search">

    </view>    
  </view>
</template>
  
<script setup>
import Taro from "@tarojs/taro";
import { ref, reactive, onMounted } from "vue";
import { Toast } from "@nutui/nutui";
import { getHistoryList } from "../../common/api";


</script>
  
<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
   -->