<template>
    <view class="login-index">
        <!-- <img :src="headerUrl" class="header-img" /> -->
        <view class="login-index-content">
            <text class="login-index-content-title">房地产评估机构摇号</text>
            <!-- <text>您好，欢迎登录！</text> -->
            <view class="login-index-content-input">
                <view style="margin-top:40px">
                    <view class="login-input">
                        <img :src="unUrl" class="phone-icon" />
                        <nut-input v-model="state.username" label="用户号" label-width="50" max-length="11"
                            placeholder="输入用户名" />
                    </view>
                    <view class="login-input">
                        <img :src="pswUrl" class="code-icon" />
                        <nut-input v-model="state.password" type="password" label="密码" style="flex:1;" label-width="50"
                            placeholder="输入密码" />
                    </view>
                    <view style="margin-left: 200px;margin-top: 20px;">
                        <nut-checkbox v-model="state.isNeedRemember">记住密码</nut-checkbox>
                    </view>
                </view>
                <nut-button style="width:100%;height:48px" type="primary" @click="loginIn">登录</nut-button>
            </view>
        </view>
    </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { reactive, onMounted } from 'vue'
import { setLogin } from "../../common/api";
import './index.scss'

const unUrl = require('../../assets/images/icon-phone.png')
const pswUrl = require('../../assets/images/icon-password.png')

const state = reactive({
    username: "",
    password: "",
    isNeedRemember: false
})

const loginIn = async () => {
    if (!state.username) {
        Taro.showToast({
            title: '请输入用户名',
            icon: 'none'
        })
        return false
    }

    if (!state.password) {
        Taro.showToast({
            title: '请输入密码',
            icon: 'none'
        })
        return false
    }

    const { data } = await setLogin({
        username: state.username,
        password: state.password
    });

    if (data.code === 200) {
        Taro.setStorageSync("token", data.token);
        Taro.showToast({
            title: "登录成功",
            success: () => {
                if (state.isNeedRemember) {
                    Taro.setStorageSync("username", state.username)
                    Taro.setStorageSync("password", state.password)
                } else {
                    Taro.removeStorageSync("username")
                    Taro.removeStorageSync("password")
                }
                Taro.switchTab({
                    url: "/pages/home/index",
                });
            },
        });
    }
};

onMounted(() => {
    // 记住密码
    const username = Taro.getStorageSync('username')
    const password = Taro.getStorageSync('password')
    if (username && password) {
        state.username = username
        state.password = password
        state.isNeedRemember = true
    } else {
        state.isNeedRemember = false
    }
})
</script>
