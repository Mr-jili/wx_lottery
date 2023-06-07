<template>
    <view class="register">
        <nut-form :model-value="state" ref="form">
            <nut-form-item label="用户名" prop="username" required :rules="[{ required: true, message: '请填写用户名' }]">
                <input class="nut-input-text" v-model="state.username" placeholder="请输入用户名" type="text" />
            </nut-form-item>
            <nut-form-item label="密码" prop="password" required :rules="[{ required: true, message: '请填写密码' }]">
                <input class="nut-input-text" v-model="state.password" placeholder="请输入密码" type="password" />
            </nut-form-item>
            <nut-form-item label="客户经理姓名">
                <input class="nut-input-text" v-model="state.nickName" placeholder="请输入客户经理姓名" type="text" />
            </nut-form-item>
            <nut-form-item label="客户经理电话">
                <input class="nut-input-text" v-model="state.phonenumber" placeholder="请输入客户经理电话" type="number" />
            </nut-form-item>
        </nut-form>
        <nut-button type="primary" style="width: 90%;margin-left: 5%;" @click="onFinish">提 交</nut-button>
    </view>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { reactive, onMounted, ref } from 'vue'
import { setRegister } from '../../../common/api'
const form = ref(null)

const state = reactive({
    username: '',
    password: '',
    nickName: '',
    phonenumber: '',
    roleId: 2 // 要求写死2
})

const onFinish = () => {
    form.value.validate().then(async res => {
        if (res.valid) {
            await setRegister({ ...state })
            Taro.showToast({
                title: '注册成功',
                duration: 2000,
                success: () => {
                    setTimeout(() => {
                        Taro.redirectTo({
                            url: '/pages/login/index'
                        })
                    }, 1000)
                }
            })
        } else {
            console.log('error submit!!', res.errors);
        }
    })
}

</script>

<style lang="scss">
page {
    background-color: #fff;
}
</style>
  