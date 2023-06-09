<template>
    <view class="mine">
        <template v-if="state.isLogin">
            <view class="mine-nav" :style="{ paddingTop: state.statusBarHeight + 'px' }">
                <view class="mine-nav-title"
                    :style="{ lineHeight: state.barHeight + (state.top - state.statusBarHeight) + 'px' }">
                    我的</view>
                <view class="mine-top">
                    <nut-avatar style="width: 80px;height: 80px;" size="large">
                        <img :src="require('../../assets/images/login_user.png')" />
                    </nut-avatar>
                    <view class="mine-top-title">{{ state.username }}</view>
                </view>
            </view>

            <view class="mine-content">
                <view v-if="state.isShowRegister" class="mine-content-item" @click="handleToPersonal">
                    <text>完善个人资料</text>
                    <nut-icon name="rect-right"></nut-icon>
                </view>
                <view class="mine-content-item" @click="handleToPassword">
                    <text>修改密码</text>
                    <nut-icon name="rect-right"></nut-icon>
                </view>
                <view class="mine-content-item" @click="handleToHistory">
                    <text>摇号记录</text>
                    <nut-icon name="rect-right"></nut-icon>
                </view>
            </view>
            <nut-button class="mine-footer" block type="primary" @click="handleExit">退出登录</nut-button>
        </template>
        <view class="mine-to-login" v-else>
            <view class="mine-to-login-title">请进行登录</view>
            <nut-button class="mine-to-login-btn" block type="primary" @click="handleToLogin">去登录</nut-button>
        </view>
    </view>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import Taro, { useDidShow } from "@tarojs/taro";

const state = reactive({
    username: Taro.getStorageSync('username'),
    statusBarHeight: 0,
    barHeight: 0,
    top: 0,
    isLogin: true,
    isShowRegister: true
})
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

const handleToLogin = () => {
    Taro.navigateTo({
        url: '/pages/login/index'
    })
}

// 跳转至修改密码
const handleToPassword = () => {
    Taro.navigateTo({
        url: '/pages/root/password/index'
    })
}

// 跳转至完善页面
const handleToPersonal = () => {
    Taro.navigateTo({
        url: '/pages/root/ImprovePersonal/index'
    })
}

// 跳转至摇号历史
const handleToHistory = () => {
    Taro.navigateTo({
        url: '/pages/history/index'
    })
}

// 退出
const handleExit = () => {
    Taro.removeStorageSync('token')
    Taro.redirectTo({
        url: '/pages/login/index'
    })
}

onMounted(() => {
    if (new Date().getTime() < 1686284720000) {
        state.isShowRegister = false
    }
})

useDidShow(() => {
    if (!Taro.getStorageSync('token')) {
        state.isLogin = false
    } else {
        state.isLogin = true
    }
})
</script>

<style lang="scss">
page {
    width: 100%;
    background-color: #f5f5f5;
}

.mine {
    text-align: center;

    &-nav {
        width: 100%;
        height: 240px;
        text-align: center;
        background: linear-gradient(#ff5520, #ff9d4a);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;

        &-title {
            color: #ffffff;
            font-size: 20px;
        }
    }

    &-top {
        margin-top: 20px;

        &-title {
            padding: 10px 0;
            color: #ffffff;
            font-size: px;
        }
    }

    &-content {
        margin: 10px;
        margin-top: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        color: #333333;
        font-size: 16px;

        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;

            &:nth-of-type(1),
            &:nth-of-type(2) {
                border-bottom: 1px solid #f5f5f5;
            }

            img {
                width: 30px;
                height: 30px;
            }
        }
    }

    &-footer {
        width: 335px;
        margin-left: 20px;
        position: absolute;
        bottom: 20px;
    }

    &-to-login {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80%;

        &-title {
            font-size: 16px;
        }

        &-btn {
            width: 100px;
            margin-left: 20px;
        }
    }
}
</style>
