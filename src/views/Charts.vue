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
            <div class="chart-title">{{isOutTextShow}}趋势</div>
            <div class="nothing" v-if="pie_data.length==0">该时段没有记账哟</div>
            <line-chart class="chart-cpn" v-else :xData="line_xData" :yData="line_yData"></line-chart>
        </div>

        <div class="chart">
            <div class="chart-title">{{isOutTextShow}}分类排行</div>
            <div class="nothing" v-if="pie_data.length==0">该时段没有记账哟</div>
            <pie-chart class="chart-cpn" v-else :catData="pie_data"></pie-chart>

        </div>

        <van-datetime-picker class="time-picker" v-model="time" type="year-month" v-show="isMonth&&isMonthPickShow"
            cancel-button-text=" " :item-height="40" :visible-item-count="5" :formatter="formatterHandler"
            @confirm="dateConfirmHandler">
            <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
        </van-datetime-picker>

        <van-picker show-toolbar :default-index="yearIdx" class="time-picker" v-show="!isMonth && isYearPickShow"
            :columns="columns" cancel-button-text=" " @change="yearChangeHandler" @confirm="yearConfirmHandler">
            <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
        </van-picker>

    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    import LineChart from "components/content/charts/LineChart.vue"
    import PieChart from "components/content/charts/PieChart.vue"

    import { DatetimePicker, Picker } from 'vant';
    import { baseRequest } from "@/network/request.js"
    export default {
        components: {
            TabBar,
            LineChart,
            PieChart,
            [DatetimePicker.name]: DatetimePicker,
            [Picker.name]: Picker,
        },
        data() {
            return {
                isMonth: true,
                isOut: true,
                time: new Date(),                               // 年月，级联数据
                year: "" + new Date().getFullYear() + "年",     // 年份，picker数据
                isMonthPickShow: false,
                isYearPickShow: false,

                columns: ['2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年'],

                ret: null,
                // 折线图数据
                line_xData: [],
                line_yData: [],

                // 饼状图数据
                pie_data: [],
            }
        },
        computed: {
            isOutTextShow() {
                return this.isOut ? "支出" : "收入";
            },

            // 显示的值随着年份而变化。
            yearIdx() {
                return this.columns.indexOf(this.year);
            },

            timeShow() {
                let month = this.time.getMonth() + 1 < 10 ? "0" + (this.time.getMonth() + 1) : this.time.getMonth() + 1;
                let date = this.time.getDate() < 10 ? "0" + this.time.getDate() : this.time.getDate();
                return this.time.getFullYear() + "/" + month;
            },

            queryTime() {
                return this.isMonth ? this.timeShow : this.year.split("年")[0];
            }
        },

        mounted() {
            this.getData();
        },

        methods: {

            async getData() {
                // await 后面跟的函数存在异步且返回promise时, 才会阻塞之后的同步代码.
                const { data: ret } = await baseRequest({
                    url: "/getOutIn",
                    params: { "userid": 1, "time": this.queryTime, "isMonth": this.isMonth }
                })
                console.log("开始请求数据");
                this.ret = ret;
                this.line_xData = ret.title;
                this.setInOrOut(this.ret, this.isOut);
                console.log("数据请求完毕");
            },


            setInOrOut(ret, isOut) {
                if (isOut) {
                    this.line_yData = ret.out;
                    this.pie_data = ret.catOut;
                } else {
                    this.line_yData = ret.in;
                    this.pie_data = ret.catIn;
                }
            },

            // 选择了月报
            monthClickHandler() {
                this.isMonth = true;
                this.isYearPickShow = false;
            },

            // 选择了年报
            yearClickHandler() {
                this.isMonth = false;
                this.isMonthPickShow = false;
            },

            // 选择了支出
            outClickHandler() {
                this.isOut = true;
            },

            // 选择了收入
            inClickHandler() {
                this.isOut = false;
            },

            // 点击了时间筛选
            timeClickHandler() {
                if (this.isMonth) {
                    this.isMonthPickShow = true;
                } else {
                    this.isYearPickShow = true;
                }
            },


            // vant组件相关
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
            yearConfirmHandler() {
                this.isYearPickShow = false;
            },
            yearChangeHandler(picker) {
                this.year = picker.getValues()[0];
            },
        },

        watch: {

            // 以下数据改变后需要重新进行getData数据库操作
            time(newVal, oldVal) {
                console.log("time", newVal, oldVal);
                this.getData();
            },
            year() {
                console.log("year");
                this.getData();
            },
            isOut() {
                console.log("isOut");
                this.setInOrOut(this.ret, this.isOut);
            },
            isMonth() {
                console.log("isMonth");
                this.getData();
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

    .option .option-out,
    .option .option-in {
        float: right;
        margin-right: 20px;
    }

    .pulldown {
        height: 12px;
        vertical-align: middle;
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
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, .2);
    }

    .time-picker .pulldown {
        height: 16px;
    }

    .chart-cpn {
        width: 100%;
        height: 300px;
        margin: 0 auto;
    }

    .nothing {
        color: #666;
        font-size: larger;
        text-align: center;
    }
</style>