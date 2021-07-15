<template>
    <div class="bill-bar">
        <bill-number></bill-number>
        <!-- <van-field class="field" clickable :value="value" @touchstart.native.stop="show = true" /> -->
        <bill-bar-item>
            <img slot="icon" src="~assets/img/class.svg">
            <span slot="name">分类</span>
            <input slot="text" type="text">
        </bill-bar-item>
        <bill-bar-item>
            <img slot="icon" src="~assets/img/account.svg">
            <span slot="name">账户</span>
            <input slot="text" type="text">
        </bill-bar-item>
        <bill-bar-item>
            <img slot="icon" src="~assets/img/time.svg">
            <span slot="name">时间</span>
            <input slot="text" type="text">
        </bill-bar-item>
        <bill-bar-item>
            <img slot="icon" src="~assets/img/note.svg">
            <span slot="name">备注</span>
            <input slot="text" type="text">
        </bill-bar-item>
        <van-datetime-picker v-model="currentDate" />

    </div>
</template>

<script>
    import BillBarItem from "components/content/bill/BillBarItem.vue"
    import BillNumber from "components/content/bill/BillNumber.vue"
    import { Button } from 'vant';
    import { Field } from 'vant';

    import { DatetimePicker } from 'vant';
    export default {
        data() {
            return {
                currentDate: new Date(),
                value: '',
            }
        },
        components: {
            BillBarItem,
            BillNumber,
            [Button.name]: Button,
            [Field.name]: Field,
            [DatetimePicker.name]: DatetimePicker,
        }

    }
</script>