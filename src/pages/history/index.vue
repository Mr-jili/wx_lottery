<template>
  <view class="history">
    <nut-menu :scroll-fixed="true">
      <nut-menu-item v-model="state.lotteryType" :options="state.options1" @change="handleChange" />
      <nut-menu-item title="筛选" ref="searchTime">
        <view class="search-time" @click="openSwitch('isTimeVisible')">
          <text>{{ state.dateText === '' ? '按时间筛选' : state.dateText }}</text>
          <nut-icon name="clock"></nut-icon>
        </view>
      </nut-menu-item>
    </nut-menu>
    <view class="history-content">
      <template v-if="historyList.length > 0">
        <view class="history-content-item" v-for="value in historyList" :key="value.lotteryPeriods">
          <view style="padding: 20px 20px 10px 20px;" @click="handleClick(value)">
            <view class="top">
              <text>{{ value.lotteryPeriods }}</text>
              <text>{{ value.createTime }}</text>
            </view>
            <view class="center" v-for="(child, childIndex) in value.realEstatelLotteryWinningList"
              :key="childIndex + 'A'">
              {{ childIndex + 1 }}、{{ child?.realEstatelCompany?.companyName }}
            </view>
            <nut-icon size="20" style="width: 100%;margin-top: 10px;"
              :name="!value.active ? 'rect-down' : 'rect-up'"></nut-icon>
          </view>
          <view class="modal" v-if="value.active">
            本期参与摇号：
            <text>{{ value.realEstatelCompanies.join('、') }}</text>
          </view>
        </view>
        <view class="load-more">
          <view class="load-more-loading" v-if="state.status === 'loading'">
            <nut-icon name="loading"></nut-icon>
            <text>加载中...</text>
          </view>
          <view v-else-if="state.status === 'nomore'">
            哎呀，这里是底部了啦
          </view>
        </view>
      </template>
      <nut-empty v-else-if="state.loadFinish && historyList.length === 0" description="暂无数据"></nut-empty>
    </view>

    <!-- 日历 -->
    <nut-calendar type="range" v-model:visible="state.isTimeVisible" :start-date="state.startDate"
      :end-date="state.endDate" :default-value="state.date" @close="closeSwitch('isTimeVisible')"
      @choose="setChooseValue">
    </nut-calendar>
  </view>
</template>
<script setup>
import Taro from "@tarojs/taro";
import { reactive, ref, onMounted } from 'vue';
import { getHistoryList } from '../../common/api'
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';

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
  lotteryType: 1,
  isTimeVisible: false,
  date: [],
  dateText: '',
  startDate: new Date().getFullYear() - 1 + new Date().toISOString().slice(4, 10),
  endDate: new Date().toISOString().slice(0, 10),
  loadFinish: false,
  status: 'loadmore'
});

const searchTime = ref('');
const historyList = ref([])

// lotteryType 1商业 2住宅
const getHistoryData = async (num) => {
  state.loadFinish = false
  const startTime = state.date.length > 0 ? state.date[0] + ' 00:00:00' : ''
  const endTime = state.date.length > 0 ? state.date[1] + ' 23:59:59' : ''
  const { data } = await getHistoryList({
    lotteryType: state.lotteryType,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    'params[beginTime]': startTime,
    'params[endTime]': endTime
  })
  const list = data.rows.map(item => {
    return {
      ...item,
      realEstatelCompanies: item.realEstatelCompanies.map(value => value.companyName),
      active: false
    }
  })
  if (num === 1) {
    historyList.value = historyList.value.concat(list)
  } else {
    historyList.value = list
  }
  state.loadFinish = true
  state.total = data.total
  if (state.total / state.pageSize > 1) {
    state.status = 'loadmore'
  } else {
    state.status = 'nomore'
  }
  Taro.stopPullDownRefresh()
}

const handleClick = (value) => {
  value.active = !value.active
}

const handleChange = (value) => {
  state.pageNum = 1
  historyList.value = []
  state.lotteryType = value
  getHistoryData()
}

const openSwitch = param => {
  state[`${param}`] = true;
};
const closeSwitch = param => {
  state[`${param}`] = false;
};
const setChooseValue = param => {
  state.date = [...[param[0][3], param[1][3]]];
  state.dateText = [...[param[0][3], param[1][3]]].join('至')
  searchTime.value.toggle()
  historyList.value = []
  state.pageNum = 1
  getHistoryData()
};

usePullDownRefresh(() => {
  state.pageNum = 1
  state.date = []
  state.dateText = ''
  getHistoryData()
})

useReachBottom(() => {
  state.pageNum = state.pageNum + 1
  if (state.total / state.pageSize >= state.pageNum) {
    state.status = 'loading'
    getHistoryData(1)
  } else {
    state.status = 'nomore'
  }
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
  .search-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 0 20px;

    text {
      color: #cdcdcd;
    }
  }

  &-content {
    margin: 20px;

    &-item {
      position: relative;
      background-color: #ffffff;
      border-radius: 8px;
      margin-bottom: 20px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        text:nth-of-type(1) {
          font-size: 16px;
          color: #333333;
        }

        text:nth-of-type(2) {
          font-size: 14px;
          color: #999999;
        }
      }

      .center {
        color: #666666;
        font-size: 16px;
        padding: 5px 0;
      }

      .modal {
        background-color: #EEEEEE;
        padding: 20px;
        border-radius: 10px;
      }
    }


  }

  .load-more {
    width: 100%;
    padding-bottom: 20px;
    color: #666666;
    font-size: 16px;
    text-align: center;

    &-loading {
      display: flex;
      align-items: center;
      justify-content: center;

      text {
        padding-left: 10px;
      }
    }
  }
}
</style>