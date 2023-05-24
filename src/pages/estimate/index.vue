<template>
    <view class="estimate">
        <nut-form>
            <nut-form-item label="评估值">
                <nut-input v-model="basicData.name" class="nut-input-text" placeholder="请输入" type="number" />
            </nut-form-item>
            <nut-form-item label="标准收费">
                <view>￥50</view>
            </nut-form-item>
            <nut-form-item v-model="basicData.address" label="浮动系数">
                <nut-input class="nut-input-text" placeholder="请输入" type="number" />
            </nut-form-item>
            <nut-form-item label="收费金额">
                <view>￥50</view>
            </nut-form-item>
        </nut-form>
    </view>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
    setup() {
        const basicData = reactive({
            name: '',
            age: '',
            tel: '',
            address: ''
        });
        return { basicData }
    }
}
</script>  
  