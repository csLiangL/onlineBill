<template>
    <div class="bill-bar">
        <bill-number></bill-number>
        <bill-bar-item :idx="0" @itemClick="itemClickHandler" :currentClicked="currClicked">
            <img slot="icon" src="~assets/img/class.svg">
            <span slot="name">分类</span>
            <span slot="text">衣>上衣</span>
        </bill-bar-item>
        <bill-bar-item :idx="1" @itemClick="itemClickHandler" :currentClicked="currClicked">
            <img slot="icon" src="~assets/img/account.svg">
            <span slot="name">账户</span>
            <span slot="text"></span>
        </bill-bar-item>
        <bill-bar-item :idx="2" @itemClick="itemClickHandler" :currentClicked="currClicked">
            <img slot="icon" src="~assets/img/time.svg">
            <span slot="name">时间</span>
            <span slot="text"></span>
        </bill-bar-item>
        <bill-bar-item :idx="3" @itemClick="itemClickHandler" :currentClicked="currClicked">
            <img slot="icon" src="~assets/img/note.svg">
            <span slot="name">备注</span>
            <span slot="text"></span>
        </bill-bar-item>
        <van-datetime-picker v-show="this.currClicked==2" v-model="currentDate" />

    </div>
</template>

<script>
    import BillBarItem from "components/content/bill/BillBarItem.vue"
    import BillNumber from "components/content/bill/BillNumber.vue"

    import { DatetimePicker } from 'vant';
    export default {
        props: {
            color: {
                type: String,
                default: "#04BE02"
            }
        },
        data() {
            return {
                currClicked: 8,
                currentDate: new Date(),
            }
        },
        components: {
            BillBarItem,
            BillNumber,
            [DatetimePicker.name]: DatetimePicker,
        },
        methods: {
            itemClickHandler(idx) {
                this.currClicked = idx;
                console.log(this.currClicked)
            }
        }
    }
</script>