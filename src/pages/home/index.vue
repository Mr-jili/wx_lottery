<template>
    <view class="home">
        <view class="home-nav" :style="{ paddingTop: state.statusBarHeight + 'px' }">
            <view class="home-nav-title"
                :style="{ lineHeight: state.barHeight + (state.top - state.statusBarHeight) + 'px' }">
                授信押品评估机构
            </view>
        </view>
        <nut-tabs style="width: 180px; margin-top: 20px;" size="large" v-model="tabValue" :animated-time="0"
            @click="changeTab">
            <nut-tabpane title="商业评估" pane-key="1" :disabled="state.isExecute"></nut-tabpane>
            <nut-tabpane title="住宅评估" pane-key="2" :disabled="state.isExecute"></nut-tabpane>
        </nut-tabs>
        <view class="home-content">
            <LuckyWheel :style="{ display: state.visible ? 'none' : 'block' }" v-if="state.prizes.length > 0" ref="myLucky"
                width="248px" height="248px" :defaultConfig="state.defaultConfig" :defaultStyle="state.defaultStyle"
                :prizes="state.prizes" :buttons="state.buttons" @start="startCallback" @end="endCallback">
            </LuckyWheel>
            <view class="home-empty" v-else-if="state.loadFinish && state.prizes.length === 0">暂无数据</view>
        </view>
        <view class="home-result" v-if="tableData.length > 0">
            <view class="home-result-title"> 客户名称：{{ state.customerName }}</view>
            <nut-divider :dashed="true" style="color:#ff5520;margin: 10px 20px;font-weight: 500;">摇 中 名 单</nut-divider>
            <view class="home-result-content">
                <view class="home-result-content-item" v-for="(value, index) in tableData" :key="value.companyName">
                    <view class="round">{{ index + 1 }}</view>
                    <text class="text">{{ value.companyName }}</text>

                </view>
            </view>
        </view>
        <view class="home-record" @click="handleToHistory">
            <text>摇号记录</text>
            <nut-icon name="right"></nut-icon>
        </view>

        <!-- 摇号客户名称 -->
        <nut-dialog title="客户名称" :closeOnClickOverlay="true" v-model:visible="state.visible" customClass="dialog-content">
            <nut-input v-model="state.customerName" placeholder="请输入客户名称" />
            <template #footer>
                <nut-button size="small" type="default" @click="state.visible = false;">取消</nut-button>
                <nut-button style="margin-left: 10px;" size="small" type="primary" @click="handleOk">确定</nut-button>
            </template>
        </nut-dialog>
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
const companyList = ref([])

const state = reactive({
    customerName: '',
    statusBarHeight: 0,
    barHeight: 0,
    top: 0,
    loadFinish: false,
    visible: false,
    prizes: [],
    buttons: [
        { radius: '40px', background: '#fff1c8' },
        { radius: '35px', background: '#ff893e' },
        {
            radius: '30px', background: '#ff4e2c',
            pointer: true,
            fonts: [{ text: '开始\n摇号', fontSize: '16px', top: '-25px', fontColor: '#fff' }],
        },
    ],
    defaultConfig: {
        gutter: 10,
    },
    defaultStyle: {
        background: 'rgba(98, 89, 255, 0.8)',
        fontColor: '#fff',
        fontSize: '12px',
        fontStyle: '黑体',
        lengthLimit: '90%',
        lineHeight: 18,
        lineClamp: 3
    },
    // 第一次摇中
    prizeIndex1: null,
    // 第二次摇中
    prizeIndex2: null,
    shakeList: [],
    index: 0,
    isExecute: false // 是否摇中执行完毕
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
    // 如果未获取到token，退回登录页
    if (!Taro.getStorageSync('token')) {
        Taro.showToast({
            title: '请进行登录',
            icon: 'none',
            success: () => {
                setTimeout(() => {
                    Taro.redirectTo({
                        url: '/pages/login/index'
                    })
                }, 1000)
            }
        })
        return false
    }
    if (companyList.value.length === 1) {
        Taro.showToast({
            title: '数据量过少，请进行增加！',
            icon: 'none'
        })
        return false
    }
    state.customerName = ''
    state.visible = true
}

const handleOk = async () => {
    if (!state.customerName) {
        Taro.showToast({
            title: '请输入客户名称',
            icon: 'none'
        })
        return false
    }
    state.visible = false
    state.index = 0
    myLucky.value.play()
    const { data } = await setLottery({
        type: tabValue.value,
        num: 2,
        customerName: state.customerName
    })
    state.isExecute = true
    const shakeData = data.data
    state.shakeList = shakeData
    state.prizeIndex1 = companyList.value.findIndex(item => item.id === shakeData[0].id)
    state.prizeIndex2 = companyList.value.findIndex(item => item.id === shakeData[1].id)
    setTimeout(() => {
        myLucky.value.stop(state.prizeIndex1)
    }, 4000)
    setTimeout(() => {
        myLucky.value.stop(state.prizeIndex2)
    }, 8000)
}

// 抽奖结束会触发end回调
async function endCallback(prize) {
    if (state.index === 0) {
        tableData.value = []
    }
    ++state.index;
    if (state.index === 1) {
        myLucky.value.play()
        tableData.value.push({
            companyName: state.shakeList[0].companyName,
            index: 1
        })
    }
    if (state.index === 2) {
        tableData.value.push({
            companyName: state.shakeList[1].companyName,
            index: 2
        })
        state.isExecute = false
    }
}

const init = () => {
    getCompanyData()
}

// 获取公司列表 companyType 1商业 2住宅
const getCompanyData = async () => {
    tableData.value = []
    const { data } = await getCompanyList({ companyType: tabValue.value })
    console.log(data, 66666)
    if (data.rows.length === 2) {
        state.prizes = data.rows.filter((item, index) => index < 2).map((item, index) => {
            return {
                fonts: [{ text: item.companyName, top: '25%', lengthLimit: '120px', fontSize: '12px' }]
            }
        })
    } else if (data.rows.length >= 7) {
        state.prizes = data.rows.map((item, index) => {
            return {
                fonts: [{ text: item.companyName, top: '5%', lengthLimit: '90%', lineClamp: 3, fontSize: '11px' }]
            }
        })
    } else {
        state.prizes = data.rows.map((item, index) => {
            return {
                fonts: [{ text: item.companyName, top: '15%', fontSize: '12px', lineClamp: 3 }]
            }
        })
    }
    companyList.value = data.rows
    state.loadFinish = true
}

// 历史记录
const handleToHistory = () => {
    Taro.navigateTo({
        url: '/pages/history/index'
    })
}

const changeTab = (tab) => {
    if (state.isExecute) {
        Taro.showToast({
            title: '正在摇号中，请稍后切换',
            icon: 'none'
        })
    } else {
        tableData.value = []
        tabValue.value = tab.paneKey;
        getCompanyData()
    }
}

onMounted(() => {
    init()
})
</script>