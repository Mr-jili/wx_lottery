<template>
    <view class="register">
        <nut-form :model-value="state" ref="form">
            <nut-form-item label="客户经理姓名">
                <input class="nut-input-text" v-model="state.nickName" placeholder="请输入客户经理电话" type="text" />
            </nut-form-item>
            <nut-form-item label="客户经理电话">
                <input class="nut-input-text" v-model="state.phonenumber" placeholder="请输入客户经理电话" type="number" />
            </nut-form-item>
            <nut-form-item label="银行机构名称">
                <input class="nut-input-text" v-model="state.remark" placeholder="请输入银行机构名称" type="text" />
            </nut-form-item>
        </nut-form>
        <nut-button type="primary" style="width: 90%;margin-left: 5%;" @click="onFinish">提 交</nut-button>
    </view>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { reactive, onMounted, ref } from 'vue'
import { updateUserInfo } from '../../../common/api'
const form = ref(null)

const state = reactive({
    nickName: '',
    phonenumber: '',
    remark: ''
})

const onFinish = () => {
    form.value.validate().then(async res => {
        if (res.valid) {
            await updateUserInfo({ ...state })
            Taro.showToast({
                title: '修改成功',
                success: () => {
                    setTimeout(() => {
                        Taro.redirectTo({
                            url: '/pages/login/index'
                        })
                    }, 1000);
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
  