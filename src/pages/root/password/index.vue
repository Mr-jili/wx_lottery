<template>
    <view class="update-password">
        <nut-form :model-value="state" ref="form">
            <nut-form-item label="旧密码" prop="oldPassword" required :rules="[{ required: true, message: '请填写旧密码' }]">
                <input class="nut-input-text" v-model="state.oldPassword" placeholder="请输入旧密码" type="text" />
            </nut-form-item>
            <nut-form-item label="新密码" prop="newPassword" required :rules="[{ required: true, message: '请填写新密码' }]">
                <input class="nut-input-text" v-model="state.newPassword" placeholder="请输入新密码" type="password" />
            </nut-form-item>
            <nut-form-item label="确认密码" prop="confirmPassword" required :rules="[{ required: true, message: '请填写确认密码' }]">
                <input class="nut-input-text" v-model="state.confirmPassword" placeholder="请输入确认密码" type="password" />
            </nut-form-item>
        </nut-form>
        <nut-button type="primary" style="width: 90%;margin-left: 5%;" @click="onFinish">确认修改</nut-button>
    </view>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { reactive, onMounted, ref } from 'vue'
import { updatePassword } from '../../../common/api'
const form = ref(null)

const state = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const onFinish = async () => {
    form.value.validate().then(async res => {
        if (res.valid) {
            if (state.newPassword !== state.confirmPassword) {
                Taro.showToast({
                    title: '密码输入不一致',
                    icon: 'none'
                })
                return false
            }
            const password = Taro.getStorageSync('password')
            if (state.oldPassword !== password) {
                Taro.showToast({
                    title: '修改密码失败，旧密码错误',
                    icon: 'none'
                })
                return false
            }
            const dataJson = { ...state }
            delete dataJson.confirmPassword
            await updatePassword({ ...dataJson })
            Taro.showToast({
                title: '修改成功',
                success: () => {
                    setTimeout(() => {
                        Taro.removeStorageSync('token')
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
  