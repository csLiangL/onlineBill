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
            <div class="nothing" v-if="barData.length==0">该时段没有记账哟</div>
            <div class="chart-container" ref="line_chart"></div>
        </div>

        <div class="chart">
            <div class="chart-title">{{isOutTextShow}}分类排行</div>
            <div class="nothing" v-if="barData.length==0">该时段没有记账哟</div>
            <div class="chart-container" ref="bar_chart"></div>
        </div>

        <van-datetime-picker class="time-picker" v-model="time" type="year-month" v-show="isMonth&&isMonthPickShow"
            cancel-button-text=" " :item-height="40" :visible-item-count="5" :formatter="formatterHandler"
            @confirm="dateConfirmHandler">
            <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
        </van-datetime-picker>

        <van-picker show-toolbar ref="year" class="time-picker" v-show="!isMonth && isYearPickShow"
            :columns="['2017年', '2018年', '2019年', '2020年','2021年', '2022年']" cancel-button-text=" "
            @change="yearChangeHandler" @confirm="yearConfirmHandler">
            <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
        </van-picker>

    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    import { DatetimePicker, Picker } from 'vant';
    import { baseRequest } from "@/network/request.js"
    export default {
        components: {
            TabBar,
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

                // 折线图数据
                lineChart: null,
                LineX: [],
                LineY: [],

                // 饼状图数据
                barChart: null,
                barData: [],
            }
        },
        computed: {
            isOutTextShow() {
                return this.isOut ? "支出" : "收入";
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
            this.initChart();
            this.getData();
        },

        methods: {
            initChart() {
                this.lineChart = this.$echarts.init(this.$refs.line_chart);
                this.barChart = this.$echarts.init(this.$refs.bar_chart);
            },

            async getData() {
                const { data: ret } = await baseRequest({
                    url: "/getOutIn",
                    params: { "userid": 1, "time": this.queryTime, "isMonth": this.isMonth }
                })
                this.LineX = ret.title;
                if (this.isOut) {
                    this.LineY = ret.out;
                    this.barData = ret.catOut;
                } else {
                    this.barData = ret.catIn;
                    this.LineY = ret.in;
                }
                setTimeout(() => {
                    this.bus.$emit("Loading", false);
                }, 500);
                this.updateChart();
            },

            updateChart() {
                const line_option = {
                    grid: {
                        left: "18%",
                    },

                    tooltip: {
                        trigger: 'axis'
                    },

                    xAxis: {
                        type: 'category',
                        data: this.LineX,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.LineY,
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            color: "#DAA520"
                        },
                    }]
                };

                // 更新bar_chart
                const bar_option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ["40%", "70%"],
                            center: ['50%', '50%'],
                            data: this.barData.sort(function (a, b) { return a.value - b.value; }),
                            // roseType: 'area',
                            label: {
                                color: 'rgba(0, 0, 0, 0.5)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(0, 0, 0, 0.5)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                        }
                    ]
                }
                // if(this.barData.length!=0){
                //     let lineChart = this.$echarts.init(this.$refs.line_chart);
                //     let barChart = this.$echarts.init(this.$refs.bar_chart);
                this.lineChart.setOption(line_option);
                this.barChart.setOption(bar_option);
                // }
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
                console.log(this.$refs.year.setValues([this.year]));
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
            time() {
                this.getData();
            },
            year() {
                this.getData();
            },
            isOut() {
                this.getData();
            },
            isMonth() {
                this.getData();
            }
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
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, .2);
    }

    .time-picker .pulldown {
        height: 16px;
    }

    .chart-container {
        width: 100%;
        height: 300px;
    }

    .nothing {
        color: #666;
        font-size: larger;
        text-align: center;
    }
</style>