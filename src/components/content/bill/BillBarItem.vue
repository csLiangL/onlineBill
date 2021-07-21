<template>

    <!-- <div class="bill-bar-item"> -->
    <!-- <div class="bill-bar-item-row" :style="backgroundColor" @click="itemClickHandler"> -->
    <div class="bill-bar-item" :style="backgroundColor" @click="itemClickHandler">
        <div class="name">
            <slot name="icon"></slot>
            <slot name="name"></slot>
        </div>
        <div class="text">
            <slot name="text"></slot>
        </div>
    </div>

    <!-- isActive判断当前组件是否被选中 -->
    <!-- <div v-show="isActive" class="bill-bar-item-pop"> -->
    <!-- dateshow: 判断选中后要不要显示date -->
    <!-- <van-datetime-picker v-if="dateShow" v-model="currentDate" item-height="40px" visible-item-count="5"
                @cancel="dateCloseHandler" @confirm="dateConfirmHandler" :formatter="formatterHandler" /> -->
    <!-- </div> -->

    <!-- </div> -->
</template>

<script>
    // import { DatetimePicker } from 'vant';
    export default {
        props: {
            idx: {
                type: Number,
                default: ""
            },
            currentClicked: {
                type: Number,
                default: ""
            }
        },

        // data() {
        //     return {
        //         // 时间相关数据
        //         // currentDate: new Date(),
        //         isClickDateDelete: false,
        //     }
        // },
        // components: {
        //     // [DatetimePicker.name]: DatetimePicker,
        // },
        computed: {

            // isActive() {
            //     return this.idx == this.currentClicked;
            // },

            backgroundColor() {
                return this.idx == this.currentClicked ? { backgroundColor: "#f6f6f6" } : { backgroundColor: "#fff" }
            },

            // dateShow() {
            //     return this.idx == 3 && !this.isClickDateDelete;
            // }
        },
        methods: {
            itemClickHandler() {
                // this.isClickDateDelete = false;
                this.$emit("itemClick", this.idx);
            },

            // // 时间组件相关处理
            // formatterHandler(type, val) {
            //     if (type === 'year') {
            //         return val + '年';
            //     }
            //     if (type === 'month') {
            //         return val + '月';
            //     }
            //     if (type === 'day') {
            //         return val + '日';
            //     }
            //     if (type === 'hour') {
            //         return val + '时';
            //     }
            //     if (type === 'minute') {
            //         return val + '分';
            //     }
            //     return val;
            // },
            // dateCloseHandler() {
            //     console.log('点击了取消');
            //     this.isClickDateDelete = true;
            // },
            // dateConfirmHandler(value) {
            //     // this.currentDate = value.getFullYear() + "年" + value.getMonth() + "月" +
            //     //     value.getDate() + "日 " + value.getHours() + ":" + value.getMinutes();
            //     this.currentDate = value;
            //     this.isClickDateDelete = true;
            //     console.log(this.currentDate);
            //     this.$emit("getData", this.idx, this.currentDate);
            // },

        }
    }
</script>

<style>
    /* item高度: 50px;
       左margin: 30px    
            图标height: 20px
            字体大小:14px
         */
    /* .bill-bar-item-row {
        display: flex;
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
    } */

    .bill-bar-item {
        display: flex;
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
    }


    /* .bill-bar-item-pop {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, .2);
    } */

    /* .bill-bar-item-row .name {
        display: flex;
        align-items: center;
        border-bottom: solid 1px #f6f6f6;
        flex: 1;
    } */

    .bill-bar-item .name {
        display: flex;
        align-items: center;
        border-bottom: solid 1px #f6f6f6;
        flex: 1;
    }

    /* .bill-bar-item-row .text {
        border-bottom: solid 1px #f6f6f6;
        flex: 3
    } */

    .bill-bar-item .text {
        border-bottom: solid 1px #f6f6f6;
        flex: 3
    }

    /* .bill-bar-item-row .name img {
        width: 20px;
        margin-right: 10px;
    } */

    .bill-bar-item .name img {
        width: 20px;
        margin-right: 10px;
    }

    /* .bill-bar-item-row .name span {
        font-size: 14px;
    } */

    .bill-bar-item .name span {
        font-size: 14px;
    }

    /* .bill-bar-item-row .text span {
        display: inline-block;
        width: 100%;
        height: inherit;
        font-size: 16px;
        background-color: transparent;
    } */

    .bill-bar-item .text span {
        display: inline-block;
        width: 100%;
        height: inherit;
        font-size: 16px;
        background-color: transparent;
    }

    /* .bill-bar-item-row .text input {
        padding: 0;
        border: 0;
        background-color: transparent;
    } */

    .bill-bar-item .text input {
        padding: 0;
        border: 0;
        background-color: transparent;
        width: 80%;
    }
</style>