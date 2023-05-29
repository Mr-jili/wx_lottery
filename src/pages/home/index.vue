<template>
  <view class="home">
    <view class="home-nav" :style="{ paddingTop: state.statusBarHeight + 'px' }">
      <view class="home-nav-title" :style="{ lineHeight: state.barHeight + (state.top - state.statusBarHeight) + 'px' }">
        授信押品评估机构
      </view>
    </view>
    <nut-tabs size="large" v-model="tabValue" style="" :animated-time="0" @click="changeTab">
      <nut-tabpane title="商业评估" pane-key="1"></nut-tabpane>
      <nut-tabpane title="住宅评估" pane-key="2"></nut-tabpane>
    </nut-tabs>

    <view class="home-content" v-if="state.prizes.length > 0">
      <LuckyWheel ref="myLucky" width="300px" height="300px" :defaultConfig="state.defaultConfig" :prizes="state.prizes"
        :blocks="state.blocks" :buttons="state.buttons" @start="startCallback" @end="endCallback"></LuckyWheel>
    </view>
    <nut-empty v-else-if="state.loadFinish && state.prizes.length === 0" description="暂无数据"></nut-empty>
    <view class="home-result" v-if="tableData.length > 0">
      <nut-divider :dashed="true" style="color:#ff5520;margin: 20px;">摇中名单</nut-divider>
      <view class="home-result-content">
        <view class="home-result-content-item" v-for="(value, index) in tableData" :key="value.companyName">
          <view class="round">{{ index + 1 }}</view>
          <text class="text">{{ value.companyName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { LuckyWheel } from '@lucky-canvas/taro/vue'
import { ref, reactive, onMounted } from "vue";
import { Toast } from "@nutui/nutui";
import { getCompanyList, setLottery } from "../../common/api";
const tabValue = ref(1)
const tableData = ref([])
const state = reactive({
  statusBarHeight: 0,
  barHeight: 0,
  top: 0,
  loadFinish: false,
  blocks: [{ padding: '10px', background: '#869cfa', borderRadius: '10px', imgs: [{ src: '' }] }, {
    padding: '10px', background: '#e9e8fe',
    borderRadius: '10px'
  }],
  prizes: [],
  buttons: [
    { radius: '40px', background: '#ffffff' },
    { radius: '30px', background: '#ffffff' },
    {
      radius: '30px', background: '#ff7935',
      pointer: true,
      fonts: [{ text: '摇号', top: '-10px', fontColor: '#fff' }]
    },
  ],
  defaultConfig: {
    gutter: 5,
    decelerationTime: 10000
  }
})

// 顶部导航栏
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

const myLucky = ref(null)

async function startCallback() {
  myLucky.value.play()
  setTimeout(() => {
    myLucky.value.stop()
  }, 5000)
}
// 抽奖结束会触发end回调
async function endCallback(prize) {
  const { data } = await setLottery({
    type: tabValue.value,
    num: 2
  })
  tableData.value = data.data.map((item, index) => {
    return {
      companyName: item.companyName,
      index: index + 1
    }
  })
}

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
  tableData.value = []
  const { data } = await getCompanyList({ companyType: tabValue.value })
  // prizeList.value = data.rows.map(item => {
  //   return {
  //     id: item.id,
  //     prizeName: item.companyName,
  //     prizeImg: item.companyPic
  //   }
  // })
  state.prizes = data.rows.map((item, index) => {
    // const bg = index % 3 === 0 ? 'rgb(255, 231, 149)' : index % 3 === 1 ? 'rgb(255, 247, 223)' : 'rgba(246, 142, 46, 0.5)'
    const bg = 'rgba(246, 142, 46, 0.5)'
    return {
      fonts: [{ text: item.companyName, top: '20%', fontSize: '14px', fontColor: '#999999', wordWrap: true, lineHeight: 20, lengthLimit: '40%' }],
      // imgs: [{ src: item.companyPic }],
      background: bg
    }
  })
  state.loadFinish = true
}

// 摇号
// const handleLottery = async () => {
//   turntable.value.rotateTurn();
// }

// 历史记录
const handleHistory = () => {
  Taro.navigateTo({
    url: '/pages/history/index'
  })
}

const changeTab = (tab) => {
  myLucky.value.init()
  tableData.value = []
  tabValue.value = tab.paneKey;
  getCompanyData()
}

onMounted(() => {
  init()
})
</script>

<style lang="scss">
page {
  background-color: #ffffff;
}

.home {
  &-nav {
    width: 100%;
    text-align: center;
    background: linear-gradient(#ff5520, #ff9d4a);

    &-title {
      color: #ffffff;
      font-size: 18px;
    }
  }

  &-content {
    display: flex;
    align-items: center;
    margin-left: 20px;
    width: 335px;
    height: 335px;
    border-radius: 50%;
    background-image: url('../../assets/images/turplate-bg.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ff5520;
  }

  &-btn {
    width: 300px;
    margin-left: 37.5px;
    position: absolute;
    top: 69%;
  }

  &-result {
    width: 375px;
    position: absolute;
    top: 70%;

    &-content {
      text-align: center;

      &-item {
        margin: 10px 20px;
        display: flex;
        align-items: center;

        .round {
          width: 20px;
          height: 20px;
          background-color: red;
          color: #ffffff;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          font-size: 16px;
        }

        .text {
          padding-left: 20px;
          flex: 1;

          font-size: 16px;
        }
      }
    }
  }
}
</style>
