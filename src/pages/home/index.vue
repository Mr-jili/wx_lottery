<template>
    <view class="home">
        <view class="home-nav" :style="{ paddingTop: state.statusBarHeight + 'px' }">
            <view class="home-nav-title"
                :style="{ lineHeight: state.barHeight + (state.top - state.statusBarHeight) + 'px' }">
                授信押品评估机构
            </view>
        </view>
        <nut-tabs size="large" v-model="tabValue" :animated-time="0" @click="changeTab">
            <nut-tabpane title="商业评估" pane-key="1"></nut-tabpane>
            <nut-tabpane title="住宅评估" pane-key="2"></nut-tabpane>
        </nut-tabs>
        <view class="home-content">
            <LuckyWheel v-if="state.prizes.length > 0" ref="myLucky" width="270px" height="270px"
                :defaultConfig="state.defaultConfig" :prizes="state.prizes" :buttons="state.buttons" @start="startCallback"
                @end="endCallback">
            </LuckyWheel>
            <view class="home-empty" v-else-if="state.loadFinish && state.prizes.length === 0">暂无数据</view>
        </view>
        <!-- <view class="lottery">3334</view> -->
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
import { getCompanyList, setLottery } from "../../common/api";
import './index.scss'

const tabValue = ref(1)
const tableData = ref([])
const state = reactive({
    statusBarHeight: 0,
    barHeight: 0,
    top: 0,
    loadFinish: false,
    prizes: [],
    buttons: [
        { radius: '40px', background: '#ffffff' },
        { radius: '35px', background: '#ff893e' },
        {
            radius: '30px', background: '#ff7935',
            pointer: true,
            fonts: [{ text: '摇号', top: '-10px', fontColor: '#fff' }],
            imgs: [{ src: require('../../assets/images/yaohao.png') }]
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
    state.prizes = data.rows.map((item, index) => {
        return {
            fonts: [{ text: item.companyName, top: '20%', fontSize: '14px', fontColor: '#ffffff', wordWrap: true, lineHeight: 20, lengthLimit: '40%' }],
            // imgs: [{ src: item.companyPic }],
            background: '#ff9143'
        }
    })
    state.loadFinish = true
}

// 历史记录
const handleHistory = () => {
    Taro.navigateTo({
        url: '/pages/history/index'
    })
}

const changeTab = (tab) => {
    tableData.value = []
    tabValue.value = tab.paneKey;
    getCompanyData()
}

onMounted(() => {
    init()
})
</script>