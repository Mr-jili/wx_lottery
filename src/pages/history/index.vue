<template>
  <view class="history">
    <view class="history-search">
      <nut-menu>
        <nut-menu-item v-model="state.lotteryType" :options="state.options1" @change="handleChange" />
        <nut-menu-item title="筛选" ref="item">
          <div :style="{ display: 'flex', flex: 1, 'justify-content': 'space-between', 'align-items': 'center' }">
            <div :style="{ marginRight: '10px' }">自定义内容</div>
            <nut-button @click="onConfirm">确认</nut-button>
          </div>
        </nut-menu-item>
      </nut-menu>
    </view>
    <view class="history-content">
      <view class="history-content-item" v-for="value in historyList" :key="value.lotteryPeriods">
        <view style="padding: 20px;" @click="handleClick(value)">
          <view class="top">
            <text>{{ value.lotteryPeriods }}</text>
            <text>{{ value.createTime }}</text>
          </view>
          <view class="center">
            {{ value.realEstatelLotteryWinningList[0]?.realEstatelCompany?.companyName }}
          </view>
          <view class="footer">
            {{ value.realEstatelLotteryWinningList[1]?.realEstatelCompany?.companyName }}
          </view>
          <img class="img" :src="arrowBottom" alt="xxx">
        </view>
        <view class="modal" v-if="value.active">
          本期参与摇号：
          <text>{{ value.realEstatelCompanies.join('、') }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getHistoryList } from '../../common/api'
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { satisfies } from 'semver';

const arrowBottom = ref(require('../../assets/images/arrow-down.png'))
const state = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  date: [],
  isVisible: false,
  options1: [
    { text: '商业评估', value: 1 },
    { text: '房产评估', value: 2 },
  ],
  lotteryType: 1
});

const historyList = ref([])


// lotteryType 1商业 2住宅
const getHistoryData = async () => {
  const { data } = await getHistoryList({
    lotteryType: state.lotteryType,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    'params[beginTime]': '2023-05-22 00:00:00',
    'params[endTime]': '2023-05-23 00:00:00'
  })
  historyList.value = data.rows.map(item => {
    return {
      ...item,
      realEstatelCompanies: item.realEstatelCompanies.map(value => value.companyName),
      active: false
    }
  })
}
const handleClick = (value) => {
  value.active = !value.active
}
const handleChange = (value) => {
  console.log('val', value);
  state.lotteryType = value
  getHistoryData()
}

usePullDownRefresh(() => {
  state.pageNum = 1
  getHistoryData()
})

useReachBottom(() => {
  state.pageNum++
})
onMounted(() => {
  getHistoryData()
})
</script>
<style lang="scss">
page {
  background-color: #f5f5f5;
}

.history {
  &-search {}

  &-content {
    margin: 20px;

    &-item {
      position: relative;
      background-color: #ffffff;
      border-radius: 8px;
      margin-bottom: 20px;
      padding-bottom: 20px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        text:nth-of-type(1) {
          font-size: 18px;
          color: #333333;
        }

        text:nth-of-type(2) {
          font-size: 16px;
          color: #999999;
        }
      }

      .center {
        color: #666666;
        font-size: 18px;
        padding: 5px 0;
      }

      .footer {
        color: #666666;
        font-size: 16px;
      }

      .img {
        position: absolute;
        right: 50%;
        bottom: 0px;
        width: 20px;
        height: 20px;
        padding: 10px 0;
      }

      .modal {
        padding: 20px;
        border-top: 1px dashed #f5f5f5;
      }
    }
  }
}
</style>