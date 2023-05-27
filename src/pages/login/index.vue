<template>
    <view class="login-index">
        <!-- <img :src="headerUrl" class="header-img" /> -->
        <view class="login-index-content">
            <text>房地产评估机构摇号</text>
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
                        <nut-input v-model="state.password" label="密码" style="flex:1;" label-width="50"
                            placeholder="输入密码" />
                    </view>
                </view>
                <nut-button style="width:100%;height:48px" type="primary" @click="loginIn">登录</nut-button>
            </view>
        </view>
    </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { reactive } from 'vue'
import { setLogin } from "../../common/api";
import './index.scss'

// const headerUrl = 'https://hosjoy-hbp.oss-cn-hangzhou.aliyuncs.com/application/iot-bill/home-header.png'
const unUrl = require('../../assets/images/icon-phone.png')
const pswUrl = require('../../assets/images/icon-password.png')

const state = reactive({
    username: "admin",
    password: "admin123"
})

const loginIn = async () => {
    const { data } = await setLogin({
        username: state.username,
        password: state.password
    });
    if (data.code === 200) {
        Taro.setStorageSync("token", data.token);
        Taro.showToast({
            title: "登录成功",
            success: () => {
                Taro.switchTab({
                    url: "/pages/home/index",
                });
            },
        });
    }
};

</script>
