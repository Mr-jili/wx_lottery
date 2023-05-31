<template>
    <view class="estimate">
        <view class="estimate-item">
            <view class="estimate-item-flex">
                <text class="estimate-item-flex-title">评估值：</text>
                <view class="estimate-item-flex-input">
                    <nut-input style="width: 120px" type="number" v-model="state.num" placeholder="请输入" />
                    <text>元</text>
                </view>
            </view>
            <view class="estimate-item-desc">人民币：{{ Number(state.num) !== 0 ? number2text(state.num) : '' }}</view>
        </view>
        <view class="estimate-item">
            <view class="estimate-item-flex">
                <text class="estimate-item-flex-title">标准收费：</text>
                <view class="estimate-item-flex-num">￥ {{ state.amount }}</view>
            </view>
            <view class="estimate-item-desc">人民币：{{ Number(state.amount) !== 0 ? number2text(state.amount) : '' }}</view>
        </view>
        <view class="estimate-item">
            <view class="estimate-item-flex">
                <text class="estimate-item-flex-title">浮动系数：</text>
                <view class="estimate-item-flex-input">
                    <nut-input style="width: 120px" type="number" v-model="state.ratio" placeholder="请输入" />
                    <text>%</text>
                </view>
            </view>
        </view>
        <view class="estimate-item">
            <view class="estimate-item-flex">
                <text class="estimate-item-flex-title">收费金额：</text>
                <view class="estimate-item-flex-num">￥ {{ state.chargeAmount }}</view>
            </view>
            <view class="estimate-item-desc">人民币：{{ Number(state.chargeAmount) !== 0 ? number2text(state.chargeAmount) : ''
            }}</view>
        </view>
        <view class="calculation">
            <view style="font-size: 16px;font-weight: 600;">计算过程</view>
            <view class="calculation-item">服务项目：房产评估</view>
            <view class="calculation-item">评估值：{{ state.num || 0 }}{{ state.num ? `（${number2text(state.num)}）` : '' }}
            </view>
            <view class="calculation-item">
                标准收费={{ state.amountText }}</view>
            <view class="calculation-item">浮动系数：{{ state.ratio }}%</view>
            <view class="calculation-item">收费金额=标准收费*浮动系数=
                {{ state.amount }}*{{ state.ratio }}%={{ state.chargeAmount }}{{
                    state.chargeAmount ?
                    `（${number2text(state.chargeAmount)}）` : '' }}</view>
        </view>
        <view class="rich-text">
            <rich-text :nodes="state.nodes" type="node"></rich-text>
        </view>
        <view style="padding: 10px;background-color: #fff;">
            <text style="padding: 10px 0;">附表：以房产为主的房地产价格评估收费标准计算表</text>
            <nut-table style="padding-top: 10px;" :columns="state.columns" :data="state.data"></nut-table>
        </view>
    </view>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { number2text, richText } from '../../common/utils'
import { reactive } from 'vue';

const state = reactive({
    num: '',
    ratio: 100,
    amount: '0.00',
    amountText: '',
    chargeAmount: '0.00',
    nodes: richText,
    columns: [{
        title: '序号',
        key: 'index',
    }, {
        title: '房地产价格总额（万元）',
        key: 'title'
    }, {
        title: '累进计费率‰',
        key: 'amount'
    }],
    data: [
        {
            index: 1,
            title: '100以下（含100）',
            amount: 5
        },
        {
            index: 2,
            title: '101以上至1000',
            amount: 2.5
        },
        {
            index: 3,
            title: '1001以上至2000',
            amount: 1.5
        },
        {
            index: 4,
            title: '2000以上至5000',
            amount: 0.8
        },
        {
            index: 5,
            title: '5001以上至8000',
            amount: 0.4
        },
        {
            index: 7,
            title: '8001以上至10000',
            amount: 0.2
        },
        {
            index: 8,
            title: '10000以上',
            amount: 0.1
        }
    ]
})

state.amount = computed(() => {
    let amountEnd = 0
    let amountText = ``
    const currentNum = state.num / 10000;
    if (currentNum <= 100) {
        amountEnd = (currentNum * 0.005 * 10000)
        amountText = `（${currentNum} * 0.005） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    } else if (currentNum > 100 && currentNum <= 1000) {
        amountEnd = (100 * 0.005 + (currentNum - 100) * 0.0025) * 10000
        amountText = `（100 * 0.005 + （${currentNum} - 100） * 0.0025） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    } else if (currentNum > 1000 && currentNum <= 2000) {
        amountEnd = (100 * 0.005 + 900 * 0.0025 + (currentNum - 1000) * 0.0015) * 10000
        amountText = `（100 * 0.005 + 900 * 0.0025 + （${currentNum} - 1000） * 0.0015） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    } else if (currentNum > 2000 && currentNum <= 5000) {
        amountEnd = (100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + (currentNum - 2000) * 0.0008) * 10000
        amountText = `（100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 +（${currentNum} - 2000） * 0.0008） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    } else if (currentNum > 5000 && currentNum <= 8000) {
        amountEnd = (100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + 3000 * 0.0008 + (currentNum - 5000) * 0.0004) * 10000
        amountText = `（100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + 3000 * 0.0008 +（${currentNum} - 5000） * 0.0004） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    } else if (currentNum > 8000 && currentNum <= 10000) {
        amountEnd = (100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + 3000 * 0.0008 + 3000 * 0.0004 + (currentNum - 8000) * 0.0002) * 10000
        amountText = `（100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + 3000 * 0.0008 + 3000 * 0.0004 +（${currentNum} - 8000） * 0.0002） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    } else if (currentNum > 10000) {
        amountEnd = (100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + 3000 * 0.0008 + 3000 * 0.0004 + 2000 * 0.0002 + (currentNum - 10000) * 0.0001) * 10000
        amountText = `（100 * 0.005 + 900 * 0.0025 + 1000 * 0.0015 + 3000 * 0.0008 + 3000 * 0.0004 + 2000 * 0.0002 +（${currentNum} - 10000） * 0.0001） * 10000 = ${amountEnd.toFixed(2)}（${number2text(amountEnd)}）`
    }
    state.amountText = amountText
    return amountEnd.toFixed(2)
})

state.chargeAmount = computed(() => {
    return (state.amount * state.ratio / 100).toFixed(2)
})

</script>  

<style lang="scss">
page {
    background-color: #f5f5f5;
}

.estimate {
    font-size: 14px;

    .calculation {
        background-color: #ffffff;
        margin: 10px 0;
        padding: 20px;

        &-item {
            padding: 10px 0;
        }
    }

    &-item {
        margin: 2px 0;
        background-color: #fff;
        padding: 10px;

        &-flex {
            margin-left: 20px;
            display: flex;
            align-items: center;

            &-title {}

            &-input {
                display: flex;
                align-items: center;
            }
        }

        &-desc {
            color: #666666;
            padding-top: 10px;
            margin-left: 20px;
        }
    }

    .rich-text {
        padding: 10px;
        background-color: #fff;
    }
}
</style>
  