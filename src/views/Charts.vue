<template>
    <div id="charts">
        <div class="month-year">
            <div class="month" @click="monthClickHandler" :class="{'charts-active': isMonth}">月报</div>
            <div class="year" @click="yearClickHandler" :class="{'charts-active': !isMonth}">年报</div>
        </div>

        <div class="option">
            <div v-if="isMonth" class="option-time" @click="timeClickHandler">{{timeShow}}
                <img class="pulldown" src="~assets/img/pulldown.svg" alt="">
            </div>
            <div v-else class="option-time" @click="timeClickHandler">{{year}}
                <img class="pulldown" src="~assets/img/pulldown.svg" alt="">
            </div>
            <div class="option-out" @click="outClickHandler">
                <span :class="{'option-active': isOut}">支出</span>
            </div>
            <div class="option-in" @click="inClickHandler">
                <span :class="{'option-active': !isOut}">收入</span>
            </div>
        </div>


        <div class="chart">
            <div class="chart-title">支出趋势</div>
            <line-chart></line-chart>
        </div>


        <div class="chart">
            <div class="chart-title">分类支出排行</div>
            <bar-chart></bar-chart>
        </div>

        <van-datetime-picker class="time-picker" v-model="time" type="year-month" v-show="isMonth&&isMonthPickShow"
            cancel-button-text=" " :item-height="40" :visible-item-count="5" :formatter="formatterHandler"
            @confirm="dateConfirmHandler">
            <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
        </van-datetime-picker>

        <van-picker show-toolbar ref="year" class="time-picker" v-show="!isMonth && isYearPickShow"
            :columns="['2018年', '2019年', '2020年','2021年']" cancel-button-text=" " @change="yearChangeHandler"
            @confirm="yearConfirmHandler">
            <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
        </van-picker>

        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    import LineChart from "components/content/charts/LineChart.vue"
    import BarChart from "components/content/charts/BarChart.vue"
    import { DatetimePicker, Picker } from 'vant';
    export default {
        components: {
            TabBar,
            LineChart,
            BarChart,
            [DatetimePicker.name]: DatetimePicker,
            [Picker.name]: Picker,
        },
        data() {
            return {
                isMonth: true,
                isOut: true,
                isMonthPickShow: false,
                isYearPickShow: false,
                time: new Date(),                               // 记录当前月份的完整时间
                year: "" + new Date().getFullYear() + "年",     // 记录当前年份
            }
        },
        computed: {
            timeShow() {
                console.log(this.time)
                let month = this.time.getMonth() + 1 < 10 ? "0" + (this.time.getMonth() + 1) : this.time.getMonth() + 1;
                let date = this.time.getDate() < 10 ? "0" + this.time.getDate() : this.time.getDate();
                return this.time.getFullYear() + "年" + month + "月";
            }
        },
        methods: {

            monthClickHandler() {
                this.isMonth = true;
                this.isYearPickShow = false;
            },

            outClickHandler() {
                this.isOut = true;
            },
            inClickHandler() {
                this.isOut = false;
            },
            timeClickHandler() {
                if (this.isMonth) {
                    this.isMonthPickShow = true;
                } else {
                    this.isYearPickShow = true;
                }
            },

            formatterHandler(type, val) {
                if (type === 'year') {
                    return val + '年';
                }
                if (type === 'month') {
                    return val + '月';
                }
            },
            dateConfirmHandler() {
                this.isMonthPickShow = false;
            },
            yearChangeHandler(picker) {
                this.year = picker.getValues()[0];
                // console.log(picker.getValues()[0]);
            },
            yearConfirmHandler() {
                this.isYearPickShow = false;
            },
            yearClickHandler() {
                this.isMonth = false;
                this.isMonthPickShow = false;
                console.log(this.$refs.year.setValues([this.year]));
            },
        }
    }
</script>

<style>
    #charts {
        background-color: #f6f6f6;
        margin-bottom: 100px;
    }

    .month-year {
        display: flex;
        justify-content: space-around;
        height: 44px;
        line-height: 44px;
        margin-top: 10px;
        background-color: #fff;
        color: #666;
    }

    .month,
    .year {
        font-size: 18px;
        flex: 1;
        text-align: center;
    }

    .charts-active {
        font-weight: 700;
        border-bottom: 2px solid #04BE02;
        color: #000;
    }

    .option {
        font-size: 15px;
        height: 36px;
        line-height: 36px;
        background-color: #fff;
    }

    .option .option-time {
        float: left;
        padding: 0 10px;
    }

    .pulldown {
        height: 12px;
        vertical-align: middle;
    }

    .option .option-out,
    .option .option-in {
        float: right;
        margin-right: 20px;
    }

    .option span {
        border-radius: 10px;
        color: black;
        padding: 2px 8px;
    }


    .option .option-active {
        background-color: #04BE02;
        color: #fff;
    }

    .chart {
        margin: 10px 10px 0 10px;
        background-color: #fff;
        border-radius: 8px;
    }

    .chart-title {
        font-size: 14px;
        font-weight: 700;
        padding: 10px;
    }

    .time-picker {
        width: 100%;
        position: fixed;
        bottom: 50px;
    }

    .time-picker .pulldown {
        height: 16px;
    }
</style>