<template>
    <view class="estimate">
        <view class="estimate-item">
            <view>评估值</view>
            <view>
                <nut-input style="width: 300px" type="number" v-model="state.num" placeholder="请输入" />
                <text>元</text>
            </view>
        </view>
        <view class="estimate-item">
            <view>标准收费</view>
            <view>￥ {{ state.amount }}</view>
        </view>
        <view class="estimate-item">
            <view>浮动系数</view>
            <view>
                <nut-input style="width: 300px" type="number" v-model="state.ratio" placeholder="请输入" />
                <text>%</text>
            </view>
        </view>
        <view class="estimate-item">
            <view>收费金额</view>
            <view>￥ {{ state.chargeAmount }}</view>
        </view>
    </view>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

const state = reactive({
    num: '',
    ratio: 100,
    amount: '0.00',
    chargeAmount: '0.00',
})


state.amount = computed(() => {
    return (state.num / 10000 * 0.005 * 10000).toFixed(0)
})

state.chargeAmount = computed(() => {
    return (state.amount * state.ratio / 100).toFixed(0)
})

</script>  

<style lang="scss">
page {
    background-color: #f5f5f5;
}

.estimate {
    font-size: 16px;

    &-item {
        display: flex;
        align-items: center;
        padding: 20px 0;

        view:nth-of-type(1) {
            margin-right: 28px;
            width: 100px;
            text-align: right;
        }

        view:nth-of-type(2) {
            display: flex;
            align-items: center
        }
    }
}
</style>
  