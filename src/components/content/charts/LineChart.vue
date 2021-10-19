<template>
    <div class="chart-line" ref="line"></div>
</template>

<script>
    export default {
        props: {
            xData: {
                type: Array,
                default: () => [],
            },
            yData: {
                type: Array,
                default: () => [],
            }
        },

        data() {
            return {
                lineInstance: null,
            }
        },
        mounted() {
            this.initChart();
            this.updateChart();
        },
        methods: {
            // 初始化图表
            initChart() {
                console.log("折线图初始化了")
                this.lineInstance = this.$echarts.init(this.$refs.line)
            },

            // 更新图表
            updateChart() {
                console.log("折线图更新了")
                const option = {
                    grid: {
                        left: "18%",
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xData,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.yData,
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            color: "#DAA520"
                        },
                    }]
                }
                this.lineInstance.setOption(option);
            }
        },

        watch: {
            xData(newVal, oldVal) {
                this.updateChart();
            },
            yData(newVal, oldVal) {
                this.updateChart();
            }
        }
    }
</script>

<style>
    .chart-line {
        width: 100%;
        height: 100%;
    }
</style>