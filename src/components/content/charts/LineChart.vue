<!-- echarts图表需要一个容器: chart-container -->

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
            // this.updateChart();
        },
        methods: {
            // 初始化图表
            initChart() {
                this.lineInstance = this.$echarts.init(this.$refs.line)
            },

            // 更新图表
            updateChart() {
                const option = {
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