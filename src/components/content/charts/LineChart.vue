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
            console.log("mounted中初始化图表", this.xData);
            this.initChart();
            console.log("mounted初始化图表后", this.xData);
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
                console.log("watch到xData改变了", "newVal", newVal, "oldVal", oldVal);
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