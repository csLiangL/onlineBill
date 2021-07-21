<template>
    <div class="bill-bar">
        <bill-number @billNumClick="billNumClickHandler"></bill-number>

        <!-- 方式一：在BillBar.vue组件中显示弹出的组件 -->
        <!-- <bill-bar-item :idx="0" @itemClick="itemClickHandler" :currentClicked="currClicked">
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
        <van-datetime-picker v-show="this.currClicked==2" v-model="currentDate" /> -->


        <!-- 方式二：在billbaritem.vue组件中显示弹出的组件-->
        <!-- <bill-bar-item :idx="1" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler"> -->
        <bill-bar-item :idx="1" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/class.svg">
            <span slot="name">分类</span>
            <span slot="text">{{this.category}}</span>
        </bill-bar-item>
        <!-- <bill-bar-item :idx="2" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler"> -->
        <bill-bar-item :idx="2" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/account.svg">
            <span slot="name">账户</span>
            <span slot="text">{{this.account}}</span>
        </bill-bar-item>
        <!-- <bill-bar-item :idx="3" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler"> -->
        <bill-bar-item :idx="3" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/time.svg">
            <span slot="name">时间</span>
            <span slot="text">{{this.timeShow}}</span>
        </bill-bar-item>
        <!-- <bill-bar-item :idx="4" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler"> -->
        <bill-bar-item :idx="4" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/note.svg">
            <span slot="name">备注</span>
            <input slot="text" type="text">{{this.note}}</input>
        </bill-bar-item>

        <div class="bill-bar-pop">
            <van-datetime-picker v-if="isTimeCnpShow" v-model="time" item-height="40px" visible-item-count="5"
                @cancel="dateCloseHandler" @confirm="dateConfirmHandler" :formatter="formatterHandler" />
        </div>
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
                // currentDate: new Date(),
                currClicked: 0,

                category: "",
                account: "",
                time: new Date(),
                note: "...",

                // 时间组件相关数据
                isClickDateDelete: false,
            }
        },
        computed: {
            isTimeCnpShow() {
                return this.currClicked == 3 && !this.isClickDateDelete;
            },
            timeShow() {
                let hours = this.time.getHours() < 10 ? "0" + this.time.getHours() : this.time.getHours();
                let minutes = this.time.getMinutes() < 10 ? "0" + this.time.getMinutes() : this.time.getMinutes();
                return this.time.getFullYear() + "年" + (this.time.getMonth() + 1) + "月" +
                    this.time.getDate() + "日 " + hours + ":" + minutes;
            },
        },
        components: {
            BillNumber,
            BillBarItem,
            [DatetimePicker.name]: DatetimePicker,
        },
        methods: {
            itemClickHandler(idx) {
                this.currClicked = idx;
                if (idx == 3) {
                    this.isClickDateDelete = false;
                }
            },
            // 数字键盘被点击
            billNumClickHandler() {
                this.currClicked = 0;
            },
            // getDataHandler(idx, data) {
            //     if (idx == 1) {
            //         this.category = data
            //     } else if (idx == 2) {
            //         this.account = data;
            //     } else if (idx == 3) {
            //         this.time = data;
            //     } else if (idx == 4) {
            //         this.note = data;
            //     }
            // }
            // 时间组件相关处理
            formatterHandler(type, val) {
                if (type === 'year') {
                    return val + '年';
                }
                if (type === 'month') {
                    return val + '月';
                }
                if (type === 'day') {
                    return val + '日';
                }
                if (type === 'hour') {
                    return val + '时';
                }
                if (type === 'minute') {
                    return val + '分';
                }
                return val;
            },
            dateCloseHandler() {
                console.log('点击了取消');
                this.isClickDateDelete = true;
            },
            dateConfirmHandler(value) {
                this.time = value;
                this.isClickDateDelete = true;
                console.log(this.time);
            },
        }
    }
</script>

<style>
    .bill-bar-pop {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, .2);
    }
</style>