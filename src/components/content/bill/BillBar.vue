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
        <bill-bar-item :idx="1" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler">
            <img slot="icon" src="~assets/img/class.svg">
            <span slot="name">分类</span>
            <span slot="text">{{this.category}}</span>
        </bill-bar-item>
        <bill-bar-item :idx="2" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler">
            <img slot="icon" src="~assets/img/account.svg">
            <span slot="name">账户</span>
            <span slot="text">{{this.account}}</span>
        </bill-bar-item>
        <bill-bar-item :idx="3" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler">
            <img slot="icon" src="~assets/img/time.svg">
            <span slot="name">时间</span>
            <span slot="text">{{this.timeShow}}</span>
        </bill-bar-item>
        <bill-bar-item :idx="4" :currentClicked="currClicked" @itemClick="itemClickHandler" @getData="getDataHandler">
            <img slot="icon" src="~assets/img/note.svg">
            <span slot="name">备注</span>
            <span slot="text">{{this.note}}</span>
        </bill-bar-item>

    </div>
</template>

<script>
    import BillBarItem from "components/content/bill/BillBarItem.vue"
    import BillNumber from "components/content/bill/BillNumber.vue"


    export default {
        props: {
            color: {
                type: String,
                default: "#04BE02"
            }
        },
        data() {
            return {
                currClicked: 0,
                category: "",
                account: "",
                time: new Date(),
                note: "..."
            }
        },
        computed: {
            timeShow() {
                let hours = this.time.getHours() < 10 ? "0" + this.time.getHours() : this.time.getHours();
                let minutes = this.time.getMinutes() < 10 ? "0" + this.time.getMinutes() : this.time.getMinutes();
                return this.time.getFullYear() + "年" + (this.time.getMonth() + 1) + "月" +
                    this.time.getDate() + "日 " + hours + ":" + minutes;
            }
        },
        components: {
            BillNumber,
            BillBarItem,
        },
        methods: {
            itemClickHandler(idx) {
                this.currClicked = idx;
            },
            billNumClickHandler() {
                this.currClicked = 0;
            },
            getDataHandler(idx, data) {
                if (idx == 1) {
                    this.category = data
                } else if (idx == 2) {
                    this.account = data;
                } else if (idx == 3) {
                    this.time = data;
                } else if (idx == 4) {
                    this.note = data;
                }
            }
        }
    }
</script>