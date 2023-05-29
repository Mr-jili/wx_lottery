<template>
  <view class="home">
    <view class="home-nav" :style="{ paddingTop: state.statusBarHeight + 'px' }">
      <view class="home-nav-title" :style="{ lineHeight: state.barHeight + (state.top - state.statusBarHeight) + 'px' }">
        授信押品
      </view>
    </view>
    <nut-tabs size="large" v-model="tabValue" style="" :animated-time="0" @click="changeTab">
      <nut-tabpane title="商业评估" pane-key="1"></nut-tabpane>
      <nut-tabpane title="住宅评估" pane-key="2"></nut-tabpane>
    </nut-tabs>

    <!-- <nutbig-turntable class="turntable" ref="turntable" :width="luckWidth" :height="luckheight" :prize-list="prizeList"
      :lock-time="4" :turns-number="5" :turns-time="5" :prize-index="prizeIndex" :style-opt="styleOpt"
      :pointer-style="pointerStyle" @start-turns="startTurns" @end-turns="endTurns"></nutbig-turntable>
    <nut-button class="home-btn" style="" block type="primary" @click="handleLottery">{{ tableData.length === 0 ? '摇 号' :
      '重 新 摇 号' }}</nut-button> -->

    <template v-if="state.prizes.length > 0">
      <LuckyWheel ref="myLucky" width="300px" height="300px" :prizes="state.prizes" :blocks="state.blocks"
        :buttons="state.buttons" @start="startCallback" @end="endCallback"></LuckyWheel>
    </template>
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
  // blocks: [{ padding: '12px', background: '#f5f5f5' }],
  prizes: [],
  buttons: [
    { radius: '50px', background: '#ffffff' },
    { radius: '45px', background: '#ff893e' },
    {
      radius: '40px', background: '#ff7935',
      // pointer: true,
      fonts: [{ text: '摇号', top: '-10px', fontColor: '#fff' }]
    },
  ],
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

// 摇号
// const turntable = ref(null);
// const luckWidth = ref("300px");
// const luckheight = ref("300px");
// const pointerStyle = {
//   width: "80px",
//   height: "80px",
//   // backgroundImage:
//   //   'url("https://img11.360buyimg.com/imagetools/jfs/t1/89512/11/15244/137408/5e6f15edEf57fa3ff/cb57747119b3bf89.png")',
//   backgroundSize: "contain",
//   backgroundRepeat: "no-repeat"
// };
// const prizeList = ref([]);
// const turnsTime = ref(5);
// const styleOpt = reactive({
//   prizeBgColors: [
//     "rgb(255, 231, 149)",
//     "rgb(255, 247, 223)",
//     "rgba(246, 142, 46, 0.5)",
//     "rgb(255, 247, 223)",
//     "rgb(255, 231, 149)",
//     "rgba(246, 142, 46, 0.5)"
//   ],
//   borderColor: "#ff9800"
// });
// const prizeIndex = ref(-1);
// const startTurns = () => { };
// const endTurns = async () => {
//   console.log("中奖了");
//   const { data } = await setLottery({
//     type: tabValue.value,
//     num: 2
//   })
//   tableData.value = data.data.map((item, index) => {
//     return {
//       companyName: item.companyName,
//       index: index + 1
//     }
//   })
// };

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
    const bg = index % 3 === 0 ? 'rgb(255, 231, 149)' : index % 3 === 1 ? 'rgb(255, 247, 223)' : 'rgba(246, 142, 46, 0.5)'
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
    // height: 40px;
    text-align: center;
    background: linear-gradient(#ff5520, #ff9d4a);
    // border-bottom-left-radius: 20px;
    // border-bottom-right-radius: 20px;

    &-title {
      color: #ffffff;
      font-size: 20px;
    }
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
